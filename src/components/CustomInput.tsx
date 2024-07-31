import {
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	InputProps,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import { BitcoinFilledIcon } from '../assets/icons/BitcoinFilledIcon';

type Props = InputProps & {
	leftLabel?: string;
	rightLabel?: string;
	leftIcon?: boolean;
};

const CustomInput = (props: Props) => {
	const { colorMode } = useColorMode();
	const textColor = useColorModeValue('light.primaryGray', 'white');
	return (
		<Stack spacing='8px' w='100%'>
			<Flex alignItems='center' gap={2} justifyContent='space-between'>
				<Text fontSize='16px' lineHeight='24px' fontWeight={600}>
					{props.leftLabel}
				</Text>
				<Text fontSize='16px' lineHeight='24px' fontWeight={600}>
					{props.rightLabel}
				</Text>
			</Flex>
			<InputGroup>
				{props.leftIcon && (
					<InputLeftElement>
						<BitcoinFilledIcon
							color={textColor}
							fill={
								colorMode === 'dark'
									? 'brand.purple.900'
									: 'white'
							}
							boxSize='22px'
						/>
					</InputLeftElement>
				)}
				<Input {...props} />
			</InputGroup>
		</Stack>
	);
};

export default CustomInput;
