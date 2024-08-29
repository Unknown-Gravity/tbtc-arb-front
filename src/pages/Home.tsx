import { Stack } from '@chakra-ui/react';
import HomeHeader from './components/Home/HomeHeader';
import { FC, useState } from 'react';
import BannerHome from './components/Home/BannerHome';
import BridgeStatsComponent from './components/Home/BridgeStatsComponent';
import InfoSectionComponent from './components/Home/InfoSectionComponent';
import JoinComponent from './components/Home/JoinComponent';
import FooterComponent from '../components/FooterComponent';
import WelcomeModalComponent from '../components/WelcomeModalComponent';

const Home: FC = () => {
	const [showMintWindow, setShowMintWindow] = useState(true);

	const handleCloseBanner = (): void => {
		setShowMintWindow(false);
	};

	return (
		<Stack gap={10} position='relative'>
			<WelcomeModalComponent />
			<HomeHeader />

			<Stack gap={10} w='100%'>
				{showMintWindow && <BannerHome onClick={handleCloseBanner} />}
				<BridgeStatsComponent />
				<InfoSectionComponent />
				<JoinComponent />
				<FooterComponent />
			</Stack>
		</Stack>
	);
};

export default Home;
