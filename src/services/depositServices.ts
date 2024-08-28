import {
	ChainIdentifier,
	CrossChainDepositor,
	Deposit,
	DepositReceipt,
	TBTC,
} from '@keep-network/tbtc-v2.ts';
import { getDepositId, reverseString } from '../utils/utils';

const checkDepositStatus = async (deposit: Deposit, sdk: TBTC) => {
	const fundingUxtos = await deposit?.detectFunding();
	if (!fundingUxtos) {
		return;
	}
	const { outputIndex, transactionHash } = fundingUxtos[0];
	const depositId = getDepositId(
		reverseString(transactionHash.toString()),
		outputIndex,
	);
	const depositState = await sdk
		?.crossChainContracts('Arbitrum')
		?.l1BitcoinDepositor.getDepositStatus(depositId);
	return depositState;
};

const getDepositInfo = async (receipt: DepositReceipt, sdk: TBTC) => {
	const {
		blindingFactor,
		walletPublicKeyHash,
		refundPublicKeyHash,
		refundLocktime,
		depositor,
		extraData,
		...restReceipt
	} = receipt;

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

	const deposit = await Deposit.fromReceipt(
		depositReceipt,
		sdk.tbtcContracts,
		sdk.bitcoinClient,
		depositorProxy,
	);

	return deposit;
};

export { checkDepositStatus, getDepositInfo };
