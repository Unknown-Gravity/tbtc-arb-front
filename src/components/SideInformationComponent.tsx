import {
	Image,
	Stack,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import {
	DarkTransactionBoxImage,
	LightTransactionBoxImage,
} from '../assets/images';

type Props = { header: string; body: string };

const SideInformationComponent = ({ header, body }: Props) => {
	const theme = useTheme();
	const image = useColorModeValue(
		LightTransactionBoxImage,
		DarkTransactionBoxImage,
	);
	const borderColor = theme.colors.brand.purple[900];
	const boxBackground = useColorModeValue(
		'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(121.21deg, #D987FF 3.33%, #7A00F8 95.81%)',
		'dark.focusGray',
	);
	const boxShadow = useColorModeValue('none', `0 0 0 1px ${borderColor}`);
	return (
		<Stack
			borderRadius='12px'
			gap='10px'
			padding='10px'
			bg={boxBackground}
			boxShadow={boxShadow}
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
				{header}
			</Text>
			<Text
				color='white'
				fontSize='14px'
				lineHeight='20px'
				fontWeight={400}
			>
				{body}
			</Text>
		</Stack>
	);
};

export default SideInformationComponent;
