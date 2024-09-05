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
