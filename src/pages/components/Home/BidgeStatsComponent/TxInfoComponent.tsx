import {
	Box,
	Grid,
	Text,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { getDifferenceInMinutes } from '../../../../utils/utils';

type Props = {
	amount: number;
	address: string;
	time: Date;
};

const TxInfoComponent = ({ amount, address, time }: Props) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();
	const borderColor = useColorModeValue(
		theme.colors.light.gray,
		'transparent',
	);
	const bgColor = colorMode === 'light' ? 'white' : 'dark.focusGray';

	const formattedAddress = `${address.slice(0, 6)}....${address.slice(-4)}`;
	const timeDifference = getDifferenceInMinutes(time, new Date());

	return (
		<Box
			border={`0.5px solid ${borderColor}`}
			p='10px'
			w='100%'
			borderRadius='5px'
			bg={bgColor}
		>
			<Grid
				templateColumns='repeat(3, minmax(0, 1fr))'
				placeItems='center'
			>
				<Text
					fontSize='12px'
					fontWeight={500}
					lineHeight='18px'
					variant='purpleDarkGradient'
				>
					{amount} tBTC
				</Text>

				<Text
					fontSize='12px'
					fontWeight={500}
					variant='gray'
					lineHeight='18px'
				>
					{formattedAddress}
				</Text>

				<Text
					fontSize='12px'
					fontWeight={500}
					variant='gray'
					lineHeight='18px'
				>
					{timeDifference} mins ago
				</Text>
			</Grid>
		</Box>
	);
};

export default TxInfoComponent;
