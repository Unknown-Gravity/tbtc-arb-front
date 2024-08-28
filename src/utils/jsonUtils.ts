import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

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

const downloadJson = (
	receipt: DepositReceipt,
	btcDepositAddress: string,
	btcRecoveryAddress: string,
	ethAddress: any,
): void => {
	const json = JSON.stringify(
		normalizeData(
			receipt,
			btcDepositAddress,
			btcRecoveryAddress,
			ethAddress,
		),
		null,
		2,
	);
	const blob = new Blob([json], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const operationId = receipt.depositor.identifierHex.toString();

	const link = document.createElement('a');
	link.href = url;
	link.download = `${operationId}_${btcRecoveryAddress}_${new Date().toLocaleDateString()}.json`;
	document.body.appendChild(link);
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

export { downloadJson };
