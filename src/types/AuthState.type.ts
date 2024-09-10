import { User } from './User.type';

/**
 * @name AuthState
 * @description The state of the authentication.
 * @property {User | null} user - The user.
 * @property {boolean} isError - The error state.
 * @property {boolean} isLoading - The loading state.
 * @property {boolean} isSuccess - The success state.
 * @property {string} message - The message.
 */

export type AuthState = {
	user: User | null;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	message: string;
};
