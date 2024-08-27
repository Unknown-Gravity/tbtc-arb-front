import { Deposit } from '@keep-network/tbtc-v2.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepositState {
	deposit: Deposit | null;
	btcRecoveryAddress: string | null;
	btcDepositAddress: string | null;
	ethAddress: string | null;
}

const initialState: DepositState = {
	deposit: null,
	btcRecoveryAddress: null,
	btcDepositAddress: null,
	ethAddress: null,
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
	},
});

export const { eraseDeposit, addDeposit } = depositSlice.actions;
export default depositSlice.reducer;
