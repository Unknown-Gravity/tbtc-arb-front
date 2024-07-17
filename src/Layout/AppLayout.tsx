import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import { DarkGridBackground, LightGridBackground } from '../assets/images';
import SideBarComponent from '../components/SideBarComponent';
// import Navigation from '../components/SidebarComponent/Navigation';
// import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const AppLayout = ({ component }: AppLayoutProps) => {
	return (
		<Flex minHeight='100vh' position='relative'>
			<SideBarComponent />
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
