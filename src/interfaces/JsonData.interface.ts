import { ChainIdentifier, Hex } from '@keep-network/tbtc-v2.ts';

/**
 * @name JsonData
 *
 * @description This interface contains the properties for the JsonData object.
 */

export interface JsonData {
	blindingFactor: Hex;
	btcDepositAddress: string;
	btcRecoveryAddress: string;
	depositor: ChainIdentifier;
	ethAddress: string;
	refundLocktime: Hex;
	refundPublicKeyHash: Hex;
	walletPublicKeyHash: Hex;
}
