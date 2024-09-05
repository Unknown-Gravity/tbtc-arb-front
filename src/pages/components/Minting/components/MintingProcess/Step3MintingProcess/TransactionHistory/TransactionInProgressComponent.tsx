import {
	Flex,
	Icon,
	Image,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import {
	DarkPurpleBitcoinIcon,
	DarkYellowBitcoinIcon,
	LightPurpleBitcoinIcon,
	LightYellowBitcoinIcon,
} from '../../../../../../../assets/images';
import { GoDotFill } from 'react-icons/go';

type Props = { activeIndex: number };

const TransactionInProgressComponent = ({ activeIndex }: Props) => {
	const image1 = useColorModeValue(
		LightPurpleBitcoinIcon,
		DarkPurpleBitcoinIcon,
	);
	const image2 = useColorModeValue(
		LightYellowBitcoinIcon,
		DarkYellowBitcoinIcon,
	);
	const { colorMode } = useColorMode();

	const getColor = (index: number) => {
		return index === activeIndex
			? 'brand.purple.900'
			: colorMode === 'light'
			? 'light.superLightGray'
			: 'dark.focusGray';
	};
	return (
		<Flex alignItems='center' mt='50px'>
			<Image src={image1} />
			{new Array(3).fill(0).map((_, index) => {
				const delay = index * 0.2;
				return (
					<Icon
						as={GoDotFill}
						boxSize='32px'
						color={getColor(0)}
						transition={`color ${delay}s ease`}
					/>
				);
			})}

			<Image src={image2} />
		</Flex>
	);
};

export default TransactionInProgressComponent;
