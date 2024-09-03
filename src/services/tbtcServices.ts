import { ethers } from 'ethers';
import { tbtcContractABI } from '../contracts/tbtcContract';
import axios from 'axios';
import { formatAddress } from '../utils/utils';

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

export const getTbtcTransactions = async (address: string) => {
	const apiKey = process.env.REACT_APP_ARBISCAN_API_KEY;
	const contractAddress = '0xb8f31A249bcb45267d06b9E51252c4793B917Cd0';
	const url = `https://api-sepolia.arbiscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
	const res = await axios.get(url);
	const formatted = res.data.result.map((tx: any) => ({
		hash: formatAddress(tx.hash),
		value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),

		status: tx.confirmations > 0 ? 'MINTED' : 'PENDING',
	}));
	console.log('🚀 ~ formatted ~ formatted:', formatted);
	return formatted;
};

export const getEtherScanTransactions = async () => {
	const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
	const address = '0xe6315e44a83444992c90b889CAEce8362e7322fF';
	const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
	const res = await axios.get(url);
	console.log('🚀 ~ getEtherScanTransactions ~ res:', res);
	// const formatted = res.data.result.map((tx: any) => ({
	// 	hash: formatAddress(tx.hash),
	// 	value: parseFloat(ethers.utils.formatEther(tx.value)).toFixed(3),
	// 	status: tx.confirmations > 0 ? 'CONFIRMED' : 'PENDING',
	// }));
	// return formatted;
};
