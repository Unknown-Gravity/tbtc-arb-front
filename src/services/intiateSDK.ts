import { ethers } from 'ethers';
import { TBTC } from '@keep-network/tbtc-v2.ts';

let sdk: TBTC | null = null;

const initiateSDK = async (): Promise<void> => {
	const ethRPC = process.env.REACT_APP_ETH_RPC;
	const arbitrumRPC = process.env.REACT_APP_ARB_RPC;
	const privateKey = process.env.REACT_APP_PRIVATE_KEY;

	if (!ethRPC || !arbitrumRPC || !privateKey) {
		throw new Error('Missing environment variables.');
	}

	const ethSigner = new ethers.Wallet(
		privateKey,
		new ethers.providers.JsonRpcProvider(ethRPC),
	);
	const arbSigner = new ethers.Wallet(
		privateKey,
		new ethers.providers.JsonRpcProvider(arbitrumRPC),
	);

	sdk = await TBTC.initializeSepolia(ethSigner, true);
	await sdk.initializeCrossChain('Arbitrum', arbSigner);

	console.log('SDK initialized successfully:', sdk);
};

const getSDK = (): TBTC => {
	if (!sdk) throw new Error('SDK not initialized yet.');
	return sdk;
};

initiateSDK().catch(console.error);

export { getSDK };
