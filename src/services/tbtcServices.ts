import { ethers } from 'ethers';
import { tbtcContractABI } from '../contracts/tbtcContract';
import axios from 'axios';
import { L1BitcoinDepositor } from '../contracts/L1BitcoinDepositor';
import {
	BitcoinRawTxVectors,
	BitcoinTxHash,
	extractBitcoinRawTxVectors,
	TBTC,
} from '@keep-network/tbtc-v2.ts';
import {
	addArbTxHash,
	addFinalizedEthTxHash,
	addInitializedEthTxHash,
	addStatus,
} from '../redux/reducers/DepositReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { getDepositId, reverseString } from '../utils/utils';
const { BTCUtils, utils } = require('@summa-tx/bitcoin-spv-js');

/**
 * @name getContractAddress
 *
 * @description Gets the contract address based on the network and contract
 *
 * @param isMainnet - The network status
 * @param contract - The contract name
 *
 * @returns The contract address
 */

const getContractAddress = (isMainnet: boolean, contract: string) => {
	const tbtcContractAddress = isMainnet
		? process.env.REACT_APP_TBTC_MAINNET
		: process.env.REACT_APP_TBTC_TESTNET;
	const L1BitcoinAddress = isMainnet
		? process.env.REACT_APP_L1BITCOIN_MAINNET
		: process.env.REACT_APP_L1BITCOIN_SEPOLIA;
	const L2BitcoinAddress = isMainnet
		? process.env.REACT_APP_L2BITCOIN_MAINNET
		: process.env.REACT_APP_L2BITCOIN_SEPOLIA;

	return contract === 'TBTC'
		? tbtcContractAddress
		: contract === 'L1BITCOIN'
		? L1BitcoinAddress
		: L2BitcoinAddress;
};

/**
 * @name getUrlHeader
 *
 * @description Gets the URL header based on the network and block explorer
 *
 * @param isMainnet - The network status
 * @param blockExplorer - The block explorer
 *
 * @returns The URL header
 */

const getUrlHeader = (isMainnet: boolean, blockExplorer: string) => {
	const etherscanApiExplorer = isMainnet
		? process.env.REACT_APP_ETHERSCAN_API_URL_MAINNET
		: process.env.REACT_APP_ETHERSCAN_API_URL_SEPOLIA;
	const arbiscanApiExplorer = isMainnet
		? process.env.REACT_APP_ARBISCAN_API_URL_MAINNET
		: process.env.REACT_APP_ARBISCAN_API_URL_SEPOLIA;

	return blockExplorer === 'ETHERSCAN'
		? etherscanApiExplorer
		: arbiscanApiExplorer;
};

/**
 * @name getUrlTxHeader
 *
 * @description Gets the URL header based on the network and block explorer
 *
 * @param isMainnet - The network status
 * @param blockExplorer - The block explorer
 *
 * @returns The URL header
 */

const getUrlTxHeader = (isMainnet: boolean, blockExplorer: string) => {
	const etherscanExplorer = isMainnet
		? process.env.REACT_APP_ETH_EXPLORER_MAINNET
		: process.env.REACT_APP_ETH_EXPLORER_TESTNET;
	const arbiscanExplorer = isMainnet
		? process.env.REACT_APP_ARB_EXPLORER_MAINNET
		: process.env.REACT_APP_ARB_EXPLORER_TESTNET;

	return blockExplorer === 'ETHERSCAN' ? etherscanExplorer : arbiscanExplorer;
};

/**
 * @name initializeTbtcContract
 *
 * @description Initializes the tBTC contract
 *
 * @param isMainnet - The network status
 * @param providerOrSigner - The provider or signer
 *
 * @returns The tBTC contract
 */

const initializeTbtcContract = (
	isMainnet: boolean,
	providerOrSigner: ethers.Signer | ethers.providers.Web3Provider,
) => {
	const tbtcAddress = getContractAddress(isMainnet, 'TBTC');

	if (!tbtcAddress) return null;
	return new ethers.Contract(tbtcAddress, tbtcContractABI, providerOrSigner);
};

