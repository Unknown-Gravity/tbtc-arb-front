import { ethers } from 'ethers';
import { TBTC } from '@keep-network/tbtc-v2.ts';
import { InfoAccount } from '../interfaces/InfoAccount.type';

const initiateSDK = async (data: InfoAccount): Promise<TBTC> => {
	let sdk: TBTC | null = null;

	const ethRPC = process.env.REACT_APP_ETH_RPC;

	if (!ethRPC) {
		throw new Error('Missing environment variables.');
	}

	const ethProvider = new ethers.providers.JsonRpcProvider(ethRPC);

	console.log('Initializing SDK');

	if (data.signer) {
		sdk = await TBTC.initializeSepolia(ethProvider, true);
		await sdk.initializeCrossChain('Arbitrum', data.signer);
	}

	console.log('SDK initialized successfully:', sdk);

	if (!sdk) throw new Error('SDK not initialized yet.');
	return sdk;
};

// initiateSDK().catch(console.error);

export { initiateSDK };
