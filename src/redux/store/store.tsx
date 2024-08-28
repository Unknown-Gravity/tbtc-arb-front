import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/AuthReducer';
import accountReducer from '../reducers/AccountReducer';
import depositReducer from '../reducers/DepositReducer'; // Importa el reducer de deposit

/**
 * @name store
 * @description The redux store
 * @version 1.0.0
 */
export const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ['auth/addAccount'],
				// Ignore these field paths in all actions
				ignoredActionPaths: [
					'meta.arg',
					'payload.provider',
					'payload.signer',
				],
				// Ignore these paths in the state
				ignoredPaths: ['account.provider', 'account.signer'],
			},
		}),
	reducer: {
		auth: authReducer,
		account: accountReducer,
		deposit: depositReducer, // Añade el deposit reducer aquí
	},
});
