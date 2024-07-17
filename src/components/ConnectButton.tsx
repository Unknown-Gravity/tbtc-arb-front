import React, { useEffect, useState } from 'react';
import { Button, Box, Text, Flex } from '@chakra-ui/react';
import {
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from '@web3modal/ethers/react';
import { ethers } from 'ethers';
import { InfoAccount } from '../interfaces/InfoAccount.type';
import { useDispatch } from 'react-redux';
import { addAccount } from '../redux/reducers/AccountReducer';

type Props = {};

const ConnectButton = (props: Props) => {
	const { address, chainId, isConnected } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const [needRefresh, setNeedRefresh] = useState(true);
	const [infoAccount, setInfoAccount] = useState<InfoAccount>({
		provider: null,
		signer: null,
		balance: '0',
	});
	const dispatch = useDispatch();

	useEffect(() => {
		const getBalance = async () => {
			if (walletProvider && address) {
				const provider = new ethers.BrowserProvider(walletProvider);
				const signer = await provider.getSigner();
				const balanceBigInt = await provider.getBalance(address);
				const ethBalance = ethers.formatEther(balanceBigInt);
				const newInfoAccount = {
					provider,
					signer,
					balance: ethBalance,
				};
				setInfoAccount(newInfoAccount);
				dispatch(addAccount(newInfoAccount));
				setNeedRefresh(false);
			}
		};
		getBalance();
	}, [address, walletProvider, needRefresh]);

	const handleConnect = () => {
		setNeedRefresh(true);
	};

	return (
		<Box textAlign='center'>
			{isConnected ? <w3m-account-button /> : <w3m-connect-button />}
		</Box>
	);
};

export default ConnectButton;
