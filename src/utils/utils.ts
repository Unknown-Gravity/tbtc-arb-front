import { DepositReceipt, Hex } from '@keep-network/tbtc-v2.ts';
import axios from 'axios';
import blockies from 'ethereum-blockies';
import { ethers } from 'ethers';
import { Event } from '../pages/components/Loyalty/LeaderboardComponent';

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

/**
 * @name generateIdenticon
 * @description Generates an identicon for the given address.
 * @param {string} address - The address to generate the identicon for.
 * @returns The identicon.
 */

export const generateIdenticon = (address: string) => {
	return blockies.create({ seed: address.toLowerCase() }).toDataURL();
};

/**
 * @name currencyFormatter
 * @description Formats a number as a currency.
 * @param {number} money - The number to format.
 * @param {Currency} currency - The currency to format the number as.
 * @param {string} symbol - The symbol to display.
 * @returns The formatted currency.
 */

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

/**
 * @name convertBTCToCurrency
 * @description Converts a BTC amount to a currency.
 * @param {number} btcAmount - The BTC amount to convert.
 * @param {Currency} currency - The currency to convert the BTC amount to.
 * @returns The converted currency.
 */

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

/**
 * @name getDifferenceInMinutes
 * @description Returns the difference in minutes between two dates.
 * @param {Date} date1 - The first date.
 * @param {Date} date2 - The second date.
 * @returns The difference in minutes.
 */

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

/**
 * @name normalizeNetWorkNames
 * @description Normalizes the network names.
 * @param {string} networkName - The network name to normalize.
 * @returns The normalized network name.
 */

export const normalizeNetWorkNames = (networkName: string): string => {
	if (!networkName) return '';

	return networkName
		.split('-') // Divide el nombre en partes usando guiones
		.map(
			word => word.charAt(0).toUpperCase() + word.slice(1), // Capitaliza la primera letra de cada palabra
		)
		.join(' ');
};

/**
 * @name formatAddress
 * @description Formats an address.
 * @param {string} address - The address to format.
 * @returns The formatted address.
 */

export const formatAddress = (
	address: `0x${string}` | undefined | string,
	isMobile?: boolean,
): string => {
	return !isMobile
		? address?.slice(0, 5) + '...' + address?.slice(-4)
		: address?.slice(0, 3) + '...' + address?.slice(-2);
};

/**
 * @name formatAmount
 * @description Formats an amount.
 * @param {number} amount - The amount to format.
 * @returns The formatted amount.
 */

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

/**
 * @name truncateToDecimals
 * @param {string} value - The decimal value to truncate
 * @param {number} decimals - The number of decimals to truncate to
 * @returns The truncated value
 */

export const truncateToDecimals = (value: string, decimals: number) => {
	if (parseFloat(value) === 0) return '0';
	const [integerPart, decimalPart] = value.split('.');
	if (!decimalPart || decimalPart.length <= decimals) {
		return value;
	}
	return `${integerPart}.${decimalPart.slice(0, decimals)}`;
};

/**
 * @name fetchLoyaltyProgramRewards
 * @description Fetches the loyalty program Rewards.
 * @returns The loyalty program Rewards.
 */

export const fetchLoyaltyProgramRewards = async () => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_LOYALTY_PROGRAM_API_URL}`,
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching Rewards:', error);
		return null;
	}
};

/**
 * @name fetchDepositReceipt
 * @description Fetches the deposit receipt.
 * @param {string} receipt - The deposit receipt.
 * @returns The deposit receipt.
 */

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

/**
 * @name deserializeReceipt
 * @description Deserializes the deposit receipt.
 * @param {DepositReceipt} receipt - The receipt to deserialize.
 * @param {string} depositId - The deposit ID.
 * @returns The deserialized receipt.
 */

const getDepositId = (
	fundingTxHash: string,
	fundingOutputIndex: number,
): string => {
	// Make sure fundingTxHash is a 64-character hexadecimal string
	if (fundingTxHash.length !== 64) {
		throw new Error('Invalid fundingTxHash');
	}

	// Convert the fundingTxHash to a bytes32 format expected by ethers.js
	const fundingTxHashBytes = '0x' + fundingTxHash;

	// Encode the data similar to abi.encodePacked in Solidity
	const encodedData = ethers.utils.solidityPack(
		['bytes32', 'uint32'],
		[fundingTxHashBytes, fundingOutputIndex],
	);

	// Calculate the keccak256 hash
	const hash = ethers.utils.keccak256(encodedData);

	// Convert the hash to a 256-bit unsigned integer (uint256)
	const depositKey = ethers.BigNumber.from(hash).toString();

	return depositKey;
};

/**
 * @name reverseString
 * @description Reverses a string.
 * @param {string} str - The string to reverse.
 * @returns The reversed string.
 */

const reverseString = (str: string) => {
	let interleaved = '';

	// Recorre el string en pares desde el final hasta el principio
	for (let i = str.length - 2; i >= 0; i -= 2) {
		interleaved += str[i] + str[i + 1];
	}

	return interleaved;
};

/**
 * @name getBtcBlockExplorerUrl
 * @description Returns the block explorer URL for the BTC network.
 * @param {boolean} isMainnet - Whether the network is mainnet or not.
 * @param {string} txHash - The transaction hash.
 * @returns The block explorer URL.
 */

const getBtcBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_BTC_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_BTC_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

/**
 * @name getArbBlockExplorerUrl
 * @description Returns the block explorer URL for the Arbitrum network.
 * @param {boolean} isMainnet - Whether the network is mainnet or not.
 * @param {string} txHash - The transaction hash.
 * @returns The block explorer URL.
 */

const getArbBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_ARB_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_ARB_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

/**
 * @name getEthBlockExplorerUrl
 * @description Returns the block explorer URL for the Ethereum network.
 * @param {boolean} isMainnet - Whether the network is mainnet or not.
 * @param {string} txHash - The transaction hash.
 * @returns The block explorer URL.
 */

const getEthBlockExplorerUrl = (isMainnet: boolean, txHash: string) => {
	return isMainnet
		? `${process.env.REACT_APP_ETH_EXPLORER_MAINNET}/tx/${txHash}`
		: `${process.env.REACT_APP_ETH_EXPLORER_SEPOLIA}/tx/${txHash}`;
};

/**
 * @name getBlockExplorerUrl
 * @description Returns the block explorer URL.
 * @param {boolean} isMainnet - Whether the network is mainnet or not.
 * @param {string} txHash - The transaction hash.
 * @param {string} blockExplorer - The block explorer to use.
 * @returns The block explorer URL.
 */

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

/**
 * @name formatAsUSD
 * @description formats a number as USD.
 * @param {number} amount - amount to be formatted to USD.
 * @returns The amount formatted to USD.
 */

export const formatAsUSD = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
	  style: 'currency',
	  currency: 'USD',
	  minimumFractionDigits: 2, // Ensures two decimal places
	}).format(amount);
  };
