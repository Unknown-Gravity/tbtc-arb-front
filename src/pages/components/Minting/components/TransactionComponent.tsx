import { Box, Flex, Grid, Text, useColorMode } from '@chakra-ui/react';
import { Transaction } from '../../../../interfaces/Transaction.interface';

type Props = {
	transaction?: Transaction;
};

const TransactionComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Box
			p='12px 10px 12px 25px'
			maxH='50px'
			border='1px solid #B1BCCC'
			borderRadius='10px'
		>
			{!props.transaction ? (
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
						{props.transaction?.tbtc}
					</Text>
					<Text
						fontSize='14px'
						lineHeight='24px'
						fontWeight={400}
						variant='grayPurpleGradient'
					>
						{props.transaction?.tx?.slice(0, 5)}...
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
								? props.transaction.state === 'minted'
									? '#153A27'
									: props.transaction.state === 'pending'
									? '#393A15'
									: '#3A1515'
								: props.transaction.state === 'minted'
								? '#F0FFF4'
								: props.transaction.state === 'pending'
								? '#FFFBE6'
								: '#FFF5F5'
						}
						color={
							colorMode === 'dark'
								? props.transaction.state === 'minted'
									? '#8DFEAB'
									: props.transaction.state === 'pending'
									? '#FAAD14'
									: '#E53939'
								: props.transaction.state === 'minted'
								? '#38A169'
								: props.transaction.state === 'pending'
								? '#FAAD14'
								: '#E53939'
						}
						borderRadius='50px'
					>
						{props.transaction?.state?.toUpperCase()}
					</Text>
				</Grid>
			)}
		</Box>
	);
};

export default TransactionComponent;
