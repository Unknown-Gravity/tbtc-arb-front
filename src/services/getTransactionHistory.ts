import { ethers, Transaction } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';

export const getTransactionHistory = async (
	data: InfoAccount,
): Promise<Array<Transaction>> => {
	try {
		const address = await data.signer.getAddress();

		console.log(`Address: ${address}`);

		// Obtén el historial de transacciones (esto es un ejemplo simplificado)
		const network = await data.provider?.getNetwork();
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
