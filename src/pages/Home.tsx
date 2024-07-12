import { Box, Stack } from '@chakra-ui/react';
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
			<CustomBox
				h='100px'
				minW={{ base: '100%', '2xl': '1134px' }}
				mx='auto'
			></CustomBox>
		</Stack>
	);
};

export default Home;
