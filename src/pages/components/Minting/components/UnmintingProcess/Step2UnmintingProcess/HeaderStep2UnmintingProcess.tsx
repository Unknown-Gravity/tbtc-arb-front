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
	steps: Array<{ step: string }>;
};
const HeaderStep2UnmintingProcess = (props: Props) => {
	return (
		<Box mt={'20px'} w={{ base: '100%', xl: '458.46px' }}>
			<Stack gap='20px' mb='35px'>
				<Flex justifyContent='space-between'>
					<Text fontSize='14px' lineHeight='28px'>
						<Text
							as={'span'}
							variant='purpleDarkGradient'
							fontWeight={600}
						>
							Unminting
						</Text>{' '}
						- in progress...
					</Text>
					<Text fontSize='14px' fontWeight={400} lineHeight='28px'>
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
						tBTC unwrapped
					</Text>
					<Text
						fontSize='10px'
						lineHeight='12px'
						textAlign='center'
						fontWeight={500}
						letterSpacing='0.075em'
						variant='purpleDarkGradient'
						transform='translateY(-25px)'
					>
						USUAL DURATION ~ 3-5 HOURS
					</Text>
					<Text fontSize='12px' lineHeight='16px' textAlign='center'>
						BTC Sent
					</Text>
				</Flex>
			</Stack>
		</Box>
	);
};

export default HeaderStep2UnmintingProcess;
