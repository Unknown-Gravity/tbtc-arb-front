import UnmintingInProgressComponent from './Step2UnmintingProcess/UnmintingInProgressComponent';
import { Box } from '@chakra-ui/react';
import HeaderStep2UnmintingProcess from './Step2UnmintingProcess/HeaderStep2UnmintingProcess';
import UnmintingDoneComponent from './Step2UnmintingProcess/UnmintingDoneComponent';

type Props = {
	isSent: boolean;
	steps: Array<{ step: string }>;
	activeStep: number;
	onClick: () => void;
};

/**
 * @name Step2UnmintingProcess
 *
 * @description This component displays the second step of the unminting process.
 *
 * @param {boolean} isSent The state of the unminting process.
 * @param {Array<{ step: string }>} steps The steps of the process.
 * @param {number} activeStep The active step of the process.
 * @param {() => void} onClick The function that generate a new unmint. It sets the step to 1 and
 *
 * @returns {JSX.Element}
 */

const Step2UnmintingProcess = ({
	isSent,
	steps,
	activeStep,
	onClick,
}: Props) => {
	return (
		<Box h={{ xl: isSent ? 'auto' : '558px' }}>
			<HeaderStep2UnmintingProcess
				activeStep={activeStep}
				steps={steps}
			/>
			{!isSent ? (
				<UnmintingInProgressComponent />
			) : (
				<UnmintingDoneComponent onClick={onClick} />
			)}
		</Box>
	);
};

export default Step2UnmintingProcess;
