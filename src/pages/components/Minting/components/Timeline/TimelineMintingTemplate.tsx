import { Box, Stack, Text, useColorMode, useTheme } from '@chakra-ui/react';

type Props = {
	step: number;
	label: string;
	children: any;
	unmint?: boolean;
};

const TimelineTemplate = (props: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const { colorMode } = useColorMode();
	return (
		<Box maxW='221px'>
			<Text
				fontSize='16px'
				lineHeight='16px'
				fontWeight={600}
				mb='15px'
				px={props.unmint ? 0 : '20px'}
			>
				TIMELINE
			</Text>
			<Stack
				spacing='15px'
				p={props.unmint ? '2px 0px 2px 15px' : '2px 18px 15px 18px'}
				borderLeft={`5px solid ${borderColor}`}
			>
				<Text
					variant='purple'
					fontSize='10px'
					fontWeight={500}
					lineHeight='16px'
				>
					STEP {props.step}
				</Text>
				{props.unmint && (
					<>
						<Box
							bg={
								colorMode === 'light'
									? 'brand.purple.910'
									: 'dark.focusGray'
							}
							px='7px'
							borderRadius='20px'
							w='fit-content'
						>
							<Text
								fontSize='10px'
								lineHeight='16px'
								fontWeight={500}
								variant='purpleDarkGradient'
							>
								ACTION ON ARBITRUM
							</Text>
						</Box>
						<Box
							bg={
								colorMode === 'light'
									? 'brand.purple.910'
									: 'dark.focusGray'
							}
							px='7px'
							borderRadius='20px'
							w='fit-content'
						>
							<Text
								fontSize='10px'
								lineHeight='16px'
								fontWeight={500}
								variant='purpleDarkGradient'
							>
								ACTION ON BITCOIN
							</Text>
						</Box>
					</>
				)}
				<Text fontSize='14px' lineHeight='16px' fontWeight={600}>
					{props.label}
				</Text>
				{props.children}
			</Stack>
		</Box>
	);
};

export default TimelineTemplate;
