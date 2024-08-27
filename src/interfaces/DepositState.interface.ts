import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

export interface DepositState {
	receipt: DepositReceipt | null;
	btcRecoveryAddress: string | null;
	btcDepositAddress: string | null;
	ethAddress: string | null;
}
