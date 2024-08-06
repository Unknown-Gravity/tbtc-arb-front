import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	provider: null,
	signer: null,
	balance: '0',
};

/**
 *
 * @name accountSlice
 * @description The auth slice
 * @version 1.0.0
 *
 */
export const accountSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
		addAccount: (state, action) => {
			const { provider, signer, balance } = action.payload;
			state.provider = provider;
			state.signer = signer;
			state.balance = balance;
		},
	},
});

export const { reset, addAccount } = accountSlice.actions;
export default accountSlice.reducer;
