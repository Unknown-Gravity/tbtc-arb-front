import {
	ChainIdentifier,
	Deposit,
	CrossChainDepositor,
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
		extraData,
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
		extraData: extraData,
		...restReceipt,
	};

	const crossChainContracts = sdk.crossChainContracts('Arbitrum');
	if (!crossChainContracts) {
		return;
	}

	const depositorProxy = new CrossChainDepositor(crossChainContracts);
	console.log('🚀 ~ getDepositInfo ~ depositorProxy:', depositorProxy);

	const deposit = await Deposit.fromReceipt(
		depositReceipt,
		sdk.tbtcContracts,
		sdk.bitcoinClient,
		depositorProxy,
	);

	return deposit;
};
