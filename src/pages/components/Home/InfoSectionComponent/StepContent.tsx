import {
	Stack,
	Step,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	stepNumber: number;
	title: string;
	children: ReactNode;
};

/**
 *
 * @name StepContent
 *
 * @description This component is a reusable component that displays the content of the step.
 *
 * @param { number } stepNumber - The step number.
 * @param { string } title - The title of the step.
 * @param { ReactNode } children - The children of the component.
 *
 * @returns { JSX.Element }
 */

const StepContent = ({ stepNumber, title, children }: Props) => {
	return (
		<Step>
			<StepIndicator>
				<StepStatus
					complete={<StepNumber>{stepNumber}</StepNumber>}
					incomplete={<StepNumber>{stepNumber}</StepNumber>}
					active={<StepNumber>{stepNumber}</StepNumber>}
				/>
			</StepIndicator>
			<Stack w='100%' h='140px'>
				<StepTitle>{title}</StepTitle>
				<Text lineHeight='24px'>{children}</Text>
			</Stack>
			<StepSeparator />
		</Step>
	);
};

export default StepContent;
