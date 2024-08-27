import {
	ChainIdentifier,
	Deposit,
	DepositReceipt,
	TBTC,
} from '@keep-network/tbtc-v2.ts';

export const getDepositInfo = async (receipt: DepositReceipt, sdk: TBTC) => {
	const {
		blindingFactor,
		walletPublicKeyHash,
		refundPublicKeyHash,
		refundLocktime,
		depositor,
		...restReceipt
	} = receipt;
	console.log('🚀 ~ getDepositInfo ~ blindingFactor:', blindingFactor);

	const depositReceipt: DepositReceipt = {
		depositor: {
			identifierHex: depositor.identifierHex,
			equals: (identifier: ChainIdentifier) => {
				return depositor.identifierHex === identifier.identifierHex;
			},
		},
		blindingFactor: blindingFactor,
		walletPublicKeyHash: walletPublicKeyHash,
		refundLocktime: refundLocktime,
		refundPublicKeyHash: refundPublicKeyHash,
		...restReceipt,
	};

	const deposit = await Deposit.fromReceipt(
		depositReceipt,
		sdk.tbtcContracts,
		sdk.bitcoinClient,
	);

	return deposit;
};
