import { BitcoinUtxo, Deposit } from '@keep-network/tbtc-v2.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepositState {
	deposit: Deposit | null;
	btcRecoveryAddress: string | null;
	btcDepositAddress: string | null;
	ethAddress: string | null;
	utxo?: BitcoinUtxo | null;
	arbTxHash?: string | null;
	initializedEthTxHash?: string | null;
	finalizedEthTxHash?: string | null;
	status?: number | null;
}

const initialState: DepositState = {
	deposit: null,
	btcRecoveryAddress: null,
	btcDepositAddress: null,
	ethAddress: null,
	utxo: null,
	arbTxHash: null,
	initializedEthTxHash: null,
	finalizedEthTxHash: null,
	status: null,
};

/**
 *
 * @name depositSlice
 * @description The slice for the necessary deposit information
 *
 */

export const depositSlice = createSlice({
	name: 'deposit',
	initialState,
	reducers: {
		eraseDeposit: () => initialState,
		addDeposit: {
			reducer: (state, action: PayloadAction<DepositState>) => {
				const {
					deposit,
					btcDepositAddress,
					btcRecoveryAddress,
					ethAddress,
				} = action.payload;
				state.deposit = deposit;
				state.btcDepositAddress = btcDepositAddress;
				state.btcRecoveryAddress = btcRecoveryAddress;
				state.ethAddress = ethAddress;
			},
			prepare: (
				deposit: Deposit,
				btcDepositAddress: string,
				btcRecoveryAddress: string,
				ethAddress: string,
			) => {
				return {
					payload: {
						deposit,
						btcDepositAddress,
						btcRecoveryAddress,
						ethAddress,
					},
				};
			},
		},
		addUtxo: {
			reducer: (state, action: PayloadAction<BitcoinUtxo>) => {
				state.utxo = action.payload;
			},
			prepare: (utxo: BitcoinUtxo) => {
				return {
					payload: utxo,
				};
			},
		},
		addStatus: {
			reducer: (state, action: PayloadAction<number>) => {
				state.status = action.payload;
			},
			prepare: (status: number) => {
				return {
					payload: status,
				};
			},
		},
		addArbTxHash: {
			reducer: (state, action: PayloadAction<string>) => {
				state.arbTxHash = action.payload;
			},
			prepare: (arbTxHash: string) => {
				return {
					payload: arbTxHash,
				};
			},
		},
		addInitializedEthTxHash: {
			reducer: (state, action: PayloadAction<string>) => {
				state.initializedEthTxHash = action.payload;
			},
			prepare: (initializedEthTxHash: string) => {
				return {
					payload: initializedEthTxHash,
				};
			},
		},
		addFinalizedEthTxHash: {
			reducer: (state, action: PayloadAction<string>) => {
				state.finalizedEthTxHash = action.payload;
			},
			prepare: (finalizedEthTxHash: string) => {
				return {
					payload: finalizedEthTxHash,
				};
			},
		},
	},
});

export const {
	eraseDeposit,
	addDeposit,
	addUtxo,
	addStatus,
	addArbTxHash,
	addInitializedEthTxHash,
	addFinalizedEthTxHash,
} = depositSlice.actions;
export default depositSlice.reducer;
