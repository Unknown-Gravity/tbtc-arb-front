import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthReducer';
import accountReducer from '../reducers/AccountReducer';

/**
 * @name store
 * @description The redux store
 * @version 1.0.0
 */
export const store = configureStore({
	reducer: {
		auth: authReducer,
		account: accountReducer,
	},
});
