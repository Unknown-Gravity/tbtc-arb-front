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
							<Text w='203px'>PROVIDE A DEPOSIT ADDRESS</Text>
						</StepTitle>
						<StepDescription>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address.{' '}
							<Link variant='purpleDarkGradient'>Read more</Link>
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
							<Text w='203px'>MAKE A BTC DEPOSIT</Text>
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
							<Text w='203px'>INITIATE MINTING</Text>
						</StepTitle>
					</Box>
					<StepSeparator />
				</Step>
			</Stepper>
		</Box>
	);
};

export default TimelineComponent;
