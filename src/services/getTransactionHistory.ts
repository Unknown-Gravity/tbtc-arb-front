import { ethers } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';
import { Network } from '@ethersproject/providers';

export const getTransactionHistory = async (data: InfoAccount) => {
	// const network = await data.provider?.getNetwork();
	const chainId = process.env.REACT_APP_CHAINID;
	if (chainId) {
		const network: Network = {
			name: 'Arbitrum Sepolia',
			chainId: parseInt(chainId),
		};
		console.log('🚀 ~ getTransactionHistory ~ network:', network);
		const address = await data.signer?.getAddress();
		const etherscanProvider = new ethers.providers.EtherscanProvider(
			network,
		);
		if (address) {
			const history = await etherscanProvider.getHistory(address);
			return history;
		}
	}
};