/**
 * @name getTbtcBalance
 *
 * @description Gets the tBTC balance of an account
 *
 * @param isMainnet - The network status
 * @param provider - The provider
 * @param address - The account address
 *
 * @returns The tBTC balance
 */

export const getTbtcBalance = async (
	isMainnet: boolean,
	provider: ethers.providers.Web3Provider,
	address: string,
) => {
	const tbtcContract = initializeTbtcContract(isMainnet, provider);
	const tbtcBalance = await tbtcContract?.callStatic.balanceOf(address);
	return ethers.utils.formatEther(tbtcBalance);
};

/**
 * @name getWalletTransactions
 *
 * @description Gets the wallet transactions
 *
 * @param isMainnet - The network status
 * @param address - The account address
 *
 * @returns The wallet transactions
 */

export const getWalletTransactions = async (
	isMainnet: boolean,
	address: string,
): Promise<Array<any>> => {
	const arbitrumTransactions = await getTbtcTransactionsbyAddress(
		isMainnet,
		address,
	);
	const etherScanTransactions = await getEtherScanTransactions(
		isMainnet,
		address,
	);
	let transactions = [...arbitrumTransactions, ...etherScanTransactions];
	transactions = transactions.sort((a, b) => b.timeStamp - a.timeStamp);
	transactions = transactions.slice(0, 8);
	transactions.forEach(tx => {
		if (tx.status === 'PENDING') {
			tx.value = getTbtcValue(getOutputVector(tx)).toFixed(5);
		}
	});
	return transactions;
};

/**
 * @name getBitcoinRawTxVectors
 *
 * @description Gets the Bitcoin raw transaction vectors
 *
 * @param isMainnet - The network status
 * @param transactionHash - The transaction hash
 * @param address - The account address
 * @param sdk - The TBTC SDK
 */

export const getBitcoinRawTxVectors = async (
	isMainnet: boolean,
	transactionHash: BitcoinTxHash,
	address: string,
	sdk: TBTC,
) => {
	const bitcoinRawTx = await sdk.bitcoinClient?.getRawTransaction(
		transactionHash,
	);

	const fundingTxVectors = extractBitcoinRawTxVectors(bitcoinRawTx);
	checkTransactionExist(isMainnet, fundingTxVectors, address);
};

/**
 * @name checkTransactionExist
 *
 * @description Checks if a transaction exists
 *
 * @param isMainnet - The network status
 * @param fundingTx - The funding transaction
 * @param address - The account address
 */

export const checkTransactionExist = async (
	isMainnet: boolean,
	fundingTx: any,
	address: string,
) => {
	const arbTransactions = await getArbTransactionsByAddress(
		isMainnet,
		address,
	);
	const { result } = arbTransactions.data;

	return result.find((transaction: any) => {
		const decodedInput = decodeInputDataInitialize(transaction);
		return (
			decodedInput &&
			checkTransactionCoindiceFundingVectors(fundingTx, decodedInput)
		);
	});
};

/**
 * @name checkTransactionCoindiceFundingVectors
 *
 * @description Checks if a transaction coincides with the funding vectors
 *
 * @param fundingTx - The funding transaction
 * @param decodedInput - The decoded input
 */

const checkTransactionCoindiceFundingVectors = (
	fundingTx: any,
	decodedInput: any,
) => {
	const { inputVector, locktime, outputVector, version } =
		decodedInput.fundingTx;

	return (
		inputVector === `0x${fundingTx.inputs.toString()}` &&
		locktime === `0x${fundingTx.locktime.toString()}` &&
		outputVector === `0x${fundingTx.outputs.toString()}` &&
		version === `0x${fundingTx.version.toString()}`
	);
};

/**
 * @name getInitializedTxHash
 * @description Gets the initialized transaction hash
 * @param isMainnet - The network status
 * @param address - The account address
 * @param fundingTx - The funding transaction
 * @returns The initialized transaction hash
 */

