import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import { Bridge } from '../../../../assets/images';

const Section2InfoComponent = () => {
	return (
		<CustomBox p='25px' minW={{ base: '100%', xl: '1134px' }} mx='auto'>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				alignItems='center'
				justifyContent='space-between'
				gap={{ base: 8 }}
			>
				<Stack gap='15px' maxW='567px'>
					<Text fontSize='24px' fontWeight={700}>
						tBTC BRIDGE
					</Text>
					<Text>
						The second generation of tBTC is a truly decentralized
						bridge between Bitcoin and Ethereum.
					</Text>
					<Text>
						It provides Bitcoin holders permissionless access to
						DeFi and the expanding web3 universe.
					</Text>
				</Stack>
				<Image src={Bridge} />
			</Flex>
		</CustomBox>
	);
};

export default Section2InfoComponent;
