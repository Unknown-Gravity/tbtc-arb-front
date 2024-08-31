export const getBtcTransactionUrl = (isMainnet: boolean, txHash: string) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_BTC_EXPLORER_MAINNET
		: process.env.REACT_APP_BTC_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};

export const getEthTransactionUrl = (isMainnet: boolean, txHash: string) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_ETH_EXPLORER_MAINNET
		: process.env.REACT_APP_ETH_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};

export const getArbitrumTransactionUrl = (
	isMainnet: boolean,
	txHash: string,
) => {
	const explorerUrl = isMainnet
		? process.env.REACT_APP_ARBITRUM_EXPLORER_MAINNET
		: process.env.REACT_APP_ARBITRUM_EXPLORER_TESTNET;
	return `${explorerUrl}/tx/${txHash}`;
};
