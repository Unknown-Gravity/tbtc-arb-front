import { Box, Stack, Text } from '@chakra-ui/react';
import HomeHeader from './components/HomeHeader';
import { useState } from 'react';
import BannerHome from './components/BannerHome';
import SideBarComponent from '../components/SideBarComponent/SideBarComponent';
import { CustomBox } from '../components/CustomBox';

const Home = () => {
	const [showMintWindow, setShowMintWindow] = useState(true);

	const handleCloseBanner = (): void => {
		setShowMintWindow(false);
	};

	return (
		<Stack gap={10} position='relative'>
			<HomeHeader />
			<SideBarComponent />
			{showMintWindow && <BannerHome onClick={handleCloseBanner} />}
			<CustomBox minW={{ base: '100%', '2xl': '1134px' }} mx='auto'>
				<Stack mx='center'>
					<Text fontSize='14px' fontWeight={700} variant='gray'>
						tBTC BRIGDE STATS
					</Text>
					<Text fontSize='14px' fontWeight={400} variant='gray'>
						TOTAL SUPPLY
					</Text>
				</Stack>
			</CustomBox>
		</Stack>
	);
};

export default Home;
