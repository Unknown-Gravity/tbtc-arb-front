import { CustomBox } from '../../../components/CustomBox';
import { Flex, Grid, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import TransactionComponent from './components/TransactionComponent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { useState, useMemo } from 'react';
import { Transaction } from '@ethersproject/transactions';
import RenderedTransactionsComponent from './components/MyActivityComponent/RenderedTransactionsComponent';
import NotRenderedTransactionsComponent from './components/MyActivityComponent/NotRenderedTransactionsComponent';

const MyActivityComponent = (props: BasicComponentProps) => {
	const { colorMode } = useColorMode();
	const accountInfo = useSelector((state: RootState) => state.account);
	const [transactions, setTransactions] = useState<Array<Transaction>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	/* useEffect(() => {
		const getTransactions = async () => {
			const history = await getTransactionHistory(accountInfo);
			if (history && history.length > 0) {
				setTransactions(history);
				setLoading(false);
			}
		};
		getTransactions();
	}, [accountInfo]); */

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
				<NotRenderedTransactionsComponent />
			) : (
				<RenderedTransactionsComponent data={renderedTransactions} />
			)}
		</CustomBox>
	);
};

export default MyActivityComponent;
