import { Deposit } from '@keep-network/tbtc-v2.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepositState {
	deposit: Deposit | null;
	btcRecoveryAddress: string | null;
	btcDepositAddress: string | null;
}

const initialState: DepositState = {
	deposit: null,
	btcRecoveryAddress: null,
	btcDepositAddress: null,
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
				const { deposit, btcDepositAddress, btcRecoveryAddress } =
					action.payload;
				state.deposit = deposit;
				state.btcDepositAddress = btcDepositAddress;
				state.btcRecoveryAddress = btcRecoveryAddress;
			},
			prepare: (
				deposit: Deposit,
				btcDepositAddress: string,
				btcRecoveryAddress: string,
			) => {
				return {
					payload: {
						deposit,
						btcDepositAddress,
						btcRecoveryAddress,
					},
				};
			},
		},
	},
});

export const { eraseDeposit, addDeposit } = depositSlice.actions;
export default depositSlice.reducer;
