import { ethers } from 'ethers';
import { TBTC } from '@keep-network/tbtc-v2.ts';

let sdk: TBTC;

const initiateSDK = async (): Promise<TBTC> => {
	const arbitrumRPC: string | undefined = process.env.REACT_APP_ARB_RPC;
	const privateKey: string | undefined = process.env.REACT_APP_PRIVATE_KEY;

	if (!arbitrumRPC) {
		throw new Error('Arbitrum RPC URL is not defined');
	}

	if (!privateKey) {
		throw new Error('Private key is not defined');
	}

	const provider: ethers.providers.JsonRpcProvider =
		new ethers.providers.JsonRpcProvider(arbitrumRPC);
	const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);
	const sdkInstance: TBTC = await TBTC.initializeSepolia(signer);

	return sdkInstance;
};

// Initialize the SDK immediately upon module load
const initializeSDK = async () => {
	try {
		sdk = await initiateSDK();
		console.log('SDK initialized successfully');
	} catch (error) {
		console.error('Error initializing SDK', error);
	}
};

// Immediately invoke the initialization
initializeSDK();

export { sdk, initiateSDK };
