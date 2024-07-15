import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import HomeHeader from './components/HomeHeader';
import { Component, FC, useEffect, useState } from 'react';
import BannerHome from './components/BannerHome';
import SideBarComponent from '../components/SideBarComponent/SideBarComponent';
import { CustomBox } from '../components/CustomBox';
import { convertBTCToCurrency, currencyFormatter } from '../utils/utils';
import BTCtoCurrencyComponent from '../components/BTCtoCurrencycomponent';
import BridgeStatsComponent from './components/BridgeStatsComponent';

const Home: FC = () => {
	const [showMintWindow, setShowMintWindow] = useState(true);

	const btc = convertBTCToCurrency(3355.58, 'USD');
	console.log('🚀 ~ btc:', btc);

	const handleCloseBanner = (): void => {
		setShowMintWindow(false);
	};

	return (
		<Stack gap={10} position='relative'>
			<HomeHeader />
			<SideBarComponent />
			{showMintWindow && <BannerHome onClick={handleCloseBanner} />}
			<BridgeStatsComponent />
		</Stack>
	);
};

export default Home;
