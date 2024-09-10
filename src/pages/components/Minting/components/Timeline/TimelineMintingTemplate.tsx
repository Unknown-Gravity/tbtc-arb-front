import { Box, Stack, Text, useColorMode, useTheme } from '@chakra-ui/react';

type Props = {
	step: number;
	label: string;
	children: any;
	unmint?: boolean;
};

/**
 * @name TimelineTemplate
 *
 * @description This component displays the timeline template.
 *
 * @param {number} step The step number.
 * @param {string} label The label of the step.
 * @param {any} children The children components.
 * @param {boolean} unmint The state of the minting.
 *
 * @returns {JSX.Element}
 */

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
