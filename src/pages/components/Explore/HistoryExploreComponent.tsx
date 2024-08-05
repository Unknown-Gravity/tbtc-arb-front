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
import { transactionExplorer } from '../../../data/mockData';
import { formatAddress, getDifferenceInMinutes } from '../../../utils/utils';
import { AccountImageExample } from '../../../assets/images';
type Props = {};

const HistoryExploreComponent = (props: Props) => {
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
					{transactionExplorer.map((transaction, index) => {
						return (
							<Tr key={index}>
								<Td px={{ base: '10px', xl: '24px' }}>
									{transaction.tbtc}
								</Td>
								<Td px={{ base: '10px', xl: '24px' }}>
									<Flex gap={'8px'}>
										<Image
											src={AccountImageExample}
											w='16px'
											h='16px'
										/>
										{formatAddress(transaction.address)}
									</Flex>
								</Td>
								<Td px={{ base: '10px', xl: '24px' }}>
									{formatAddress(transaction.tx)}
								</Td>
								<Td px={{ base: '10px', xl: '24px' }}>
									{transaction.date &&
										getDifferenceInMinutes(
											transaction.date,
											new Date(),
										)}{' '}
									minutes ago
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
