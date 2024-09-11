import { ethers, Transaction } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';
import { Web3Provider } from '@ethersproject/providers';
import { TxInfo } from '../interfaces/TxInfo.interface';

const getTransactionHash = (transaction: Transaction): string | undefined => {
	return transaction?.hash;
};

const getTransactionHistory = async (
	data: InfoAccount,
): Promise<Array<Transaction>> => {
	try {
		const address = await data.signer.getAddress();

		const network = await data.provider?.getNetwork();
		const etherscanProvider = new ethers.providers.EtherscanProvider(
			network,
		);

		const history = await etherscanProvider.getHistory(address);
		return history;
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return [];
	}
};

const getTransactionInfo = async (
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

const getTransactionStatus = async (
	provider: Web3Provider | null,
	transactionHash: string,
): Promise<string> => {
	try {
		const receipt = await provider?.getTransactionReceipt(transactionHash);

		if (!receipt) {
			return 'PENDING'; // If the receipt does not exist, the transaction is pending
		}

		if (receipt.status === 1) {
			return 'MINTED'; // Successful transaction
		} else if (receipt.status === 0) {
			return 'ERROR'; // Failed transaction
		} else {
			return 'unknown'; // Unknown status (this should not happen under normal conditions)
		}
	} catch (error) {
		console.error('Error fetching transaction status:', error);
		return 'error'; // In case of error while fetching the receipt
	}
};

export const getTransactionValue = (transaction: Transaction): string => {
	if (!transaction || !transaction.value) {
		return '0'; // If the transaction does not have a value, return '0'
	}

	// Convert the value from wei to Ether
	const valueInEther = ethers.utils.formatEther(transaction.value);
	return valueInEther;
};

export { getTransactionHash, getTransactionHistory, getTransactionInfo };
