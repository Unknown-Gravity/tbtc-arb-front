import { Box, Flex } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import { DarkBackground, DarkGridBackground } from '../assets/images';
// import Navigation from '../components/SidebarComponent/Navigation';
// import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const LandPageLayout = ({ component }: AppLayoutProps) => {
	return (
		<Flex h='100vh' bgSize='100%' height='4752px'>
			{/* <Navigation /> */}
			<Flex flexDirection={'column'} flex={1} p={8}>
				{/* <HeaderComponent /> */}
				<Box w='100%' py={4} px={10} maxWidth={'1135px'}>
					{component}
				</Box>
			</Flex>
		</Flex>
	);
};

export default LandPageLayout;