export const getInitializedTxHash = async (
	isMainnet: boolean,
	address: string,
	fundingTx: BitcoinRawTxVectors,
) => {
	const etherScanTransactions = await getEtherScanTransactions(
		isMainnet,
		address,
	);
	const initializedTx = etherScanTransactions.filter(tx => {
		const decodedInput = decodeInputDataInitialize(tx);
		return (
			decodedInput &&
			checkTransactionCoindiceFundingVectors(fundingTx, decodedInput)
		);
	});

	return initializedTx.length > 0 ? initializedTx[0].hash : null;
};

/**
 * @name handleCrossChainTransactions
 * @description Handles the cross chain transactions
 * @param fundingTxVectors - The funding transaction vectors
 * @param address - The account address
 * @param isMainnet - The network status
 * @param dispatch - The dispatch function
 * @returns The cross chain transactions
 *
 */

export const handleCrossChainTransactions = async (
	fundingTxVectors: BitcoinRawTxVectors,
	address: string,
	isMainnet: boolean,
	dispatch: Dispatch,
) => {
	const arbitrumTx = await checkTransactionExist(
		isMainnet,
		fundingTxVectors,
		address,
	);
	if (arbitrumTx?.hash) dispatch(addArbTxHash(arbitrumTx.hash));

	const initializedTx = await getInitializedTxHash(
		isMainnet,
		address,
		fundingTxVectors,
	);
	if (initializedTx) dispatch(addInitializedEthTxHash(initializedTx));

	const finalizedTx = await getFinalizedTxHash(
		isMainnet,
		address,
		fundingTxVectors,
	);
	if (finalizedTx) dispatch(addFinalizedEthTxHash(finalizedTx));
};

/**
 * @name getFinalizedTxHash
 * @description Gets the finalized transaction hash
 * @param isMainnet - The network status
 * @param address - The account address
 * @param fundingTx - The funding transaction
 * @returns The finalized transaction hash
 */

export const getFinalizedTxHash = async (
	isMainnet: boolean,
	address: string,
	fundingTx: BitcoinRawTxVectors,
) => {
	const etherScanTransactions = await getEtherScanTransactions(
		isMainnet,
		address,
	);
	const finalizedTx = etherScanTransactions.filter(tx => {
		const decodedInput = decodedInputDataFinalize(tx);
		return (
			decodedInput &&
			checkTransactionCoindiceFundingVectors(fundingTx, decodedInput)
		);
	});

	return finalizedTx.length > 0 ? finalizedTx[0].hash : null;
};

/**
 * @name getArbTransactionsByAddress
 * @description Gets the Arbitrum transactions by address
 * @param isMainnet - The network status
 * @param address - The account address
 * @returns The Arbitrum transactions
 */

