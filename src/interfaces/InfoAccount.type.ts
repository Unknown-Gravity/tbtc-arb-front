import { EthereumSigner } from '@keep-network/tbtc-v2.ts';
import { ethers } from 'ethers';

/**
 * @name InfoAccount
 *
 * @description This interface contains the properties for the InfoAccount object.
 */

export type InfoAccount = {
	provider: ethers.providers.Web3Provider | null;
	signer: EthereumSigner | any | null;
	ethBalance: string;
	tbtcBalance: string;
};
