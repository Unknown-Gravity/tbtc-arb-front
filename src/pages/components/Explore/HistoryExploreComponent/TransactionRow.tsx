import { Flex, Image, Link, Td, Tooltip, Tr } from '@chakra-ui/react';
import { CustomTransaction } from '../../../../interfaces/CustomTransaction.interface';
import {
	formatAddress,
	generateIdenticon,
	getDifferenceInMinutes,
} from '../../../../utils/utils';

type Props = { transaction: CustomTransaction };

const TransactionRow = ({ transaction }: Props) => (
	<Tr>
		<Td px={{ base: '10px', xl: '24px' }}>{transaction?.value}</Td>
		<Td px={{ base: '10px', xl: '24px' }}>
			<Flex gap='8px'>
				<Image
					src={generateIdenticon(transaction.address)}
					w='16px'
					h='16px'
				/>
				<Tooltip label={transaction.address}>
					{formatAddress(transaction.address)}
				</Tooltip>
			</Flex>
		</Td>
		<Td px={{ base: '10px', xl: '24px' }}>
			<Tooltip label={transaction.hash}>
				<Link href={transaction.link} isExternal>
					{formatAddress(transaction.hash)}
				</Link>
			</Tooltip>
		</Td>
		<Td px={{ base: '10px', xl: '24px' }}>
			{transaction.date &&
				getDifferenceInMinutes(transaction.date, new Date())}
		</Td>
	</Tr>
);

export default TransactionRow;
