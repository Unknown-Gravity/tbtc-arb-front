import {
	Flex,
	Image,
	Stack,
	Text,
	useColorModeValue,
	useMediaQuery,
} from '@chakra-ui/react';
import { DarkCoins, LightCoins } from '../../../assets/images';
import { FC } from 'react';

const HomeHeader: FC = () => {
	const [isMobile] = useMediaQuery('(min-width: 820px)');

	const coins = useColorModeValue(LightCoins, DarkCoins);

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
					<Text
						fontSize={{ base: '40px', xl: '64px' }}
						lineHeight={{ xl: '84px' }}
						fontWeight={900}
					>
						Bitcoin on Arbitrum
					</Text>
					<Text
						fontSize='24px'
						lineHeight='27px'
						variant='gray'
						fontWeight={600}
						mt={{ base: '20px' }}
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
