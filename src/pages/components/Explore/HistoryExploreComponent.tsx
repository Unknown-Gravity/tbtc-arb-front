import {
	Flex,
	Image,
	Stack,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
	formatAddress,
	generateIdenticon,
	getDifferenceInMinutes,
} from '../../../utils/utils';
import { Transactions } from '../../../interfaces/Transactions.interface';
import { fetchExploreHistory } from '../../../services/fetchServices';

/**
 * @name HistoryExploreComponent
 *
 * @description This component is a reusable component that displays the history of the explore page.
 *
 * @returns { JSX.Element }
 */

const HistoryExploreComponent = () => {
	const [history, setHistory] = useState<Array<Transactions>>([]);

	useEffect(() => {
		const getHistory = async () => {
			const history = await fetchExploreHistory();
			setHistory(history);
		};
		getHistory();
	}, []);

	return (
		<Stack spacing='24px'>
			<Text fontSize='24px' fontWeight={600} lineHeight='16px'>
				HISTORY
			</Text>
			<Table mt='24.5px' fontSize='12px'>
				<Thead>
					<Tr>
						<Th px={{ base: '10px', xl: '24px' }}>tBTC AMOUNT</Th>
						<Th px={{ base: '10px', xl: '24px' }}>
							WALLET ADDRESS
						</Th>
						<Th px={{ base: '10px', xl: '24px' }}>TX HASH</Th>
						<Th px={{ base: '10px', xl: '24px' }}>TIMESTAMP</Th>
					</Tr>
				</Thead>
				<Tbody>
					{history?.map((transaction, index) => {
						return (
							<Tr key={index}>
								<Td px={{ base: '10px', xl: '24px' }}>
									{transaction?.Holding_Amount}
								</Td>
								<Td px={{ base: '10px', xl: '24px' }}>
									<Flex gap={'8px'}>
										<Image
											src={generateIdenticon(
												transaction.Wallet_Address,
											)}
											w='16px'
											h='16px'
										/>
										<Tooltip
											label={transaction.Wallet_Address}
										>
											{formatAddress(
												transaction.Wallet_Address,
											)}
										</Tooltip>
									</Flex>
								</Td>
								<Tooltip label={transaction.Latest_Tx_Hash}>
									<Td px={{ base: '10px', xl: '24px' }}>
										{formatAddress(
											transaction.Latest_Tx_Hash,
										)}
									</Td>
								</Tooltip>
								<Td px={{ base: '10px', xl: '24px' }}>
									{transaction.Latest_Date &&
										getDifferenceInMinutes(
											new Date(transaction.Latest_Date),
											new Date(),
										)}
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</Stack>
	);
};

export default HistoryExploreComponent;
