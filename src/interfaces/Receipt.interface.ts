import { ChainIdentifier } from '@keep-network/tbtc-v2.ts';

/**
 * @name Receipt
 *
 * @description This interface contains the properties for the Receipt object.
 */

export interface Receipt {
	blindingFactor: string;
	depositor: ChainIdentifier;
	refundLockTime: string;
	refundPublicKeyHash: string;
	walletPublicKeyHash: string;
}
