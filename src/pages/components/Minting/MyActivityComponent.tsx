import { CustomBox } from '../../../components/CustomBox';
import { Flex, Grid, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import TransactionComponent from './components/TransactionComponent';
import {
	DarkMintingActivity,
	LightMintingActivity,
} from '../../../assets/images';
import { transactions2 } from '../../../data/mockData';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { useEffect, useState } from 'react';
import { getTransactionHistory } from '../../../services/getTransactionHistory';
import { TransactionResponse } from '@ethersproject/providers';

const MyActivityComponent = (props: BasicComponentProps) => {
	const { colorMode } = useColorMode();
	const accountInfo = useSelector((state: RootState) => state.account);
	const [transactions, setTransactions] =
		useState<Array<TransactionResponse>>();

	useEffect(() => {
		const getTransactions = async () => {
			try {
				const history = await getTransactionHistory(accountInfo);
				console.log('🚀 ~ getTransactions ~ history:', history);
				setTransactions(history);
			} catch (error) {
				console.log(error);
			}
		};
		getTransactions();
	}, []);

	return (
		<CustomBox h='100%' p=' 25px 15px'>
			<Text fontSize='16px' lineHeight='16px' fontWeight='600'>
				MY ACTIVITY
			</Text>
			{!props.isConnected ? (
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
					<Stack>
						{transactions2.slice(0, 7).map((tx, index) => {
							return (
								<TransactionComponent
									key={index}
									transaction={tx}
								/>
							);
						})}
					</Stack>
				</Stack>
			)}
		</CustomBox>
	);
};

export default MyActivityComponent;
