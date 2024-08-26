import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

const normalizeData = (
	data: DepositReceipt,
	btcRecoveryAddress: string,
	btcDepositAddress: string,
	ethAddress: any,
) => {
	return {
		depositor: { identifierHex: data.depositor.identifierHex.toString() },
		refundLocktime: data.refundLocktime.toString(),
		refundPublicKeyHash: data.refundPublicKeyHash.toString(),
		blindingFactor: data.blindingFactor.toString(),
		ethAddress: ethAddress,
		walletPublicKeyHash: data.walletPublicKeyHash.toString(),
		btcRecoveryAddress: btcRecoveryAddress,
		btcDepositAddress: btcDepositAddress,
	};
};

const downloadJson = (
	data: DepositReceipt,
	btcRecoveryAddress: string,
	btcDepositAddress: string,
	ethAddress: any,
): void => {
	const json = JSON.stringify(
		normalizeData(data, btcRecoveryAddress, btcDepositAddress, ethAddress),
		null,
		2,
	);
	console.log('🚀 ~ json:', json);
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
