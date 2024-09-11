import { Box, Flex, Grid, Link, Text, useColorMode } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { CustomTransaction } from '../../../../interfaces/CustomTransaction.interface';

type Props = {
	transaction?: CustomTransaction;
	provider?: Web3Provider | null;
};

/**
 * @name TransactionComponent
 *
 * @description This component displays the transactions for My Activity section.
 *
 * @param {CustomTransaction} transaction The transaction object.
 * @param {Web3Provider | null} provider The provider object.
 *
 * @returns
 */

const TransactionComponent = ({ transaction }: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Box
			p='12px 10px 12px 25px'
			maxH='50px'
			border='1px solid #B1BCCC'
			borderRadius='10px'
		>
			{!transaction?.hash ? (
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
						{transaction.value !== null
							? transaction?.value.toString()
							: '-.--'}
					</Text>
					<Link
						fontSize='14px'
						lineHeight='24px'
						fontWeight={400}
						variant='purpleDarkGradient'
						isExternal
						href={transaction.link}
					>
						{transaction?.hash.slice(0, 5)}...
					</Link>
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
								? transaction?.status === 'MINTED'
									? '#153A27'
									: transaction?.status === 'PENDING'
									? '#393A15'
									: '#3A1515'
								: transaction?.status === 'MINTED'
								? '#F0FFF4'
								: transaction?.status === 'PENDING'
								? '#FFFBE6'
								: '#FFF5F5'
						}
						color={
							colorMode === 'dark'
								? transaction?.status === 'MINTED'
									? '#8DFEAB'
									: transaction?.status === 'PENDING'
									? '#FAAD14'
									: '#E53939'
								: transaction?.status === 'MINTED'
								? '#38A169'
								: transaction?.status === 'PENDING'
								? '#FAAD14'
								: '#E53939'
						}
						borderRadius='50px'
					>
						{transaction?.status}
					</Text>
				</Grid>
			)}
		</Box>
	);
};

export default TransactionComponent;
