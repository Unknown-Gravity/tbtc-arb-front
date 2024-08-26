import { ChainIdentifier, Hex } from '@keep-network/tbtc-v2.ts';

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
