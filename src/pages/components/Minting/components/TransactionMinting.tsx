import { Box, Flex, Image, Text } from '@chakra-ui/react';
import {
	formatAddress,
	generateIdenticon,
	getDifferenceInMinutes,
} from '../../../../utils/utils';
import { CustomTransaction } from '../../../../interfaces/CustomTransaction.interface';

type Props = {
	transaction: CustomTransaction;
};

/**
 * @name TransactionMinting
 *
 * @description This component displays the transactions for minting.
 *
 * @param {CustomTransaction} transaction The transaction object.
 *
 * @returns {JSX.Element}
 */

const TransactionMinting = ({ transaction }: Props) => {
	return (
		<Box p='14px' border='1px solid #B1BCCC' borderRadius='6px'>
			<Flex justifyContent='space-between'>
				<Text variant='gray' fontSize='14px'>
					{transaction.value}
				</Text>
				<Flex align='center' gap='3px'>
					<Image
						src={generateIdenticon(transaction.address)}
						w='16px'
						h='16px'
					/>
					<Text fontFamily={'IBM Plex Mono'}>
						{formatAddress(transaction.hash)}
					</Text>
				</Flex>
				{transaction.date && (
					<Text size='14px'>
						{getDifferenceInMinutes(transaction.date, new Date())}
					</Text>
				)}
			</Flex>
		</Box>
	);
};

export default TransactionMinting;
