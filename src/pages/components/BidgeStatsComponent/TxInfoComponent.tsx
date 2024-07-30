import {
	Box,
	Grid,
	Text,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { getDifferenceInMinutes } from '../../../utils/utils';

type Props = {
	amount: number;
	address: string;
	time: Date;
};

const TxInfoComponent = (props: Props) => {
	const theme = useTheme();
	const borderColor = useColorModeValue(
		theme.colors.light.gray,
		'transparent',
	);
	const { colorMode } = useColorMode();

	getDifferenceInMinutes(props.time, new Date());

	return (
		<Box
			border={`0.5px solid ${borderColor}`}
			p='10px'
			w='100%'
			borderRadius='5px'
			bg={colorMode === 'light' ? 'white' : 'dark.focusGray'}
		>
			<Grid
				templateColumns={'repeat(3, minmax(0, 1fr))'}
				placeItems='center'
			>
				<Text
					fontSize='12px'
					fontWeight={500}
					lineHeight='18px'
					variant='purpleDarkGradient'
				>
					{props.amount} tBTC
				</Text>

				<Text
					fontSize='12px'
					fontWeight={500}
					variant='gray'
					lineHeight='18px'
				>
					{props.address.slice(0, 6)}....${props.address.slice(-4)}
				</Text>
				<Text
					fontSize='12px'
					fontWeight={500}
					variant='gray'
					lineHeight='18px'
				>
					{getDifferenceInMinutes(props.time, new Date())} minutes ago
				</Text>
			</Grid>
		</Box>
	);
};

export default TxInfoComponent;
