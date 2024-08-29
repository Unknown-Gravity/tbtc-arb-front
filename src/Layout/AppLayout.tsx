import {
	Box,
	Flex,
	Image,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useMediaQuery } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import {
	DarkBackground,
	DarkGridBackground,
	LightBackground,
	LightGridBackground,
} from '../assets/images';
import SideBarMenu from '../components/SideBarMenu';
import HeaderComponent from '../components/HeaderComponent';

const AppLayout = ({ component, headerTitle }: AppLayoutProps) => {
	const [isMobile] = useMediaQuery('(min-width: 768px)');
	const { colorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const mask = useColorModeValue(
		'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 100%)',
		'linear-gradient(to top, rgba(26, 32, 44, 0) 0%, rgba(26, 32, 44, 0.4) 100%)',
	);

	const path = window.location.pathname.slice(1);

	const backgroundImage = useColorModeValue(LightBackground, DarkBackground);
	return (
		<Flex
			minHeight='100vh'
			position='relative'
			pl={isMobile ? (isOpen ? '200px' : '55px') : '0px'}
			transition='padding 0.2s'
			bgImage={
				colorMode === 'light' ? LightGridBackground : DarkGridBackground
			}
			bgRepeat='no-repeat'
			bgPosition='top'
			bgSize='cover'
		>
			{path === 'home' && (
				<Box
					maxH='711px'
					content='""'
					position='absolute'
					top='61px'
					right={0}
					bottom={0}
					left={0}
					sx={{
						maskImage: mask,
					}}
				>
					<Image src={backgroundImage} w='100%' position='absolute' />
				</Box>
			)}

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
				pr={{ base: 3.5, xl: 0 }}
			>
				<HeaderComponent
					title={headerTitle}
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
