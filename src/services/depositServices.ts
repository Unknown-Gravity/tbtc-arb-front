import {
	ChainIdentifier,
	CrossChainDepositor,
	Deposit,
	DepositReceipt,
	TBTC,
} from '@keep-network/tbtc-v2.ts';
import { getDepositId, reverseString } from '../utils/utils';

// This function checks the status of a deposit
const checkDepositStatus = async (deposit: Deposit, sdk: TBTC) => {
	// Detect funding UTXOs for the deposit
	const fundingUxtos = await deposit?.detectFunding();
	if (!fundingUxtos) {
		return;
	}
	// Get the output index and transaction hash of the first funding UTXO
	const { outputIndex, transactionHash } = fundingUxtos[0];
	// Generate the deposit ID using the transaction hash and output index
	const depositId = getDepositId(
		reverseString(transactionHash.toString()),
		outputIndex,
	);
	// Get the deposit state from the cross-chain contracts
	const depositState = await sdk
		?.crossChainContracts('Arbitrum')
		?.l1BitcoinDepositor.getDepositState(depositId);
	return depositState;
};

// This function retrieves deposit information from a deposit receipt
const getDepositInfo = async (receipt: DepositReceipt, sdk: TBTC) => {
	// Destructure the receipt object and extract necessary properties
	const {
		blindingFactor,
		walletPublicKeyHash,
		refundPublicKeyHash,
		refundLocktime,
		depositor,
		extraData,
		...restReceipt
	} = receipt;

	// Create a new deposit receipt object with modified properties
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

	// Get the cross-chain contracts from the SDK
	const crossChainContracts = sdk.crossChainContracts('Arbitrum');
	if (!crossChainContracts) {
		return;
	}

	// Create a depositor proxy using the cross-chain contracts
	const depositorProxy = new CrossChainDepositor(crossChainContracts);

	// Create a deposit object from the deposit receipt
	const deposit = await Deposit.fromReceipt(
		depositReceipt,
		sdk.tbtcContracts,
		sdk.bitcoinClient,
		depositorProxy,
	);

	return deposit;
};

export { checkDepositStatus, getDepositInfo };
