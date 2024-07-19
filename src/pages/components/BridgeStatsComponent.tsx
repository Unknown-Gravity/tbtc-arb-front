import React, { FC } from 'react';
import { CustomBox } from '../../components/CustomBox';
import {
	Box,
	Divider,
	Grid,
	Stack,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { currencyFormatter } from '../../utils/utils';
import BTCtoCurrencyComponent from '../../components/BTCtoCurrencycomponent';
import TxInfoComponent from './BidgeStatsComponent/TxInfoComponent';
import { transactions } from '../../data/mockData';

const BridgeStatsComponent: FC = () => {
	const { colorMode } = useColorMode();
	return (
		<Stack gap={5}>
			<CustomBox minW={{ base: '100%', '2xl': '1134px' }} mx='auto'>
				<Stack alignItems='center' spacing={0}>
					<Text fontSize='14px' fontWeight={700} variant='gray'>
						tBTC BRIGDE STATS
					</Text>
					<Text fontSize='14px' fontWeight={400} variant='gray'>
						TOTAL SUPPLY
					</Text>

					<Stack alignItems='center' spacing={0}>
						<Text fontSize='54px' fontWeight={700}>
							{currencyFormatter(3355.58, 'USD', 'none')}{' '}
							<Box as='span' fontSize='20px' fontWeight={400}>
								tBTC
							</Box>
						</Text>
						<BTCtoCurrencyComponent
							btcAmount={3355.85}
							currency='USD'
							variant='gray'
						/>
					</Stack>

					<Divider
						my={5}
						borderColor={'brand.purple.600'}
						opacity={colorMode === 'dark' ? '0' : '0.5'}
					/>
					<Text fontSize='14px' variant='gray'>
						Protocol History
					</Text>

					<Grid
						templateColumns={{ xl: 'repeat(2, minmax(0, 1fr))' }}
						w='100%'
						gap=' 20px'
						pt='20px'
					>
						{transactions.map((tx, index) => {
							return (
								<TxInfoComponent
									key={index}
									amount={tx.amount}
									address={tx.address}
									time={tx.time}
								/>
							);
						})}
					</Grid>
				</Stack>
			</CustomBox>
			<CustomBox minW={{ base: '100%', '2xl': '1134px' }} mx='auto'>
				{' '}
				<Stack alignItems='center' spacing={0}>
					<Text fontSize='14px' fontWeight={700} variant='gray'>
						TOTAL TVL (BTC)
					</Text>

					<Stack alignItems='center' spacing={0}>
						<Text fontSize='54px' fontWeight={700}>
							{currencyFormatter(3355.58, 'USD', 'none')}{' '}
							<Box as='span' fontSize='20px' fontWeight={400}>
								tBTC
							</Box>
						</Text>
						<BTCtoCurrencyComponent
							btcAmount={3355.85}
							currency='USD'
							variant='grayPurpleGradient'
						/>
					</Stack>
				</Stack>
			</CustomBox>
		</Stack>
	);
};

export default BridgeStatsComponent;
