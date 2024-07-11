import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	email: "",
	user: "",
	isSuccess: false,
};

/**
 *
 * @name authSlice
 * @description The auth slice
 * @version 1.0.0
 *
 */
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: () => initialState,
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
