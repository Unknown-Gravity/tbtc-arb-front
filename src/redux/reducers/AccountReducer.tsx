import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

// Define the initial state type
interface AccountState {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.Signer | null;
	balance: string;
}

// Define the initial state
const initialState: AccountState = {
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
		addAccount: {
			reducer: (state, action: PayloadAction<AccountState>) => {
				const { provider, signer, balance } = action.payload;
				state.provider = provider;
				state.signer = signer;
				state.balance = balance;
			},
			prepare: (
				provider: ethers.providers.Web3Provider,
				signer: ethers.Signer,
				balance: string,
			) => {
				return {
					payload: {
						provider,
						signer,
						balance,
					},
				};
			},
		},
	},
});

export const { reset, addAccount } = accountSlice.actions;
export default accountSlice.reducer;
