import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import InfoHeaderExploreComponent from './HeaderExploreComponent/InfoHeaderExploreComponent';
import {
	DarkBackground,
	DarkExploreBackground,
	LightBackground,
	LightExploreBackground,
} from '../../../assets/images';

type Props = {
	// dune: DuneClient;
};

const HeaderExploreComponent = (props: Props) => {
	const backgroundImage = useColorModeValue(
		`url(${LightExploreBackground})`,
		`url(${DarkExploreBackground})`,
	);
	return (
		<Stack
			w='100%'
			spacing='0'
			p='25px'
			bg={backgroundImage}
			bgSize='cover'
			bgPos='center'
		>
			<Flex
				justifyContent='space-between'
				w='100%'
				alignItems='center'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Text fontSize='24px' lineHeight='32px' fontWeight={600}>
					tBTC TVL
				</Text>
				<Button variant='purple' h='48px' w='161.6px'>
					Start Minting
				</Button>
			</Flex>

			<Flex
				justifyContent='space-between'
				w='100%'
				alignItems='center'
				mt='68px'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Text
					fontSize={{ base: '45px', xl: '60px' }}
					lineHeight='64px'
					fontWeight={700}
				>
					$226,031,612.87 USD
				</Text>
				<Button h='48px' variant='grayOutlined2'>
					View On Dune Analytics
				</Button>
			</Flex>
			<Flex
				mt='48px'
				justifyContent='space-between'
				gap='25px'
				alignItems='center'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<InfoHeaderExploreComponent info={3347.43} label='tBTC' />
				<InfoHeaderExploreComponent
					info={4200}
					label='tBTC'
					symbol='Total mints'
				/>
				<InfoHeaderExploreComponent
					info={828}
					label='tBTC'
					symbol='tBTC Holding Addresses'
				/>
			</Flex>
		</Stack>
	);
};

export default HeaderExploreComponent;
