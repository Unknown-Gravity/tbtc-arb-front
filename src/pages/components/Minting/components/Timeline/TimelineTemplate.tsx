import {
	Box,
	Image,
	Link,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import {
	DarkStep1Timeline,
	LightStep1Timeline,
} from '../../../../../assets/images';

type Props = {
	step: number;
	label: string;
	children: any;
};

const TimelineTemplate = (props: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const { colorMode } = useColorMode();
	return (
		<Box maxW='245px'>
			<Text
				fontSize='16px'
				lineHeight='16px'
				fontWeight={600}
				mb='16.5px'
				px='20px'
			>
				TIMELINE
			</Text>
			<Stack
				spacing='10px'
				p='2px 18px 15px 18px'
				borderLeft={`5px solid ${borderColor}`}
			>
				<Text variant='purple' fontSize='10px'>
					STEP {props.step}
				</Text>
				<Text fontSize='14px' lineHeight='16px' fontWeight={600}>
					{props.label}
				</Text>
				{props.children}
			</Stack>
		</Box>
	);
};

export default TimelineTemplate;
