import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import { TbClockHour3Filled } from 'react-icons/tb';

import { useEffect, useState } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

import TransactionsInfoTransactionHistoryComponent from './TransactionHistory/TransactionsInfoTransactionHistoryComponent';
import TransactionInProgressComponent from './TransactionHistory/TransactionInProgressComponent';
import TransactionInProgressInfoComponent from './TransactionHistory/TransactionInProgressInfoComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';

const TransactionHistory = () => {
	const gradientColor = 'linear(to-r, #B62CFF,#7D00FF )';
	const { utxo, arbTxHash, initializedEthTxHash, finalizedEthTxHash } =
		useSelector((state: RootState) => state.deposit);
	const [activeIndex, setActiveIndex] = useState(0);
	const { chainId, isConnected } = useWeb3ModalAccount();
	const isMainnet =
		isConnected &&
		chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % 20);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Stack spacing={0} w={'100%'}>
			<Stack gap='20px' w='100%'>
				<Text
					fontSize='14px'
					fontWeight={600}
					lineHeight='16px'
					letterSpacing='7.5%'
				>
					TRANSACTION HISTORY
				</Text>
				<Flex
					gap='4px'
					padding='4px 8px 4px 8px'
					borderRadius='100px'
					bgGradient={gradientColor}
					alignItems='center'
					w='fit-content'
				>
					<TbClockHour3Filled color='white' size='9.75px' />
					<Text
						color='white'
						fontSize='10px'
						fontWeight={500}
						lineHeight='12px'
					>
						~3 HOURS MINTING TIME
					</Text>
				</Flex>
			</Stack>
			<Stack mt='10px'>
				{utxo && (
					<TransactionsInfoTransactionHistoryComponent
						isMainnet={isMainnet}
						txHash={utxo.transactionHash.toString()}
						blockExplorer='BITCOIN'
					/>
				)}
				{arbTxHash && (
					<TransactionsInfoTransactionHistoryComponent
						isMainnet={isMainnet}
						txHash={arbTxHash}
						blockExplorer='ARBISCAN'
					/>
				)}
				{initializedEthTxHash && (
					<TransactionsInfoTransactionHistoryComponent
						isMainnet={isMainnet}
						txHash={initializedEthTxHash}
						blockExplorer='ETHERSCAN'
					/>
				)}
				{finalizedEthTxHash && (
					<Text
						variant='gray'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						Minting finalized{' '}
						<Link
							variant='purpleDarkGradient'
							href={finalizedEthTxHash}
						>
							{' '}
							transactions
						</Link>
					</Text>
				)}
				<TransactionInProgressComponent activeIndex={activeIndex} />
				<TransactionInProgressInfoComponent />
			</Stack>
		</Stack>
	);
};

export default TransactionHistory;
