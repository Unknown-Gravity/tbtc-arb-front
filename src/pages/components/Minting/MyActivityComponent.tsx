import { CustomBox } from '../../../components/CustomBox';
import { Text } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import TransactionComponent from './components/TransactionComponent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { useState, useMemo, useEffect } from 'react';
import RenderedTransactionsComponent from './components/MyActivityComponent/RenderedTransactionsComponent';
import NotRenderedTransactionsComponent from './components/MyActivityComponent/NotRenderedTransactionsComponent';
import {
	getEtherScanTransactions,
	getTbtcTransactions,
} from '../../../services/tbtcServices';
import { CustomTransaction } from '../../../interfaces/CustomTransaction.interface';

const MyActivityComponent = (props: BasicComponentProps) => {
	const accountInfo = useSelector((state: RootState) => state.account);
	const [transactions, setTransactions] = useState<Array<CustomTransaction>>(
		[],
	);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getTransactions = async () => {
			const address = await accountInfo.signer?.getAddress();
			if (!address) return;
			const transactionsFromTBTC = await getTbtcTransactions(address);
			setTransactions(transactionsFromTBTC);
			setLoading(false);
			const transactionsFromEtherScan = await getEtherScanTransactions();
			console.log(
				'🚀 ~ getTransactions ~ transactionsFromEtherScan:',
				transactionsFromEtherScan,
			);
		};
		getTransactions();
	}, [accountInfo]);

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
