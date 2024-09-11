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
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { normalizeTbtcValue } from '../../../../../../utils/numberUtils';

type Props = {
	activeStep: number;
	steps: Array<{ title: string; description: string }>;
};

/**
 * @name Step3HeaderComponent
 *
 * @description This component is a reusable component that displays the header of the step 3 of the minting process.
 *
 * @param { number } activeStep - The active step
 * @param { Array<{ title: string; description: string }> } steps - The steps
 *
 */

const Step3HeaderComponent = ({ activeStep, steps }: Props) => {
	const rawValue = useSelector(
		(state: RootState) => state.deposit.utxo?.value,
	);
	const normalizedValue = rawValue && normalizeTbtcValue(rawValue);
	return (
		<Box
			mt={'40px'}
			w={{ base: '100%', xl: '458.46px' }}
			position='relative'
		>
			<Stack gap='20px' mb='35px' w='100%'>
				<Flex justifyContent='space-between' w='100%'>
					{activeStep !== 3 ? (
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
					) : (
						<Text variant='purpleDarkGradient' fontWeight={600}>
							Minted
						</Text>
					)}
					{normalizedValue && (
						<Text fontSize='14px' fontWeight={400}>
							{normalizedValue} TBTC
						</Text>
					)}
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
		</Box>
	);
};

export default Step3HeaderComponent;
