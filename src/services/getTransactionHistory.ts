import { ethers, Transaction } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';

export const getTransactionHistory = async (
	data: InfoAccount,
): Promise<Array<Transaction>> => {
	try {
		const address = await data.signer.getAddress();

		const network = await data.provider?.getNetwork();
		console.log('🚀 ~ network:', network?.chainId);
		const etherscanProvider = new ethers.providers.EtherscanProvider(
			network,
		);

		const history = await etherscanProvider.getHistory(address);

		console.log('Transaction history:', history);
		return history;
	} catch (error) {
		console.error('Error fetching transactions:', error);
		return [];
	}
};
