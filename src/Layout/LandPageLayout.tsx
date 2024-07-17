import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import { DarkGridBackground, LightGridBackground } from '../assets/images';
import SideBarComponent from '../components/SideBarComponent';

const LandPageLayout = ({ component }: AppLayoutProps) => {
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
			position='relative'
		>
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

export default LandPageLayout;
