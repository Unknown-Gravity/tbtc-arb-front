import {
	Box,
	Flex,
	Stack,
	Step,
	StepIcon,
	StepIndicator,
	Stepper,
	StepSeparator,
	StepStatus,
	Text,
} from '@chakra-ui/react';

type Props = {
	activeStep: number;
	steps: Array<{ title: string; description: string }>;
};

const Step3HeaderComponent = (props: Props) => {
	return (
		<Box mt={'20px'} w='458.46px'>
			<Stack gap='20px' mb='35px'>
				<Flex justifyContent='space-between'>
					<Text fontSize='14px'>
						<Text
							as={'span'}
							variant='purpleDarkGradient'
							fontWeight={600}
						>
							Minting
						</Text>{' '}
						- in progress...
					</Text>
					<Text fontSize='14px' fontWeight={400}>
						1.2tBTC
					</Text>
				</Flex>
				<Stepper
					w='100%'
					index={props.activeStep}
					gap='0'
					variant='progress'
					mx='auto'
					px='25px'
				>
					{props.steps.map((step, index) => (
						<Step key={index}>
							<StepIndicator>
								<StepStatus complete={<StepIcon />} />
								<StepStatus
									active={
										<Box
											bg='white'
											w='16px'
											h='16px'
											borderRadius='full'
										></Box>
									}
								/>
							</StepIndicator>
							<StepSeparator />
						</Step>
					))}
				</Stepper>
				<Flex justifyContent='space-between'>
					<Text
						w='74.35px'
						fontSize='12px'
						lineHeight='16px'
						textAlign='center'
					>
						Bitcoin checkpoint
					</Text>
					<Text
						w='74.35px'
						fontSize='12px'
						lineHeight='16px'
						textAlign='center'
					>
						Minting initialized
					</Text>
					<Text
						w='74.35px'
						fontSize='12px'
						lineHeight='16px'
						textAlign='center'
					>
						Minting Completed
					</Text>
				</Flex>
			</Stack>
		</Box>
	);
};

export default Step3HeaderComponent;
