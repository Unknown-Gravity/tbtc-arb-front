import { Box, Flex, Grid, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTransactionInfo } from '../../../../services/getTransactionInfo';
import { Web3Provider } from '@ethersproject/providers';
import { Transaction } from 'ethers';
import { TxInfo } from '../../../../interfaces/TxInfo.interface';

type Props = {
	transaction?: Transaction;
	provider?: Web3Provider | null;
};

const TransactionComponent = ({ transaction, provider }: Props) => {
	const { colorMode } = useColorMode();
	const [txInfo, setTxInfo] = useState<TxInfo>();
	useEffect(() => {
		const getTxInfo = async () => {
			if (transaction && provider) {
				const transactionInfo = await getTransactionInfo(
					transaction,
					provider,
				);
				setTxInfo(transactionInfo);
			}
		};
		getTxInfo();
	}, [provider, transaction]);
	return (
		<Box
			p='12px 10px 12px 25px'
			maxH='50px'
			border='1px solid #B1BCCC'
			borderRadius='10px'
		>
			{!txInfo?.hash ? (
				<Flex justifyContent='space-between'>
					<Text
						fontSize='16px'
						lineHeight='24px'
						fontWeight={400}
						variant='gray'
					>
						-.--
					</Text>
					<Text
						fontSize='16px'
						lineHeight='24px'
						fontWeight={400}
						variant='gray'
					>
						-.--
					</Text>
				</Flex>
			) : (
				<Grid
					templateColumns='repeat(3, minmax(0, 1fr))'
					justifyContent='space-between'
				>
					<Text
						fontSize='14px'
						lineHeight='24px'
						fontWeight={400}
						variant='gray'
					>
						{txInfo?.value}
					</Text>
					<Text
						fontSize='14px'
						lineHeight='24px'
						fontWeight={400}
						variant='grayPurpleGradient'
					>
						{txInfo?.hash.slice(0, 5)}...
					</Text>
					<Text
						fontSize='10px'
						lineHeight='24px'
						fontWeight={500}
						variant='gray'
						placeSelf='end'
						textAlign='center'
						w='100%'
						bg={
							colorMode === 'dark'
								? txInfo?.status === 'MINTED'
									? '#153A27'
									: txInfo?.status === 'PENDING'
									? '#393A15'
									: '#3A1515'
								: txInfo?.status === 'MINTED'
								? '#F0FFF4'
								: txInfo?.status === 'PENDING'
								? '#FFFBE6'
								: '#FFF5F5'
						}
						color={
							colorMode === 'dark'
								? txInfo?.status === 'MINTED'
									? '#8DFEAB'
									: txInfo?.status === 'PENDING'
									? '#FAAD14'
									: '#E53939'
								: txInfo?.status === 'MINTED'
								? '#38A169'
								: txInfo?.status === 'PENDING'
								? '#FAAD14'
								: '#E53939'
						}
						borderRadius='50px'
					>
						{txInfo?.status}
					</Text>
				</Grid>
			)}
		</Box>
	);
};

export default TransactionComponent;
