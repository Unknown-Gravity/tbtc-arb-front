import {
	Box,
	Flex,
	Image,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import {
	DarkBackground,
	DarkCoins,
	LightBackground,
	LightCoins,
} from '../../../assets/images';
import { FC } from 'react';

const HomeHeader: FC = () => {
	const [isMobile] = useMediaQuery('(min-width: 820px)');
	const backgroundImage = useColorModeValue(LightBackground, DarkBackground);
	const coins = useColorModeValue(LightCoins, DarkCoins);

	const mask = useColorModeValue(
		'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 100%)',
		'linear-gradient(to top, rgba(26, 32, 44, 0) 0%, rgba(26, 32, 44, 0.4) 100%)',
	);
	return (
		<Box
			h='711px'
			position='relative'
			mx='-120px'
			mt='-48px'
			_before={{
				content: '""',
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				backgroundImage: `url(${backgroundImage})`,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				maskImage: mask,
				WebkitMaskImage: mask,
			}}
		>
			<Flex px='72px' pt='48px' position='relative' zIndex='1'>
				<Flex
					h='711px'
					w='100%'
					justifyContent='space-around'
					alignItems='center'
				>
					<Stack spacing={0}>
						<Text
							fontSize='64px'
							lineHeight='84px'
							fontWeight={700}
						>
							tBTC
						</Text>
						<Text
							fontSize='64px'
							lineHeight='84px'
							fontWeight={900}
						>
							Bitcoin on Arbitrum
						</Text>
						<Text
							fontSize='24px'
							lineHeight='27px'
							variant='gray'
							fontWeight={600}
						>
							Bridge your Bitcoin and start earning.
						</Text>
					</Stack>
					{isMobile && <Image src={coins} />}
				</Flex>
			</Flex>
		</Box>
	);
};

export default HomeHeader;
