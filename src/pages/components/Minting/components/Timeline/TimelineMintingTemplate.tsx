import { Box, Stack, Text, useColorMode, useTheme } from '@chakra-ui/react';

type Props = {
	step: number;
	label: string;
	children: any;
	unmint?: boolean;
};

const TimelineTemplate = ({ step, label, children, unmint }: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const { colorMode } = useColorMode();
	return (
		<Box maxW={{ base: 'none', xl: '235px' }}>
			<Text
				fontSize='16px'
				lineHeight='16px'
				fontWeight={600}
				mb='15px'
				px={unmint ? 0 : '20px'}
			>
				TIMELINE
			</Text>
			<Stack
				spacing='15px'
				p={unmint ? '2px 0px 2px 15px' : '2px 18px 15px 18px'}
				borderLeft={`5px solid ${borderColor}`}
			>
				<Text
					variant='purple'
					fontSize='10px'
					fontWeight={500}
					lineHeight='16px'
				>
					STEP {step}
				</Text>
				{unmint && (
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
					{label}
				</Text>
				{children}
			</Stack>
		</Box>
	);
};

export default TimelineTemplate;
