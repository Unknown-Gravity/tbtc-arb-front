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

type Props = {};

const Step1Timeline = (props: Props) => {
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
					STEP 1
				</Text>
				<Text fontSize='14px' lineHeight='16px' fontWeight={600}>
					PROVIDE A DEPOSIT ADDRESS
				</Text>
				<Text fontSize='14px' lineHeight='21px' fontWeight={400}>
					Provide an ETH address and a BTC Return address to generate
					a unique BTC deposit address. <br />
					<Link as='span' variant='purpleDarkGradient'>
						Read More
					</Link>
				</Text>
				<Image
					src={
						colorMode === 'light'
							? LightStep1Timeline
							: DarkStep1Timeline
					}
				/>
			</Stack>
		</Box>
	);
};

export default Step1Timeline;
