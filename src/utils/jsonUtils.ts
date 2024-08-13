import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

const fs = require('fs');
const path = require('path');

const JSON_DIR = process.env.JSON_PATH || './data/';
const dirPath = path.resolve('.', JSON_DIR);

const normalizeData = (
	data: DepositReceipt,
	btcRecoveryAddress: string,
	ethAddress: any,
) => {
	return {
		depositor: { identifierHex: data.depositor.identifierHex.toString() },
		refundLockTime: data.refundLocktime.toString(),
		refundPublicKeyHash: data.refundPublicKeyHash.toString(),
		blindingFactor: data.blindingFactor.toString(),
		ethAddress: ethAddress,
		walletPublicKeyHash: data.walletPublicKeyHash.toString(),
		btcRecoveryAddress: btcRecoveryAddress,
	};
};

const downloadJson = (
	data: DepositReceipt,
	btcRecoveryAddress: string,
	ethAddress: any,
): void => {
	const json = JSON.stringify(
		normalizeData(data, btcRecoveryAddress, ethAddress),
		null,
		2,
	);
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const operationId = data.depositor.identifierHex.toString();

	const link = document.createElement('a');
	link.href = url;
	link.download = `${operationId}.json`;
	document.body.appendChild(link);
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

export { downloadJson };
