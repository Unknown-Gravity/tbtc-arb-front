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

const Step2UnmintingProcess = (props: Props) => {
	return (
		<Box h={{ xl: props.isSent ? 'auto' : '558px' }}>
			<HeaderStep2UnmintingProcess
				activeStep={props.activeStep}
				steps={props.steps}
			/>
			{!props.isSent ? (
				<UnmintingInProgressComponent />
			) : (
				<UnmintingDoneComponent onClick={props.onClick} />
			)}
		</Box>
	);
};

export default Step2UnmintingProcess;
