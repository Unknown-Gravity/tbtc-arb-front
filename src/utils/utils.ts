import { DepositReceipt, Hex } from '@keep-network/tbtc-v2.ts';
import axios from 'axios';
import blockies from 'ethereum-blockies';
import { ethers } from 'ethers';

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP';

interface PriceResponse {
	bpi: {
		USD: { rate_float: number };
		EUR: { rate_float: number };
		GBP: { rate_float: number };
		[key: string]: { rate_float: number };
	};
}

const currencyLocales: { [key in Currency]: string } = {
	USD: 'en-US',
	EUR: 'de-DE',
	JPY: 'ja-JP',
	GBP: 'en-GB',
};

export const generateIdenticon = (address: string) => {
	return blockies.create({ seed: address.toLowerCase() }).toDataURL();
};

export const currencyFormatter = (
	money: number,
	currency: 'USD' | 'EUR' | 'JPY' | 'GBP' = 'USD',
	symbol: string = 'symbol',
): string => {
	const locale = currencyLocales[currency] || 'en-US';

	// Si el símbolo es 'none', formateamos solo el número sin símbolo ni código de moneda
	if (symbol === 'none') {
		return new Intl.NumberFormat(locale, {
			maximumFractionDigits: 2,
			minimumFractionDigits: 0,
		}).format(money);
	}

	const currencyDisplay: 'symbol' | 'code' = 'symbol';

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay,
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	});

	return formatter.format(money);
};

export const convertBTCToCurrency = async (
	btcAmount: number,
	currency: Currency = 'USD',
): Promise<string> => {
	try {
		const response = await axios.get<PriceResponse>(COINDESK_API_URL);
		const rate = response.data.bpi[currency].rate_float;

		if (!rate) {
			throw new Error(`Exchange rate for ${currency} not found`);
		}

		const currencyAmount = btcAmount * rate;
		return currencyFormatter(currencyAmount, currency);
	} catch (error) {
		console.error('Error fetching Bitcoin price:', error);
		throw new Error('Could not fetch Bitcoin price');
	}
};

export const getDifferenceInMinutes = (date1: Date, date2: Date) => {
	const diffInMs = date2.getTime() - date1.getTime();
	const diffInMinutes = Math.floor(diffInMs / 60000);

	if (diffInMinutes < 60) {
		return `${diffInMinutes} minutes ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hours ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	return `${diffInDays} days ago`;
};

export const normalizeNetWorkNames = (networkName: string): string => {
	if (!networkName) return '';

	return networkName
		.split('-') // Divide el nombre en partes usando guiones
		.map(
			word => word.charAt(0).toUpperCase() + word.slice(1), // Capitaliza la primera letra de cada palabra
		)
		.join(' ');
};

export const formatAddress = (
	address: `0x${string}` | undefined | string,
): string => {
	return address?.slice(0, 5) + '...' + address?.slice(-4);
};

const millisecondsToTimeString = (milliseconds: number): string => {
	const totalMinutes = milliseconds / 60000; // 1 minuto = 60,000 milisegundos
	const hours = Math.floor(totalMinutes / 60);
	const minutes = Math.floor(totalMinutes % 60);

	if (hours > 0) {
		return `${hours} HOURS ${minutes} MINUTES`;
	} else {
		return `${minutes} MINUTES`;
	}
};

export const truncateToDecimals = (value: string, decimals: number) => {
	if (parseFloat(value) === 0) return '0';
	const [integerPart, decimalPart] = value.split('.');
	if (!decimalPart || decimalPart.length <= decimals) {
		return value;
	}
	return `${integerPart}.${decimalPart.slice(0, decimals)}`;
};

export const fetchLoyaltyProgramCIDs = async () => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_LOYALTY_PROGRAM_API_URL}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching CIDs:', error);
		return null;
	}
};

export const fetchIPFSData = async (cid: string) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_IPFS_RETRIEVER_URL}${cid}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching IPFS data:', error);
		return null;
	}
};

export const serializeReceipt = (receipt: DepositReceipt) => {
	const serializedReceipt = {
		...receipt,
		blindingFactor: Hex.from(receipt.blindingFactor.toString()),
		refundLocktime: Hex.from(receipt.refundLocktime.toString()),
		refundPublicKeyHash: Hex.from(receipt.refundPublicKeyHash.toString()),
		walletPublicKeyHash: Hex.from(receipt.walletPublicKeyHash.toString()),
	};
	return serializedReceipt;
};

const getDepositId = (
	fundingTxHash: string,
	fundingOutputIndex: number,
): string => {
	// Asegúrate de que fundingTxHash es una cadena de 64 caracteres hexadecimales
	if (fundingTxHash.length !== 64) {
		throw new Error('Invalid fundingTxHash');
	}

	// Convertir el fundingTxHash a un formato de bytes32 esperado por ethers.js
	const fundingTxHashBytes = '0x' + fundingTxHash;

	// Codifica los datos de manera similar a abi.encodePacked en Solidity
	const encodedData = ethers.utils.solidityPack(
		['bytes32', 'uint32'],
		[fundingTxHashBytes, fundingOutputIndex],
	);

	// Calcula el hash keccak256
	const hash = ethers.utils.keccak256(encodedData);

	// Convierte el- hash a un entero sin signo de 256 bits (uint256)
	const depositKey = ethers.BigNumber.from(hash).toString();

	return depositKey;
};

const reverseString = (str: string) => {
	let interleaved = '';

	// Recorre el string en pares desde el final hasta el principio
	for (let i = str.length - 2; i >= 0; i -= 2) {
		interleaved += str[i] + str[i + 1];
	}

	return interleaved;
};

const getBtcBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_BTC_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_BTC_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

const getArbBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_ARB_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_ARB_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

const getEthBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_ETH_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_ETH_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

const getBlockExplorerUrl = (
	isMainnet: boolean,
	txHash: string,
	blockExplorer: string,
) => {
	if (blockExplorer === 'ETHERSCAN') {
		return getEthBlockExplorerUrl(isMainnet, txHash);
	} else if (blockExplorer === 'ARBISCAN') {
		return getArbBlockExplorerUrl(isMainnet, txHash);
	} else {
		return getBtcBlockExplorerUrl(isMainnet, txHash);
	}
};

export {
	millisecondsToTimeString,
	getDepositId,
	reverseString,
	getBlockExplorerUrl,
};
