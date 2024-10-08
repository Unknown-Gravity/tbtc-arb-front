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
import { ChangeEvent } from 'react';

type Props = InputProps & {
	leftlabel?: string;
	rightlabel?: string;
	lefticon?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 *
 * @name CustomInput
 *
 * @description This component is a reusable component that displays an input with a left and right label.
 *
 * @param { string } leftlabel - The left label to display.
 * @param { string } rightlabel - The right label to display.
 * @param { string } lefticon - A boolean to determine if the left icon should be displayed.
 * @param { () => void } onChange - A function to execute when the input value changes.
 *
 * @returns { JSX.Element }
 */

const CustomInput = (props: Props) => {
	const { leftlabel, rightlabel, lefticon, onChange } = props;
	const { colorMode } = useColorMode();
	const textColor = useColorModeValue('light.primaryGray', 'white');
	return (
		<Stack spacing='8px' w='100%'>
			<Flex alignItems='center' gap={2} justifyContent='space-between'>
				<Text fontSize='16px' lineHeight='24px' fontWeight={600}>
					{leftlabel}
				</Text>
				<Text fontSize='16px' lineHeight='24px' fontWeight={600}>
					{rightlabel}
				</Text>
			</Flex>
			<InputGroup>
				{lefticon === 'true' && (
					<InputLeftElement>
						<BitcoinFilledIcon
							color={textColor}
							fill={
								colorMode === 'dark'
									? 'brand.purple.900'
									: 'white'
							}
							boxSize='17px'
						/>
					</InputLeftElement>
				)}
				<Input {...props} onChange={onChange} />
			</InputGroup>
		</Stack>
	);
};

export default CustomInput;
