import { useEffect, useState } from 'react';
import { Button, Box, Flex, ButtonProps, Image } from '@chakra-ui/react';
import {
	useWeb3Modal,
	useWeb3ModalAccount,
	useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { addAccount } from '../redux/reducers/AccountReducer';
import { generateIdenticon, normalizeNetWorkNames } from '../utils/utils';
import { ArbitrumIcon } from '../assets/icons/ArbitrumIcon';
import { getTbtcBalance } from '../services/tbtcServices';

const ConnectButton = (props: ButtonProps) => {
	const { address, isConnected, chainId } = useWeb3ModalAccount();
	const { walletProvider } = useWeb3ModalProvider();
	const [networkName, setNetWorkName] = useState('');
	const [needRefresh, setNeedRefresh] = useState(true);
	const { open } = useWeb3Modal();
	const dispatch = useDispatch();
	const isMainnet =
		chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;

	const getNetworkName = (isMainnet: boolean): string => {
		return isMainnet ? 'Arbitrum One' : 'Arbitrum Sepolia';
	};

	useEffect(() => {
		const getBalance = async () => {
			setNeedRefresh(false);

			if (walletProvider && address) {
				const provider = new ethers.providers.Web3Provider(
					walletProvider,
				);

				const [signer, balanceBigInt, tbtcBalance] = await Promise.all([
					provider.getSigner(),
					provider.getBalance(address),
					getTbtcBalance(isMainnet, provider, address),
				]);

				setNetWorkName(getNetworkName(isMainnet));

				const ethBalance = ethers.utils.formatEther(balanceBigInt);

				dispatch(addAccount(provider, signer, ethBalance, tbtcBalance));
			}
		};

		getBalance();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, walletProvider, needRefresh]);

	useEffect(() => {
		setNetWorkName(getNetworkName(isMainnet));
	}, [isMainnet]);

	const handleConnectWallet = async () => {
		if (!isConnected) {
			await open({ view: 'Connect' });
		} else {
			open({ view: 'Account' });
		}
	};

	return (
		<Box>
			{!isConnected ? (
				<Button
					{...props}
					variant='purple'
					onClick={handleConnectWallet}
				>
					Connect Wallet
				</Button>
			) : (
				<Flex gap='10px'>
					<Button
						bg='none'
						fontSize={{ base: '12px', md: '16px' }}
						variant='grayOutlined'
						leftIcon={<ArbitrumIcon boxSize='17px' />}
					>
						{normalizeNetWorkNames(networkName)}
					</Button>
					<Button
						variant='purple'
						onClick={handleConnectWallet}
						fontSize={{ base: '12px', md: '16px' }}
						leftIcon={
							<Image
								w={{ base: '14px', xl: '18px' }}
								src={generateIdenticon(address)}
							/>
						}
					>
						{address?.slice(0, 5)}...{address?.slice(-4)}
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default ConnectButton;
