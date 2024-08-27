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
	Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AccountImageExample } from '../../../assets/images';
import { formatAddress, getDifferenceInMinutes } from '../../../utils/utils';
import { Transactions } from '../../../interfaces/Transactions.interface';

const HistoryExploreComponent = () => {
	const [history, setHistory] = useState<Array<Transactions>>([]);
	const apikey = process.env.REACT_APP_API_KEY || '';

	useEffect(() => {
		axios
			.get('https://api.dune.com/api/v1/query/3965425/results?limit=20', {
				headers: { 'X-Dune-API-Key': apikey },
			})
			.then(res => {
				setHistory(res.data.result.rows);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, [apikey]);

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
											src={AccountImageExample}
											w='16px'
											h='16px'
										/>
										{formatAddress(
											transaction.Wallet_Address,
										)}
									</Flex>
								</Td>
								<Td px={{ base: '10px', xl: '24px' }}>
									{formatAddress(transaction.Latest_Tx_Hash)}
								</Td>
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
