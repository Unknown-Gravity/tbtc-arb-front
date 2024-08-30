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

const StepLabel = ({ text }: { text: string }) => (
	<Text fontSize='12px' lineHeight='16px' textAlign='center'>
		{text}
	</Text>
);

const HeaderText = ({ children }: { children: React.ReactNode }) => (
	<Text fontSize='14px' lineHeight='28px'>
		{children}
	</Text>
);

const HeaderStep2UnmintingProcess = ({ activeStep, steps }: Props) => {
	return (
		<Box mt='20px' w={{ base: '100%', xl: '458.46px' }}>
			<Stack gap='20px' mb='35px'>
				<Flex justifyContent='space-between'>
					<HeaderText>
						<Text
							as='span'
							variant='purpleDarkGradient'
							fontWeight={600}
						>
							Unminting
						</Text>{' '}
						- in progress...
					</HeaderText>
					<Text fontSize='14px' lineHeight='28px' fontWeight={400}>
						1.2tBTC
					</Text>
				</Flex>

				<Stepper
					w='100%'
					index={activeStep}
					gap='0'
					variant='progress'
					mx='auto'
					px='25px'
				>
					{steps.map((step, index) => (
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
										/>
									}
								/>
							</StepIndicator>
							<StepSeparator />
						</Step>
					))}
				</Stepper>

				<Flex justifyContent='space-between'>
					<StepLabel text='tBTC unwrapped' />
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
					<StepLabel text='BTC Sent' />
				</Flex>
			</Stack>
		</Box>
	);
};

export default HeaderStep2UnmintingProcess;
