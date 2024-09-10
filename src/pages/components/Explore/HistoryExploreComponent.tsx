import { Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTbtcTransactions } from '../../../services/tbtcServices';
import { CustomTransaction } from '../../../interfaces/CustomTransaction.interface';
import Pagination from '../Pagination';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import TransactionTable from './HistoryExploreComponent/TransactionTable';

/**
 * @name HistoryExploreComponent
 *
 * @description This component is a reusable component that displays the history of the explore page.
 *
 * @returns { JSX.Element }
 */

const ITEMS_PER_PAGE = 20;

const HistoryExploreComponent = () => {
	const [history, setHistory] = useState<Array<CustomTransaction>>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const { isConnected, chainId } = useWeb3ModalAccount();
	const isMainnet =
		(isConnected &&
			chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID) ||
		!isConnected;

	const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);
	const paginatedHistory = history.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const handleChangePage = (page: number) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		const getHistory = async () => {
			const history = await getTbtcTransactions(isMainnet, true);
			setHistory(history);
		};
		getHistory();
	}, [isMainnet]);

	return (
		<Stack spacing='24px'>
			<Text fontSize='24px' fontWeight={600} lineHeight='16px'>
				HISTORY
			</Text>

			<TransactionTable transactions={paginatedHistory} />

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handleChangePage}
			/>
		</Stack>
	);
};

export default HistoryExploreComponent;
