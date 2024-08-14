import { CustomBox } from '../../../components/CustomBox';
import { Flex, Grid, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import TransactionComponent from './components/TransactionComponent';
import {
	DarkMintingActivity,
	LightMintingActivity,
} from '../../../assets/images';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { useEffect, useState, useMemo } from 'react';
import { getTransactionHistory } from '../../../services/getTransactionHistory';
import { Transaction } from '@ethersproject/transactions';
import { useSdk } from '../../../context/SDKProvider';

const MyActivityComponent = (props: BasicComponentProps) => {
	const { colorMode } = useColorMode();
	const accountInfo = useSelector((state: RootState) => state.account);
	const [transactions, setTransactions] = useState<Array<Transaction>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { sdk } = useSdk();

	useEffect(() => {
		const getTransactions = async () => {
			const history = await getTransactionHistory(accountInfo);
			if (history && history.length > 0) {
				setTransactions(history);
				setLoading(false);
			}
		};
		getTransactions();
	}, [accountInfo]);

	const renderedTransactions = useMemo(() => {
		return transactions
			.slice(0, 7)
			.map((tx, index) => (
				<TransactionComponent
					key={index}
					transaction={tx}
					provider={accountInfo.provider}
				/>
			));
	}, [transactions, accountInfo.provider]);

	return (
		<CustomBox h='100%' p='25px 15px'>
			<Text fontSize='16px' lineHeight='16px' fontWeight='600'>
				MY ACTIVITY
			</Text>
			{loading ? (
				<Text>Loading...</Text>
			) : !props.isConnected || transactions.length === 0 ? (
				<Stack mt='40px'>
					<Flex
						justifyContent='space-between'
						w={{ base: '95%', xl: '230px' }}
						mx={'auto'}
					>
						<Text
							variant='gray'
							fontSize='14px'
							lineHeight='16px'
							fontWeight={600}
						>
							TBTC
						</Text>
						<Text
							variant='gray'
							fontSize='14px'
							lineHeight='16px'
							fontWeight={600}
						>
							STATE
						</Text>
					</Flex>
					<TransactionComponent />
					<TransactionComponent />
					<Image
						src={
							colorMode === 'light'
								? LightMintingActivity
								: DarkMintingActivity
						}
						mt='55px'
						mx='auto'
					/>
					<Text variant='gray' fontSize='16px' textAlign='center'>
						You have no history yet
					</Text>
				</Stack>
			) : (
				<Stack mt='40px' maxH='520px'>
					<Grid
						w={{ base: '95%', xl: '220px' }}
						mx={'auto'}
						templateColumns='repeat(3, minmax(0, 1fr))'
						placeItems='center'
					>
						<Text
							variant='gray'
							fontSize='14px'
							lineHeight='16px'
							fontWeight={600}
							placeSelf='start'
						>
							TBTC
						</Text>
						<Text
							variant='gray'
							fontSize='14px'
							lineHeight='16px'
							fontWeight={600}
							transform='translateX(-10px)'
						>
							TX
						</Text>
						<Text
							variant='gray'
							fontSize='14px'
							lineHeight='16px'
							fontWeight={600}
							transform='translateX(5px)'
						>
							STATE
						</Text>
					</Grid>
					<Stack>{renderedTransactions}</Stack>
				</Stack>
			)}
		</CustomBox>
	);
};

export default MyActivityComponent;
