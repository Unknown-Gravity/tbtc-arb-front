import { ethers, Transaction } from 'ethers';

export const getTransactionValue = (transaction: Transaction): string => {
	if (!transaction || !transaction.value) {
		return '0'; // En caso de que la transacción no tenga un valor, devolvemos '0'
	}

	// Convertimos el valor de wei a Ether
	const valueInEther = ethers.utils.formatEther(transaction.value);
	return valueInEther;
};
