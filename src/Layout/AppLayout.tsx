import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import SideBarComponent from '../components/SideBarComponent';
import { Dispatch, useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import {
	DarkMainGridBackground,
	LightMainGridBackground,
} from '../assets/images';

const AppLayout = ({ component }: AppLayoutProps) => {
	const [isOpen, setIsOpen]: [boolean, Dispatch<boolean>] = useState(false);
	const { colorMode } = useColorMode();

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Flex
			minHeight='100vh'
			position='relative'
			pl={isOpen ? '155px' : '55px'}
			transition='padding 0.2s'
			bgImage={
				colorMode === 'light'
					? LightMainGridBackground
					: DarkMainGridBackground
			}
			bgRepeat='no-repeat'
			bgSize='cover'
			bgPos='bottom'
		>
			<SideBarComponent isOpen={isOpen} onClick={handleOpen} />
			<Flex
				flexDirection={'column'}
				flex={1}
				py={8}
				pr={{ base: 3.5, xl: 8 }}
			>
				<HeaderComponent isOpen={isOpen} />
				<Box
					w='100%'
					py={4}
					pl={{ base: 4, xl: 18 }}
					pr={{ base: 0, xl: 10 }}
				>
					{component}
				</Box>
			</Flex>
		</Flex>
	);
};

export default AppLayout;
