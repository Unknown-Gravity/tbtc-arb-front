import { Web3Provider } from '@ethersproject/providers';
import { Transaction } from 'ethers';
import { getTransactionHash } from './getTransactionHash';
import { getTransactionValue } from './getTransactionValue';
import { getTransactionStatus } from './getTransactionStatus';
import { TxInfo } from '../interfaces/TxInfo.interface';

export const getTransactionInfo = async (
	transaction: Transaction,
	provider: Web3Provider | null,
): Promise<TxInfo> => {
	const hash = getTransactionHash(transaction);
	const value = getTransactionValue(transaction);

	let status = 'unknown';
	if (hash) {
		status = await getTransactionStatus(provider, hash);
	}

	return {
		value,
		hash,
		status,
	};
};
