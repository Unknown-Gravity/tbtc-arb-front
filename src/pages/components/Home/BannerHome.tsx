import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { AtomImage, LightPointBackground } from '../../../assets/images';
import { ComponentProps } from '../../../interfaces/ComponentProps';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../../../Routes/Routes';

// Definimos la interfaz para las props

const BannerHome = ({ onClick }: ComponentProps) => {
	const { colorMode } = useColorMode();
	const theme = useTheme();
	const borderColor = useColorModeValue(
		'transparent',
		theme.colors.brand.purple[900],
	);

	const background = useColorModeValue(
		`linear-gradient(to right, #B62CFF70, #7D00FF70), url(${LightPointBackground})`,
		`linear-gradient(to right, #00000080, #00000080), url(${LightPointBackground})`,
	);

	const navigate = useNavigate();

	return (
		<Box
			bg={
				colorMode === 'dark'
					? 'dark.focusGray'
					: 'linear-gradient(to right, #B62CFF, #7D00FF)'
			}
			borderRadius='14px'
			minW={{ base: '100%', xl: '1134px' }}
			mx='auto'
			position='relative'
		>
			<Flex
				py={5}
				px={{ base: 0, xl: 24 }}
				border={`1px solid ${borderColor}`}
				bgImage={background}
				bgPosition='bottom'
				bgRepeat='no-repeat'
				bgSize='cover'
				borderRadius='14px'
				alignItems='center'
				justifyContent='space-between'
				flexDir={{ base: 'column', xl: 'row' }}
				h='fit-content'
			>
				<Flex
					alignItems='center'
					flexDir={{ base: 'column', xl: 'row' }}
				>
					<Image src={AtomImage} />
					<Stack pl={5} pb={{ base: 5, xl: 0 }}>
						<Text
							fontSize='16px'
							fontWeight={600}
							lineHeight='24px'
							color='white'
						>
							GET STARTED
						</Text>
						<Text
							color='white'
							fontSize='30px'
							fontWeight={700}
							lineHeight='38px'
						>
							Get your Bitcoin to work!
						</Text>
					</Stack>
				</Flex>
				<Button
					variant='whiteFilled'
					onClick={() => navigate(`/${PublicRoutes.Mintin}`)}
					justifySelf='end'
				>
					Mint tBTC
				</Button>
			</Flex>
			<CloseButton
				size='md'
				position='absolute'
				top='13px'
				right='13px'
				color='white'
				onClick={onClick}
			/>
		</Box>
	);
};

export default BannerHome;
