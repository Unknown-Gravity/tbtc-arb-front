import { ethers } from 'ethers';
import { tbtcContractABI } from '../contracts/tbtcContract';
import axios from 'axios';

const initializeTbtcContract = (
	isMainnet: boolean,
	providerOrSigner: ethers.Signer | ethers.providers.Web3Provider,
) => {
	const tbtcAddress = isMainnet
		? process.env.REACT_APP_TBTC_MAINNET
		: process.env.REACT_APP_TBTC_TESTNET;

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
	return transactions.slice(0, 7);
};

export const getTbtcTransactionsbyAddress = async (
	isMainnet: boolean,
	address: string,
) => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = isMainnet
		? process.env.REACT_APP_TBTC_MAINNET
		: process.env.REACT_APP_TBTC_TESTNET;
	const urlHeader = isMainnet
		? 'https://api.arbiscan.io'
		: 'https://api-sepolia.arbiscan.io';
	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
	const res = await axios.get(url);
	const formatted = res.data.result.map((tx: any) => ({
		value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),
		hash: tx.hash,
		status: 'MINTED',
		timeStamp: tx.timeStamp,
		date: new Date(tx.timeStamp * 1000).toLocaleString(),
		isError: '0',
		network: 'ARBISCAN',
	}));
	return formatted;
};

export const getTbtcTransactions = async (
	isMainnet: boolean,
): Promise<any[]> => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = isMainnet
		? process.env.REACT_APP_TBTC_MAINNET
		: process.env.REACT_APP_TBTC_TESTNET;
	const urlHeader = isMainnet
		? 'https://api.arbiscan.io'
		: 'https://api-sepolia.arbiscan.io';

	const url = `${urlHeader}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

	const {
		data: { result },
	} = await axios.get(url);

	return result.map((tx: any) => ({
		value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),
		hash: tx.hash,
		status: 'MINTED',
		timeStamp: tx.timeStamp,
		date: new Date(tx.timeStamp * 1000).toLocaleString(),
		isError: '0',
		network: 'ARBISCAN',
	}));
};

export const getEtherScanTransactions = async (
	isMainnet: boolean,
	address: string,
): Promise<any[]> => {
	const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
	const contractAddress = isMainnet
		? process.env.REACT_APP_L1BITCOIN_MAINNET
		: process.env.REACT_APP_L1BITCOIN_SEPOLIA;

	const urlHeader = isMainnet
		? 'https://api.etherscan.io'
		: 'https://api-sepolia.etherscan.io';

	const url = `${urlHeader}/api?module=account&action=txlist&contractaddress=${contractAddress}&address=${address}&page=1&offset=50&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;

	let data: any = (await axios.get(url)).data.result;

	if (!contractAddress) return [];

	const myData = data.filter((tx: any) =>
		checkNormalTx(tx, address, contractAddress),
	);

	return normalizeEtherScanData(myData);
};

const normalizeEtherScanData = (data: any[]): any[] => {
	return data
		.filter(tx => checkErrorTx(tx) || isPending(tx, data))
		.map(tx => ({
			value: null,
			hash: tx.hash,
			status: checkErrorTx(tx) ? 'ERROR' : 'PENDING',
			timeStamp: tx.timeStamp,
			date: new Date(tx.timeStamp * 1000).toLocaleString(),
			isError: tx.isError,
			network: 'ETHERSCAN',
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
