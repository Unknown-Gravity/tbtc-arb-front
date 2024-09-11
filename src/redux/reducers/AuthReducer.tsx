import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	email: '',
	user: '',
	isSuccess: false,
};

/**
 *
 * @name authSlice
 * @description The auth slice of the Redux store.
 *
 */
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
