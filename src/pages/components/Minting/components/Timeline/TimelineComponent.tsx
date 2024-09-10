import {
	Box,
	Link,
	Step,
	StepDescription,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
	useSteps,
} from '@chakra-ui/react';

/**
 * @name TimelineComponent
 *
 * @description This component displays the timeline of the minting process.
 *
 * @returns {JSX.Element}
 *
 */

const TimelineComponent = () => {
	const { activeStep } = useSteps({
		index: 1,
		count: 3,
	});
	return (
		<Box>
			<Text
				fontSize='16px'
				lineHeight='16px'
				fontWeight={600}
				mb='16.5px'
				px='20px'
			>
				TIMELINE
			</Text>
			<Stepper
				index={activeStep}
				orientation='vertical'
				minH='200px'
				gap='0'
				variant='minting'
			>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>
					<Box maxW='213px'>
						<StepTitle>
							<Text w='203px'>Provide a Deposit Address</Text>
						</StepTitle>
						<StepDescription>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address.{' '}
							<Link
								href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
								variant='purpleDarkGradient'
								isExternal
							>
								Read more
							</Link>
						</StepDescription>
					</Box>
					<StepSeparator />
				</Step>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>
					<Box maxW='213px'>
						<StepTitle>
							<Text w='203px'>Make a BTC Deposit</Text>
						</StepTitle>
					</Box>
					<StepSeparator />
				</Step>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber />}
							incomplete={<StepNumber />}
							active={<StepNumber />}
						/>
					</StepIndicator>
					<Box maxW='213px'>
						<StepTitle>
							<Text w='203px'>Initiate Minting</Text>
						</StepTitle>
					</Box>
					<StepSeparator />
				</Step>
			</Stepper>
		</Box>
	);
};

export default TimelineComponent;
