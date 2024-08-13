import { EthereumSigner } from '@keep-network/tbtc-v2.ts';
import { ethers } from 'ethers';

export type InfoAccount = {
	provider: ethers.providers.Web3Provider | null;
	signer: EthereumSigner | any | null;
	balance: string;
};
