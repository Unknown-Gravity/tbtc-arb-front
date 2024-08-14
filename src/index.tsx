import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/theme';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { SdkProvider } from './context/SDKProvider';

// 1. Get projectId
const projectId =
	process.env.REACT_APP_WEB3MODAL_PROJECTID ||
	'dfd7f123447ea173608e4dc22191511f';

// 2. Set chains

const sepolia = {
	chainId: 421614,
	name: 'Arbitrum Sepolia',
	currency: 'ETH',
	explorerUrl: 'https://sepolia.etherscan.io/',
	rpcUrl: 'https://go.getblock.io/c37b6ab2f1f542fa8cfb88cf03d797c8',
};

const sepolia2 = {
	chainId: 11155111,
	name: 'Sepolia',
	currency: 'ETH',
	explorerUrl: 'https://sepolia.etherscan.io/',
	rpcUrl: 'https://ethereum-sepolia.rpc.subquery.network/public',
};

// 3. Create a metadata object
const metadata = {
	name: 'My Website',
	description: 'My Website description',
	url: 'https://mywebsite.com', // origin must match your domain & subdomain
	icons: ['https://avatars.mywebsite.com/'],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
	/*Required*/
	metadata,

	/*Optional*/
	enableEIP6963: true, // true by default
	enableInjected: true, // true by default
	enableCoinbase: true, // true by default
	rpcUrl: '...', // used for the Coinbase SDK
	defaultChainId: 11155111, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
	ethersConfig,
	chains: [sepolia, sepolia2],
	projectId,
	enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<SdkProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SdkProvider>
		</ChakraProvider>
	</Provider>,
);
