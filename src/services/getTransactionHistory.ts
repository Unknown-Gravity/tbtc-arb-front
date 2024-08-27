import { ethers, Transaction } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';

export const getTransactionHistory = async (
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
