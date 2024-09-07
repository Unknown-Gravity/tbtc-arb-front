import { ethers } from 'ethers';
import { tbtcContractABI } from '../contracts/tbtcContract';
import axios from 'axios';
import { L1BitcoinDepositor } from '../contracts/L1BitcoinDepositor';
import {
	BitcoinRawTxVectors,
	BitcoinTxHash,
	BitcoinUtxo,
	Deposit,
	extractBitcoinRawTxVectors,
	TBTC,
} from '@keep-network/tbtc-v2.ts';
import {
	addArbTxHash,
	addFinalizedEthTxHash,
	addInitializedEthTxHash,
	addStatus,
	addUtxo,
} from '../redux/reducers/DepositReducer';
import { Dispatch } from '@reduxjs/toolkit';
import { getDepositId, reverseString } from '../utils/utils';
const { BTCUtils, utils } = require('@summa-tx/bitcoin-spv-js');

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

const getUrlTxHeader = (isMainnet: boolean, blockExplorer: string) => {
	const etherscanExplorer = isMainnet
		? process.env.REACT_APP_ETH_EXPLORER_MAINNET
		: process.env.REACT_APP_ETH_EXPLORER_TESTNET;
	const arbiscanExplorer = isMainnet
		? process.env.REACT_APP_ARB_EXPLORER_MAINNET
		: process.env.REACT_APP_ARB_EXPLORER_TESTNET;

	return blockExplorer === 'ETHERSCAN' ? etherscanExplorer : arbiscanExplorer;
};

const initializeTbtcContract = (
	isMainnet: boolean,
	providerOrSigner: ethers.Signer | ethers.providers.Web3Provider,
) => {
	const tbtcAddress = getContractAddress(isMainnet, 'TBTC');

	if (!tbtcAddress) return null;
	return new ethers.Contract(tbtcAddress, tbtcContractABI, providerOrSigner);
};

export const getTbtcBalance = async (
	isMainnet: boolean,
	provider: ethers.providers.Web3Provider,
	address: string,
) => {
	const tbtcContract = initializeTbtcContract(isMainnet, provider);
	const tbtcBalance = await tbtcContract?.callStatic.balanceOf(address);
	return ethers.utils.formatEther(tbtcBalance);
};

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
	transactions = transactions.slice(0, 7);
	transactions.forEach(tx => {
		if (tx.status === 'PENDING') {
			tx.value = getTbtcValue(getOutputVector(tx)).toFixed(5);
		}
	});
	return transactions;
};

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

export const checkTransactionExist = async (
	isMainnet: boolean,
	fundingTx: any,
	address: string,
) => {
	const arbTransactions = await getArbTransactionsByAddress(isMainnet, address);
	const { result } = arbTransactions.data;

	return result.find((transaction: any) => {
		const decodedInput = decodeInputDataInitialize(transaction);
		return (
			decodedInput &&
			checkTransactionCoindiceFundingVectors(fundingTx, decodedInput)
		);
	});
};

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
export const handleCrossChainTransactions = async (
	fundingTxVectors: BitcoinRawTxVectors,
	address: string,
	isMainnet: boolean,
	dispatch: Dispatch,
) => {
	const arbitrumTx = await checkTransactionExist(isMainnet, fundingTxVectors, address);
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

export const getTbtcTransactionsbyAddress = async (
	isMainnet: boolean,
	address: string,
) => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'TBTC');
	const urlHeader = getUrlHeader(isMainnet, 'ARBISCAN');
	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
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
};

export const getTbtcTransactions = async (
	isMainnet: boolean,
): Promise<any[]> => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = getContractAddress(isMainnet, 'TBTC');
	const urlHeader = getUrlHeader(isMainnet, 'ARBISCAN');
	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=100&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;
	const {
		data: { result },
	} = await axios.get(url);
	const urlTxHeader = getUrlTxHeader(isMainnet, 'ARBISCAN');
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
		.sort((a: any, b: any) => b.timeStamp - a.timeStamp)
		.slice(0, 8);
};

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

const checkErrorTx = (tx: any) => {
	return tx.isError === '1';
};

const checkNormalTx = (tx: any, address: string, contractAddress: string) => {
	return (
		tx.from.toLowerCase() === address.toLowerCase() &&
		tx.to.toLowerCase() === contractAddress.toLowerCase()
	);
};

const isInitialized = (tx: any) => {
	return tx.functionName.includes('initializeDeposit');
};

const isFinalized = (tx: any) => {
	return tx.functionName.includes('finalizeDeposit');
};

const isPending = (tx1: any, data: Array<any>): boolean => {
	return data.some(
		tx =>
			tx1.input === tx.input &&
			isInitialized(tx1) &&
			!isFinalized(tx) &&
			!checkErrorTx(tx),
	);
};

const getOutputVector = (tx: any) => {
	const iface = new ethers.utils.Interface(L1BitcoinDepositor);
	const input = iface.decodeFunctionData('initializeDeposit', tx.input);
	return input.fundingTx.outputVector;
};

const decodeInputDataInitialize = (tx: any) => {
	if (tx.functionName.includes('initializeDeposit')) {
		const iface = new ethers.utils.Interface(L1BitcoinDepositor);
		const input = iface.decodeFunctionData('initializeDeposit', tx.input);
		return input;
	}
};

const decodedInputDataFinalize = (tx: any) => {
	if (tx.functionName.includes('finalizeDeposit')) {
		const iface = new ethers.utils.Interface(L1BitcoinDepositor);
		const input = iface.decodeFunctionData('finalizeDeposit', tx.input);
		return input;
	}
};

const getTbtcValue = (outputVector: string) => {
	const voutBytes = utils.deserializeHex(outputVector);
	const fundingOutput = BTCUtils.extractOutputAtIndex(voutBytes, 1);
	const satoshi = BTCUtils.extractValue(fundingOutput);
	return satoshi.toString(10) / 1e8;
};

export const getFundingTxVectors = async (
	transactionHash: BitcoinTxHash,
	sdk: TBTC,
) => {
	// Handle Bitcoin transaction vectors and Arbitrum transaction
	const bitcoinRawTx = await sdk.bitcoinClient?.getRawTransaction(
		transactionHash,
	);
	const fundingTxVectors = extractBitcoinRawTxVectors(bitcoinRawTx);
	return fundingTxVectors;
};

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
