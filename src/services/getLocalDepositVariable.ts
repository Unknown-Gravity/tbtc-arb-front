export const getLocalDepositVariable = () => {
	const deposit = localStorage.getItem('deposit');
	if (deposit) {
		return JSON.parse(deposit);
	}
};
