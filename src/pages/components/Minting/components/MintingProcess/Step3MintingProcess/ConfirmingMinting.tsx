import {
	Box,
	Flex,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoCheckmark } from 'react-icons/io5';
import CustomSpinner from '../../../../../../components/CustomSpinner';

type Props = {
	confirmations: number;
};

const ConfirmingMinting = (props: Props) => {
	const { colorMode } = useColorMode();
	const theme = useTheme();

	return (
		<Stack gap='35px' alignItems='center'>
			<Text fontSize='12px' lineHeight='14.52px' textAlign='center'>
				{props.confirmations < 6
					? 'Waiting for the Bitcoin Network Confirmations...'
					: 'Confirmations completed'}
			</Text>
			{props.confirmations <= 6 ? (
				<CustomSpinner />
			) : (
				<Box
					boxSize='160px'
					bg={
						colorMode === 'light'
							? 'brand.purple.900'
							: 'linear-gradient(to right, #EDC6FF, #AB5AFA)'
					}
					display='flex'
					alignItems='center'
					justifyContent='center'
					borderRadius='full'
				>
					<IoCheckmark
						size='120px'
						color={
							colorMode === 'light'
								? 'white'
								: theme.colors.dark.primaryGray
						}
					/>
				</Box>
			)}
			<Stack gap='10px'>
				<Flex
					gap='4px'
					color={colorMode === 'light' ? 'light.coolGray2' : 'white'}
					alignItems='center'
					justifyContent='center'
				>
					<BsFillCheckCircleFill size='14.67px' />
					<Text
						variant='lightCoolGray'
						lineHeight='19.36px'
						fontWeight={600}
					>
						{props.confirmations > 6 ? 6 : props.confirmations}/6
						Bitcoin Network Confirmations
					</Text>
				</Flex>
				<Text
					variant='coolGray'
					textAlign='center'
					fontSize='14px'
					lineHeight='24px'
				>
					Your Bitcoin deposit transaction requires 6 confirmations on
					the Bitcoin network before initiating the minting process.
				</Text>
			</Stack>
			<Text variant='coolGray' fontSize='14px' lineHeight='20px'>
				See transaction on blockstream
			</Text>
		</Stack>
	);
};

export default ConfirmingMinting;