import {
	Box,
	Flex,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import ConnectButton from '../../../../components/ConnectButton';
import { currencyFormatter } from '../../../../utils/utils';
import BTCtoCurrencyComponent from '../../../../components/BTCtoCurrencycomponent';
import TransactionMinting from './TransactionMinting';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useEffect, useState } from 'react';
import { getTbtcTransactions } from '../../../../services/tbtcServices';
import { fetchTbtcSupply } from '../../../../services/fetchServices';

/**
 * @name MintingProcessComponent
 *
 * @description This component displays the minting process component.
 *
 * @returns {JSX.Element}
 */

const MintingProcessComponent = () => {
	const bgGradient = useColorModeValue(
		'linear-gradient(to top, white, transparent)',
		`linear-gradient(to top, #1D2229, transparent)`,
	);
	const [transactions, setTransactions] = useState<any[]>([]);
	const [supply, setSupply] = useState<number>(0);
	const { isConnected, chainId } = useWeb3ModalAccount();
	const isMainnet =
		isConnected &&
		chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;

	useEffect(() => {
		const getTransactions = async () => {
			const response = await getTbtcTransactions(isMainnet);
			setTransactions(response.slice(0, 3));
		};
		const getTbtcSupply = async () => {
			const response = await fetchTbtcSupply();
			setSupply(response);
		};
		getTbtcSupply();
		getTransactions();
	}, [isMainnet]);
	return (
		<Box w={{ base: 'auto', xl: '470px' }}>
			<Text
				fontSize='24px'
				lineHeight='32px'
				fontWeight={500}
				mt='31.5px'
				textAlign='center'
			>
				Ready to mint tBTC?
			</Text>
			<ConnectButton w='100%' mt='16.5px' />
			<Text mt='24px' fontSize='16px'>
				TOTAL SUPPLY
			</Text>
			<Stack alignItems='center'>
				<Text
					fontSize='60px'
					lineHeight='64px'
					fontWeight={700}
					textAlign='center'
					mt='6px'
				>
					{currencyFormatter(supply, 'USD', 'none')}
					<Text
						as='span'
						fontSize='24px'
						lineHeight='32px'
						fontWeight={500}
					>
						{' '}
						tBTC
					</Text>
				</Text>
				<BTCtoCurrencyComponent btcAmount={supply} currency='USD' />
			</Stack>
			<Box position='relative'>
				<Text mt='32px' fontSize='15px'>
					Protocol History
				</Text>
				<Stack mt='12px'>
					{transactions.map((tx, index) => {
						return (
							<TransactionMinting key={index} transaction={tx} />
						);
					})}
				</Stack>

				<Box
					w='100%'
					h='100%'
					bg={bgGradient}
					position='absolute'
					top='0'
					left='0'
				></Box>
			</Box>
			<Flex w='100%' justifyContent='center' mt='32px'>
				<Link
					variant='purpleDarkGradient'
					href={process.env.REACT_APP_DUNE_URL}
					isExternal
				>
					View on Dune Analytics
				</Link>
			</Flex>
		</Box>
	);
};

export default MintingProcessComponent;
