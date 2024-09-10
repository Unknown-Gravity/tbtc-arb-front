import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

// Define the initial state type
interface AccountState {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.Signer | null;
	ethBalance: string;
	tbtcBalance: string;
}

// Define the initial state
const initialState: AccountState = {
	provider: null,
	signer: null,
	ethBalance: '0',
	tbtcBalance: '0',
};

/**
 *
 * @name accountSlice
 * @description The auth slice of the Redux store.
 *
 */
export const accountSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
		addAccount: {
			reducer: (state, action: PayloadAction<AccountState>) => {
				const { provider, signer, ethBalance, tbtcBalance } =
					action.payload;
				state.provider = provider;
				state.signer = signer;
				state.ethBalance = ethBalance;
				state.tbtcBalance = tbtcBalance;
			},
			prepare: (
				provider: ethers.providers.Web3Provider,
				signer: ethers.Signer,
				ethBalance: string,
				tbtcBalance: string,
			) => {
				return {
					payload: {
						provider,
						signer,
						ethBalance,
						tbtcBalance,
					},
				};
			},
		},
	},
});

export const { reset, addAccount } = accountSlice.actions;
export default accountSlice.reducer;
