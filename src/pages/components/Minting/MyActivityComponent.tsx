import { CustomBox } from '../../../components/CustomBox';
import { Skeleton, Text } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import TransactionComponent from './components/TransactionComponent';

import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { useState, useMemo, useEffect } from 'react';
import RenderedTransactionsComponent from './components/MyActivityComponent/RenderedTransactionsComponent';
import NotRenderedTransactionsComponent from './components/MyActivityComponent/NotRenderedTransactionsComponent';
import { getWalletTransactions } from '../../../services/tbtcServices';
import { CustomTransaction } from '../../../interfaces/CustomTransaction.interface';

const loadingTransactions = [
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
	<Skeleton height='50px' borderRadius='10px' />,
];

const MyActivityComponent = ({ isConnected }: BasicComponentProps) => {
	const accountInfo = useSelector((state: RootState) => state.account);
	const [transactions, setTransactions] = useState<Array<CustomTransaction>>(
		[],
	);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getTransactions = async () => {
			const address = await accountInfo.signer?.getAddress();
			const network = accountInfo.provider?.network.chainId;
			const isMainnet = network?.toString() === "42161";
			if (!address) return;
			const transactions = await getWalletTransactions(
				isMainnet,
				address,
			);

			setTransactions(transactions);
			setLoading(false);
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
		<CustomBox h='100%' p='25px 15px' maxH='518.8px'>
			<Text fontSize='16px' lineHeight='16px' fontWeight='600'>
				MY ACTIVITY
			</Text>
			{isConnected && loading ? (
				<RenderedTransactionsComponent
					data={loadingTransactions}
					key={1}
				/>
			) : !isConnected || transactions.length === 0 ? (
				<NotRenderedTransactionsComponent />
			) : (
				<RenderedTransactionsComponent
					data={renderedTransactions}
					key={2}
				/>
			)}
		</CustomBox>
	);
};

export default MyActivityComponent;
