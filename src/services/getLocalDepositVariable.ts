import { DepositState } from '../interfaces/DepositState.interface';

export const getLocalDepositVariable = (): DepositState | null => {
	const deposit = localStorage.getItem('deposit');
	if (deposit) {
		return JSON.parse(deposit);
	} else {
		return null;
	}
};
