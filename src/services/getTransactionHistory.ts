import { ethers } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';

export const getTransactionHistory = async (data: InfoAccount) => {
	const provider = data.provider;

	if (provider && data.signer) {
		const address = await data.signer.getAddress();

		// Obtener todos los logs relacionados con la dirección
		const logs = await provider.getLogs({
			fromBlock: 0, // Puedes ajustar el bloque de inicio según tus necesidades
			toBlock: 'latest',
			address: address,
		});

		const transactions = logs.map(log => ({
			transactionHash: log.transactionHash,
			blockNumber: log.blockNumber,
			data: log.data,
			topics: log.topics,
		}));

		console.log('🚀 ~ getTransactionHistory ~ transactions:', transactions);

		return transactions;
	} else {
		console.error('Provider or signer not initialized.');
		return [];
	}
};
