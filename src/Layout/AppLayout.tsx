import { Box, Flex, useColorMode, useDisclosure } from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import { DarkGridBackground, LightGridBackground } from '../assets/images';
import SideBarMenu from '../components/SideBarMenu';
import HeaderComponent from '../components/HeaderComponent';

const AppLayout = ({ component }: AppLayoutProps) => {
	const [isMobile] = useMediaQuery('(min-width: 768px)');
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			minHeight='100vh'
			position='relative'
			pl={isMobile ? (isOpen ? '155px' : '55px') : '0px'}
			transition='padding 0.2s'
			bgImage={
				colorMode === 'light' ? LightGridBackground : DarkGridBackground
			}
			bgRepeat='no-repeat'
			bgSize='cover'
			bgPos='bottom'
		>
			<SideBarMenu
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				isMobile={isMobile}
			/>
			<Flex
				flexDirection={'column'}
				flex={1}
				py={8}
				pr={{ base: 3.5, xl: 8 }}
			>
				<HeaderComponent
					isOpen={isOpen}
					onOpen={onOpen}
					isMobile={isMobile}
				/>
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
