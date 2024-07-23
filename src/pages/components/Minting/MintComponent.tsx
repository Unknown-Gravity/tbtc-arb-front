import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import MintingProcessComponent from './components/MintingProcess/MintingProcessComponent';
import TimelineComponent from './components/Timeline/TimelineComponent';
import { useState } from 'react';
import Step1MintingProcess from './components/MintingProcess/Step1MintingProcess';
import Step1Timeline from './components/Timeline/Step1Timeline';
import Step2MintingProcess from './components/MintingProcess/Step2MintingProcess';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';

type Props = {
	isConnected: boolean;
};

const MintComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const [step, setStep] = useState(1);

	return (
		<CustomBox h='100%' maxH='820px' p='25px'>
			<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
			<Flex w='100%' h='100%'>
				{!props.isConnected && <MintingProcessComponent />}
				{props.isConnected && step === 1 && (
					<Step1MintingProcess onClick={setStep} />
				)}
				{props.isConnected && step === 2 && (
					<Step2MintingProcess onClick={setStep} />
				)}

				<Box
					bg={colorMode === 'dark' ? 'white' : 'light.coolGray'}
					w='1px'
					ml='32px'
					mr='22px'
				></Box>
				{!props.isConnected && <TimelineComponent />}
				{props.isConnected && step === 1 && <Step1Timeline />}
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
