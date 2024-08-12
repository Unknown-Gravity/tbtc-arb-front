import { DepositReceipt } from '@keep-network/tbtc-v2.ts';
import { Receipt } from '../interfaces/Receipt.interface';
import { HexBuffer } from '../interfaces/HexBuffer.interface';

const fs = require('fs');
const path = require('path');

const JSON_DIR = process.env.JSON_PATH || './data/';
const dirPath = path.resolve('.', JSON_DIR);

const normalizeData = (data: DepositReceipt, btcAddress: string) => {
	return {
		depositor: { identifierHex: data.depositor.identifierHex.toString() },
		refundLockTime: data.refundLocktime.toString(),
		refundPublicKeyHash: data.refundPublicKeyHash.toString(),
		blindingFactor: data.blindingFactor.toString(),
		walletPublicKeyHash: data.walletPublicKeyHash.toPrefixedString(),
		btcRecoveryAddress: btcAddress,
	};
};

const downloadJson = (
	data: DepositReceipt,
	btcAddress: string,
	operationId: string,
): void => {
	const json = JSON.stringify(normalizeData(data, btcAddress), null, 2);
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);

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
