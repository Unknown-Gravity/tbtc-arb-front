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
	useColorMode,
	useSteps,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';

const steps = [
	{ title: 'First', description: 'Contact Info' },
	{ title: 'Second', description: 'Date & Time' },
	{ title: 'Third', description: 'Select Rooms' },
];

type Props = {};

const Step3MintingProcess = (props: Props) => {
	const { colorMode } = useColorMode();
	const [confirmations, setConfirmations]: [
		number,
		Dispatch<SetStateAction<number>>,
	] = useState(7);
	const { activeStep, setActiveStep } = useSteps({
		index: 1,
		count: steps.length,
	});

	return (
		<Box mt={'20px'} maxW='458.46px'>
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
			<ConfirmingMinting confirmations={confirmations} />
		</Box>
	);
};

export default Step3MintingProcess;
