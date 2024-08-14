import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';
import { initiateSDK } from '../services/intiateSDK';
import { TBTC } from '@keep-network/tbtc-v2.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';

interface SdkContextValue {
	sdk: TBTC | null;
	initializing: boolean;
	error: string | null;
}

const SdkContext = createContext<SdkContextValue | undefined>(undefined);

export const SdkProvider = ({ children }: { children: ReactNode }) => {
	const [sdk, setSdk] = useState<TBTC | null>(null);
	const [initializing, setInitializing] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const accountInfo = useSelector((state: RootState) => state.account);

	useEffect(() => {
		const initializeSdk = async () => {
			try {
				const sdkInstance = await initiateSDK(accountInfo);
				setSdk(sdkInstance);
			} catch (err) {
				setError('Failed to initialize SDK');
				console.error('SDK Initialization Error:', err);
			} finally {
				setInitializing(false);
			}
		};

		initializeSdk();
	}, [accountInfo]);

	return (
		<SdkContext.Provider value={{ sdk, initializing, error }}>
			{children}
		</SdkContext.Provider>
	);
};

export const useSdk = (): SdkContextValue => {
	const context = useContext(SdkContext);
	if (!context) {
		throw new Error('useSdk must be used within a SdkProvider');
	}
	return context;
};
