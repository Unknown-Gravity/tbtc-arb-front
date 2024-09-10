import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

/**
 * @name normalizeData
 * @description Normalizes the data for the JSON file.
 * @param receipt - The deposit receipt.
 * @param btcDepositAddress - The BTC deposit address.
 * @param btcRecoveryAddress - The BTC recovery address.
 * @param ethAddress - The ETH address.
 * @returns Data normalized for the JSON file.
 */

export const normalizeData = (
	receipt: DepositReceipt,
	btcDepositAddress: string,
	btcRecoveryAddress: string,
	ethAddress: any,
) => {
	return {
		depositor: {
			identifierHex: receipt.depositor.identifierHex.toString(),
		},
		refundLocktime: receipt.refundLocktime.toString(),
		refundPublicKeyHash: receipt.refundPublicKeyHash.toString(),
		blindingFactor: receipt.blindingFactor.toString(),
		walletPublicKeyHash: receipt.walletPublicKeyHash.toString(),
		extraData: receipt.extraData?.toString(),
		ethAddress: ethAddress,
		btcRecoveryAddress: btcRecoveryAddress,
		btcDepositAddress: btcDepositAddress,
	};
};

/**
 * @name createDownloadLink
 * @description Creates a download link for the JSON file.
 * @param {string} url - The URL of the JSON file.
 * @param {string} fileName - The name of the JSON file.
 */

const createDownloadLink = (url: string, fileName: string): void => {
	const link = document.createElement('a');
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

/**
 * @name generateUrl
 * @description Generates the URL for the JSON file.
 * @param {string} jsonData - The JSON data.
 * @returns The URL of the JSON file.
 */

const generateUrl = (jsonData: string): string => {
	const blob = new Blob([jsonData], { type: 'application/json' });
	return URL.createObjectURL(blob);
};

/**
 * @name generateFileName
 * @description Generates the name of the JSON file.
 * @param {string} identifierHex - The identifier hex.
 * @param {string} btcRecoveryAddress - The BTC recovery address.
 * @returns The name of the JSON file.
 */

const generateFileName = (
	identifierHex: string,
	btcRecoveryAddress: string,
): string => {
	const date = new Date();
	return `${identifierHex}_${btcRecoveryAddress}_${date.toLocaleDateString()}_${date.getTime()}.json`;
};

/**
 * @name downloadJson
 * @description Downloads the JSON file.
 * @param receipt - The deposit receipt.
 * @param btcDepositAddress - The BTC deposit address.
 * @param btcRecoveryAddress - The BTC recovery address.
 * @param ethAddress - The ETH address.
 */

const downloadJson = (
	receipt: DepositReceipt,
	btcDepositAddress: string,
	btcRecoveryAddress: string,
	ethAddress: any,
): void => {
	// Destructure required fields from receipt for better readability
	const {
		depositor: { identifierHex },
	} = receipt;

	const jsonData = JSON.stringify(
		normalizeData(
			receipt,
			btcDepositAddress,
			btcRecoveryAddress,
			ethAddress,
		),
		null,
		2,
	);
	const url = generateUrl(jsonData);
	const fileName = generateFileName(identifierHex, btcRecoveryAddress);

	createDownloadLink(url, fileName);
};

export { downloadJson };
