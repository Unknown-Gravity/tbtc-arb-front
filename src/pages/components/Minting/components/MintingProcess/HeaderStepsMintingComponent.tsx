import { Flex, Text, useColorMode } from '@chakra-ui/react';
import { BitcoinFilledIcon } from '../../../../../assets/icons/BitcoinFilledIcon';

type Props = {
	label: string;
};

const HeaderStepsMintingComponent = ({ label }: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Flex alignItems='center' gap={5}>
			<BitcoinFilledIcon
				color={colorMode === 'light' ? 'light.primaryGray' : 'white'}
				fill={colorMode === 'dark' ? 'brand.purple.900' : 'white'}
				boxSize='22px'
			/>
			<Text fontSize='16px' lineHeight='24px' fontWeight={600}>
				{label}
			</Text>
		</Flex>
	);
};

export default HeaderStepsMintingComponent;
