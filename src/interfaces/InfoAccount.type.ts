import { ethers } from 'ethers';

export type InfoAccount = {
	provider: ethers.BrowserProvider | null;
	signer: ethers.Signer | null;
	balance: string;
};
