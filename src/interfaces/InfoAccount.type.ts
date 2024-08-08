import { ethers } from 'ethers';

export type InfoAccount = {
	provider: ethers.providers.Web3Provider | null;
	signer: ethers.Signer | null;
	balance: string;
};
