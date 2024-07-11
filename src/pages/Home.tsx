import { Stack } from '@chakra-ui/react';
import HomeHeader from './components/HomeHeader';
import { useState } from 'react';
import BannerHome from './components/BannerHome';

const Home = () => {
	const [showMintWindow, setShowMintWindow] = useState(true);

	const handleCloseBanner = (): void => {
		setShowMintWindow(false);
	};

	return (
		<Stack gap={10}>
			<HomeHeader />
			{showMintWindow && <BannerHome onClick={handleCloseBanner} />}
		</Stack>
	);
};

export default Home;
