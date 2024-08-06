import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Transaction } from '../../../../interfaces/Transaction.interface';
import { AccountImageExample } from '../../../../assets/images';
import { getDifferenceInMinutes } from '../../../../utils/utils';

type Props = {
	transaction: Transaction;
};

const TransactionMinting = (props: Props) => {
	return (
		<Box p='14px' border='1px solid #B1BCCC' borderRadius='6px'>
			<Flex justifyContent='space-between'>
				<Text variant='gray' fontSize='14px'>
					{props.transaction.tbtc}
				</Text>
				<Flex align='center' gap='3px'>
					<Image src={AccountImageExample} w='16px' h='16px' />
					<Text fontFamily={'IBM Plex Mono'}>
						{props.transaction.address?.slice(0, 5)}
						...
						{props.transaction.address?.slice(-4)}
					</Text>
				</Flex>
				{props.transaction.date && (
					<Text size='14px'>
						{getDifferenceInMinutes(
							props.transaction.date,
							new Date(),
						)}{' '}
						mins ago
					</Text>
				)}
			</Flex>
		</Box>
	);
};

export default TransactionMinting;
