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
		<Flex px='72px' pt='48px' zIndex='1'>
			<Flex
				h='711px'
				w='100%'
				justifyContent='space-around'
				alignItems='center'
			>
				<Stack spacing={0}>
					<Text fontSize='64px' lineHeight='84px' fontWeight={700}>
						tBTC
					</Text>
					<Text fontSize='64px' lineHeight='84px' fontWeight={900}>
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
	);
};

export default HomeHeader;
