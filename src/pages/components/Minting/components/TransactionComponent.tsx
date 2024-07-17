import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Transaction } from '../../../../interfaces/Transaction.interface';

type Props = {
	transaction?: Transaction;
};

const stateColor = {
	bg: '',
	color: '',
};

const TransactionComponent = (props: Props) => {
	return (
		<Box
			p='17px 10px 17px 25px'
			border='1px solid #B1BCCC'
			borderRadius='6px'
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
						{props.transaction?.tx.slice(0, 5)}...
					</Text>
					<Text
						fontSize='10px'
						lineHeight='24px'
						fontWeight={400}
						variant='gray'
						placeSelf='end'
						textAlign='center'
						w='100%'
						bg={
							props.transaction.state === 'minted'
								? '#153A27'
								: props.transaction.state === 'pending'
								? '#393A15'
								: '#3A1515'
						}
						color={
							props.transaction.state === 'minted'
								? '#8DFEAB'
								: props.transaction.state === 'pending'
								? '#FAAD14'
								: '#E53939'
						}
						borderRadius='50px'
					>
						{props.transaction?.state.toUpperCase()}
					</Text>
				</Grid>
			)}
		</Box>
	);
};

export default TransactionComponent;
