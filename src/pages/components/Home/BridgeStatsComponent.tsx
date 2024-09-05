import React, { FC, useEffect, useState } from 'react';
import { CustomBox } from '../../../components/CustomBox';
import {
	Box,
	Divider,
	Grid,
	Stack,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { currencyFormatter } from '../../../utils/utils';
import BTCtoCurrencyComponent from '../../../components/BTCtoCurrencycomponent';
import TxInfoComponent from './BidgeStatsComponent/TxInfoComponent';
import { getTbtcTransactions } from '../../../services/tbtcServices';
import { fetchTbtcSupply } from '../../../services/fetchServices';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

const BridgeStatsComponent: FC = () => {
	const [tbtcSupply, setTbtcSupply] = useState<number>(0);
	const [tbtcTransactions, setTbtcTransactions] = useState<Array<any>>([]);
	const { isConnected, chainId } = useWeb3ModalAccount();
	console.log('🚀 ~ chainId:', chainId);
	const isMainnet =
		isConnected &&
		chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;
	console.log('🚀 ~ isMainnet:', isMainnet);
	useEffect(() => {
		const getTransactions = async () => {
			const transactions2 = await getTbtcTransactions(isMainnet);
			setTbtcTransactions(
				transactions2.sort((a, b) => b.timeStamp - a.timeStamp),
			);
		};

		const getTbtcSupply = async () => {
			const supply = await fetchTbtcSupply();
			setTbtcSupply(supply);
		};
		getTbtcSupply();
		getTransactions();
	}, []);
	const { colorMode } = useColorMode();
	return (
		<Stack gap={5}>
			<CustomBox minW={{ base: '100%', xl: '1134px' }} mx='auto'>
				<Stack alignItems='center' spacing={0}>
					<Text fontSize='14px' fontWeight={700} variant='gray'>
						tBTC BRIGDE STATS
					</Text>
					<Text fontSize='14px' fontWeight={400} variant='gray'>
						TOTAL SUPPLY
					</Text>

					<Stack alignItems='center' spacing={0}>
						<Text fontSize='54px' fontWeight={700}>
							{currencyFormatter(tbtcSupply, 'USD', 'none')}{' '}
							<Box as='span' fontSize='20px' fontWeight={400}>
								tBTC
							</Box>
						</Text>
						<BTCtoCurrencyComponent
							btcAmount={tbtcSupply}
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
						{tbtcTransactions &&
							tbtcTransactions.map((tx, index) => {
								return (
									<TxInfoComponent
										key={index}
										value={tx.value}
										hash={tx.hash}
										timeStamp={tx.timeStamp}
										link={tx.link}
									/>
								);
							})}
					</Grid>
				</Stack>
			</CustomBox>
		</Stack>
	);
};

export default BridgeStatsComponent;
