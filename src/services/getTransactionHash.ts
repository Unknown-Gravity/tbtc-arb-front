import { Transaction } from 'ethers';

export const getTransactionHash = (
	transaction: Transaction,
): string | undefined => {
	return transaction?.hash;
};
