import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

import TransactionRow from './TransactionRow';
import { CustomTransaction } from '../../../../interfaces/CustomTransaction.interface';

type Props = { transactions: CustomTransaction[] };

const TransactionTable = ({ transactions }: Props) => (
	<Table mt='24.5px' fontSize='12px'>
		<Thead>
			<Tr>
				<TableHeaderCell>tBTC AMOUNT</TableHeaderCell>
				<TableHeaderCell>WALLET ADDRESS</TableHeaderCell>
				<TableHeaderCell>TX HASH</TableHeaderCell>
				<TableHeaderCell>TIMESTAMP</TableHeaderCell>
			</Tr>
		</Thead>
		<Tbody>
			{transactions.map((transaction, index) => (
				<TransactionRow key={index} transaction={transaction} />
			))}
		</Tbody>
	</Table>
);

const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
	<Th px={{ base: '10px', xl: '24px' }}>{children}</Th>
);

export default TransactionTable;
