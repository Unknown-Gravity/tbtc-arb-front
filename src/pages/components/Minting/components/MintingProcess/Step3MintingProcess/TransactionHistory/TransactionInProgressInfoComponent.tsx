import {
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import {
	DarkTransactionBoxImage,
	LightTransactionBoxImage,
} from '../../../../../../../assets/images';

const TransactionInProgressInfoComponent = () => {
	const bgColor = useColorModeValue(
		'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(121.21deg, #D987FF 3.33%, #7A00F8 95.81%)',
		'dark.focusGray',
	);
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const borderStyle = useColorModeValue('none', `0 0 0 1px ${borderColor}`);
	const image = useColorModeValue(
		LightTransactionBoxImage,
		DarkTransactionBoxImage,
	);

	return (
		<Stack
			borderRadius='12px'
			gap='10px'
			padding='10px'
			bg={bgColor}
			boxShadow={borderStyle}
			alignItems='center'
			mt='32px'
		>
			<Image src={image} maxW='91px' />
			<Text
				color='white'
				fontWeight={600}
				fontSize='18px'
				lineHeight='26px'
			>
				6/6 Bitcoin Confirmations Requirement
			</Text>
			<Text
				color='white'
				fontSize='14px'
				lineHeight='20px'
				fontWeight={400}
			>
				Six confirmations typically ensure transaction validity and
				finality.{' '}
				<Link
					variant='purpleDarkGradient'
					href='https://en.bitcoin.it/wiki/Confirmation'
					isExternal
				>
					Read more
				</Link>
			</Text>
		</Stack>
	);
};

export default TransactionInProgressInfoComponent;
