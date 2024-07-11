import { User } from "./User.type";

export type AuthState = {
	user: User | null;
	isError: boolean;
	isLoading: boolean;
	isSuccess: boolean;
	message: string;
};
