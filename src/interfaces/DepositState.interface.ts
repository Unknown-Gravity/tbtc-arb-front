import { DepositReceipt } from '@keep-network/tbtc-v2.ts';

/**
 * @name DepositState
 *
 * @description This interface contains the properties for the DepositState object.
 */

export interface DepositState {
	receipt: DepositReceipt | null;
	btcRecoveryAddress: string | null;
	btcDepositAddress: string | null;
	ethAddress: string | null;
}
