import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import { Bridge } from '../../../../assets/images';

/**
 *
 * @name Section2InfoComponent
 *
 * @description This component is a reusable component that displays the information of the sencod section of the InfoComponent.
 *
 * @returns { JSX.Element }
 */

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
						tBTC Bridge
					</Text>
					<Text>
						tBTC is a truly decentralized bridge between Bitcoin and
						DeFi.
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
