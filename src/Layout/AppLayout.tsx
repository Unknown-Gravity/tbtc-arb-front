import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import { DarkGridBackground, LightGridBackground } from '../assets/images';
// import Navigation from '../components/SidebarComponent/Navigation';
// import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const AppLayout = ({ component }: AppLayoutProps) => {
	const background = useColorModeValue(
		LightGridBackground,
		DarkGridBackground,
	);
	return (
		<Flex
			minHeight='100vh'
			bgImage={background}
			bgSize='100% 100%'
			bgRepeat='no-repeat'
			bgPosition='bottom'
		>
			{/* <Navigation /> */}
			<Flex flexDirection={'column'} flex={1} p={8}>
				{/* <HeaderComponent /> */}
				<Box w='100%' py={4} px={10}>
					{component}
				</Box>
			</Flex>
		</Flex>
	);
};

export default AppLayout;
