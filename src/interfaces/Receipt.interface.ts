import { ChainIdentifier } from '@keep-network/tbtc-v2.ts';

export interface Receipt {
	blindingFactor: string;
	depositor: ChainIdentifier;
	refundLockTime: string;
	refundPublicKeyHash: string;
	walletPublicKeyHash: string;
}