const getArbTransactionsByAddress = async (
	isMainnet: boolean,
	address: string,
) => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'L2BITCOIN');
	const urlHeader = getUrlHeader(isMainnet, 'ARBISCAN');
	const url = `${urlHeader}/api?module=account&action=txlist&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
	const res = await axios.get(url);
	return res;
};

/**
 * @name getTbtcTransactionsbyAddress
 * @description Gets the tBTC transactions by address
 * @param isMainnet - The network status
 * @param address - The account address
 * @returns The tBTC transactions
 * @throws {Error} If there is an error fetching the tBTC transactions
 */

export const getTbtcTransactionsbyAddress = async (
	isMainnet: boolean,
	address: string,
) => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'TBTC');
	const urlHeader = getUrlHeader(isMainnet, 'ARBISCAN');
	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
	try {
		const res = await axios.get(url);
		const urlTxHeader = getUrlTxHeader(isMainnet, 'ARBISCAN');
		const formatted = res.data.result.map((tx: any) => ({
			value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),
			hash: tx.hash,
			status: 'MINTED',
			timeStamp: tx.timeStamp,
			date: new Date(tx.timeStamp * 1000).toLocaleString(),
			isError: '0',
			link: `${urlTxHeader}/tx/${tx.hash}`,
		}));
		return formatted;
	} catch (error) {
		console.error('Error fetching tbtc transactions:', error);
	}
};

/**
 * @name getEtherScanTransactions
 * @description Gets the EtherScan transactions
 * @param isMainnet - The network status
 * @param address - The account address
 * @returns The EtherScan transactions
 */

export const getTbtcTransactions = async (
	isMainnet: boolean,
	noLimit?: boolean,
): Promise<any[]> => {
	const limit = noLimit ? 100 : 8;
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'TBTC');
	const urlHeader = getUrlHeader(isMainnet, 'ARBISCAN');
	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
	const {
		data: { result },
	} = await axios.get(url);

	const urlTxHeader = getUrlTxHeader(isMainnet, 'ARBISCAN');
	const uniqueTransactions = new Set();

	return result
		.map((tx: any) => ({
			value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),
			hash: tx.hash,
			status: 'MINTED',
			timeStamp: tx.timeStamp,
			date: new Date(tx.timeStamp * 1000),
			isError: '0',
			link: `${urlTxHeader}/tx/${tx.hash}`,
			address: tx.to,
		}))
		.filter(
			(tx: any) =>
				tx.value >= 0.01 &&
				!uniqueTransactions.has(tx.hash) &&
				uniqueTransactions.add(tx.hash),
		) // Evitar duplicados por hash
		.sort((a: any, b: any) => b.timeStamp - a.timeStamp)
		.slice(0, limit);
};

/**
 * @name getEtherScanTransactions
 * @description Gets the EtherScan transactions
 * @param isMainnet - The network status
 * @param address - The account address
 * @returns The EtherScan transactions
 */

export const getEtherScanTransactions = async (
	isMainnet: boolean,
	address: string,
): Promise<any[]> => {
	const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'L1BITCOIN');

	const urlHeader = getUrlHeader(isMainnet, 'ETHERSCAN');
	const url = `${urlHeader}/api?module=account&action=txlist&contractaddress=${contractAddress}&address=${address}&page=1&offset=50&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

	let data: any = (await axios.get(url)).data.result;

	if (!contractAddress) return [];

	const myData = data.filter((tx: any) =>
		checkNormalTx(tx, address, contractAddress),
	);

	return normalizeEtherScanData(isMainnet, myData);
};

/**
 * @name normalizeEtherScanData
 * @description Normalizes the EtherScan data
 * @param isMainnet - The network status
 * @param data - The data
 * @returns The normalized data
 */

const normalizeEtherScanData = (isMainnet: boolean, data: any[]): any[] => {
	const urlTxHeader = getUrlTxHeader(isMainnet, 'ETHERSCAN');
	return data
		.filter(tx => checkErrorTx(tx) || isPending(tx, data))
		.map(tx => ({
			value: null,
			hash: tx.hash,
			status: checkErrorTx(tx) ? 'ERROR' : 'PENDING',
			timeStamp: tx.timeStamp,
			date: new Date(tx.timeStamp * 1000).toLocaleString(),
			isError: tx.isError,
			blockExplorer: 'ETHERSCAN',
			link: `${urlTxHeader}/tx/${tx.hash}`,
			input: tx.input,
			functionName: tx.functionName,
		}));
};

/**
 * @name checkErrorTx
 * @description Checks if a transaction is an error
 * @param tx - The transaction
 * @returns If the transaction is an error
 */

const checkErrorTx = (tx: any) => {
	return tx.isError === '1';
};

/**
 * @name checkNormalTx
 * @description Checks if a transaction is from the user's wallet
 * @param tx - The transaction
 * @param address - The account address
 * @param contractAddress - The contract address
 * @returns true or false
 */

const checkNormalTx = (tx: any, address: string, contractAddress: string) => {
	return (
		tx.from.toLowerCase() === address.toLowerCase() &&
		tx.to.toLowerCase() === contractAddress.toLowerCase()
	);
};

