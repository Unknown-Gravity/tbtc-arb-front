import { Box, Divider, Flex, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import MintingProcessComponent from './components/MintingProcessComponent';
import {
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from '@chakra-ui/react';

type Props = {
	isConnected: boolean;
};

const MintComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const steps = [
		{ title: 'First', description: 'Contact Info' },
		{ title: 'Second', description: 'Date & Time' },
		{ title: 'Third', description: 'Select Rooms' },
	];
	const { activeStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	return (
		<CustomBox h='100%'>
			<Flex w='100%' gap='32px'>
				<MintingProcessComponent />

				<Box
					bg={colorMode === 'dark' ? 'white' : 'light.coolGray'}
					w='1px'
				></Box>
				<Box minW='235px'>
					<Stepper
						index={activeStep}
						orientation='vertical'
						minH='200px'
						gap='0'
					>
						{steps.map((step, index) => (
							<Step key={index}>
								<StepIndicator>
									<StepStatus
										complete={<StepNumber />}
										incomplete={<StepNumber />}
										active={<StepNumber />}
									/>
								</StepIndicator>

								<Box flexShrink='0'>
									<StepTitle>{step.title}</StepTitle>
									<StepDescription>
										{step.description}
									</StepDescription>
								</Box>

								<StepSeparator />
							</Step>
						))}
					</Stepper>
				</Box>
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
