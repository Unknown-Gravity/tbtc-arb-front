import {
	Box,
	Grid,
	Link,
	Text,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { formatAddress, getDifferenceInMinutes } from '../../../../utils/utils';

type Props = {
	value: number;
	hash: string;
	timeStamp: string;
	link: string;
};

/**
 *
 * @name TxInfoComponent
 *
 * @description This component displays the information of the transaction.
 *
 * @param { number } value - The value of the transaction.
 * @param { string } hash - The hash of the transaction.
 * @param { string } timeStamp - The timestamp of the transaction.
 * @param { string } link - The link of the transaction.
 *
 * @returns { JSX.Element }
 */

const TxInfoComponent = ({ value, hash, timeStamp, link }: Props) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();
	const borderColor = useColorModeValue(
		theme.colors.light.gray,
		'transparent',
	);

	const bgColor = colorMode === 'light' ? 'white' : 'dark.focusGray';

	const formattedAddress = formatAddress(hash);
	const newDate = new Date(parseInt(timeStamp) * 1000);
	const newDate2 = new Date();
	const timeDifference = getDifferenceInMinutes(newDate, newDate2);

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
					{value} tBTC
				</Text>

				<Link
					fontSize='12px'
					fontWeight={500}
					variant='lightGrayDarkPurple'
					lineHeight='18px'
					isExternal
					href={link}
				>
					{formattedAddress}
				</Link>

				<Text
					fontSize='12px'
					fontWeight={500}
					variant='gray'
					lineHeight='18px'
				>
					{timeDifference}
				</Text>
			</Grid>
		</Box>
	);
};

export default TxInfoComponent;