/**
 * @name isInitialized
 * @description Checks if a transaction is initialized
 * @param tx - The transaction
 * @returns If the transaction is initialized
 */

const isInitialized = (tx: any) => {
	return tx.functionName.includes('initializeDeposit');
};

/**
 * @name isFinalized
 * @description Checks if a transaction is finalized
 * @param tx - The transaction
 * @returns If the transaction is finalized
 */

const isFinalized = (tx: any) => {
	return tx.functionName.includes('finalizeDeposit');
};

/**
 * @name isPending
 * @description Checks if a transaction is pending
 * @param tx1 - The transaction
 * @param data - The data
 * @returns If the transaction is pending
 */

const isPending = (tx1: any, data: Array<any>): boolean => {
	return data.some(
		tx =>
			tx1.input === tx.input &&
			isInitialized(tx1) &&
			!isFinalized(tx) &&
			!checkErrorTx(tx),
	);
};

/**
 * @name getOutputVector
 * @description Gets the output vector
 * @param tx - The transaction
 * @returns The output vector
 */

const getOutputVector = (tx: any) => {
	const iface = new ethers.utils.Interface(L1BitcoinDepositor);
	const input = iface.decodeFunctionData('initializeDeposit', tx.input);
	return input.fundingTx.outputVector;
};

/**
 * @name decodeInputDataInitialize
 * @description Decodes the input data for initialization
 * @param tx - The transaction
 * @returns The decoded input data
 */

const decodeInputDataInitialize = (tx: any) => {
	if (tx.functionName.includes('initializeDeposit')) {
		const iface = new ethers.utils.Interface(L1BitcoinDepositor);
		const input = iface.decodeFunctionData('initializeDeposit', tx.input);
		return input;
	}
};

/**
 * @name decodedInputDataFinalize
 * @description Decodes the input data for finalization
 * @param tx - The transaction
 * @returns The decoded input data
 */

const decodedInputDataFinalize = (tx: any) => {
	if (tx.functionName.includes('finalizeDeposit')) {
		const iface = new ethers.utils.Interface(L1BitcoinDepositor);
		const input = iface.decodeFunctionData('finalizeDeposit', tx.input);
		return input;
	}
};

/**
 * @name getTbtcValue
 * @description Gets the tBTC value
 * @param outputVector - The output vector
 * @returns The tBTC value
 */

const getTbtcValue = (outputVector: string) => {
	const voutBytes = utils.deserializeHex(outputVector);
	const fundingOutput = BTCUtils.extractOutputAtIndex(voutBytes, 1);
	const satoshi = BTCUtils.extractValue(fundingOutput);
	return satoshi.toString(10) / 1e8;
};

/**
 * @name getFundingTxVectors
 * @description Gets the funding transaction vectors
 * @param transactionHash - The transaction hash
 * @param sdk - The TBTC SDK
 * @returns The funding transaction vectors
 */

export const getFundingTxVectors = async (
	transactionHash: BitcoinTxHash,
	sdk: TBTC,
) => {
	const bitcoinRawTx = await sdk.bitcoinClient?.getRawTransaction(
		transactionHash,
	);
	const fundingTxVectors = extractBitcoinRawTxVectors(bitcoinRawTx);
	return fundingTxVectors;
};

/**
 * @name setDepositStatus
 * @description Sets the deposit status
 * @param transactionHash - The transaction hash
 * @param outputIndex - The output index
 * @param sdk - The TBTC SDK
 * @param dispatch - The dispatch function
 */

export const setDepositStatus = async (
	transactionHash: BitcoinTxHash,
	outputIndex: number,
	sdk: TBTC,
	dispatch: Dispatch,
) => {
	const fundingTxHash = reverseString(transactionHash.toString());
	const depositId = getDepositId(fundingTxHash, outputIndex);
	const status = await sdk
		.crossChainContracts('Arbitrum')
		?.l1BitcoinDepositor.getDepositState(depositId);
	if (status) dispatch(addStatus(status));
};
