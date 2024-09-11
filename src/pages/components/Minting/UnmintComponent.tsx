import {
	Box,
	Flex,
	Stack,
	Text,
	useDisclosure,
	useSteps,
} from '@chakra-ui/react';
import { Dispatch, useEffect, useMemo, useState } from 'react';
import { CustomBox } from '../../../components/CustomBox';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import MintingProcessComponent from './components/MintingProcessComponent';
import DurationComponent from './components/UnmintingProcess/DurationComponent';
import Step1UnmintingProcess from './components/UnmintingProcess/Step1UnmintingProcess';
import Step2UnmintingProcess from './components/UnmintingProcess/Step2UnmintingProcess';
import ElapsedTimeComponent from './components/UnmintingProcess/ElapsedTimeComponent';
import DividerCustom from '../../../components/DividerCustom';

type Props = {
	isConnected: boolean;
	setTabSelected: Dispatch<number>;
};

const initialValue = {
	step: 1,
	isUnminting: false,
	isConfirming: false,
	isSent: false,
};

/**
 * @name UnmintComponent
 *
 * @description This component displays the unminting process.
 *
 * @param {boolean} isConnected The state of the wallet connection.
 * @param {Dispatch<number>} setTabSelected The function to set the selected tab.
 *
 * @returns {JSX.Element}
 */

const UnmintComponent = ({ isConnected, setTabSelected }: Props) => {
	const [step, setStep] = useState(1);
	const { onOpen, isOpen, onClose } = useDisclosure();
	const [isUnminting, setIsUnminting] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [isSent, setIsSent] = useState(true);
	const [unmint, setUnmint] = useState(initialValue);

	//TODO hay que quitar tantos estados y poner solo uno el unmint

	const steps = useMemo(() => [{ step: '1' }, { step: '2' }], []);
	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});

	const handleNewMint = () => {
		setUnmint(initialValue);
		setTabSelected(1);
	};

	useEffect(() => {
		if (isConfirmed) {
			onClose();
			setIsUnminting(false);
			setStep(2);
		}
	}, [isConfirmed, onClose]);

	const handleClose = () => {
		if (isUnminting) setIsUnminting(false);
		onClose();
	};

	const handleOpen = () => {
		onOpen();
	};

	const handleClick = () => {
		if (!isUnminting) setIsUnminting(true);
	};

	const containerHeight = useMemo(
		() => (isSent && step === 2 ? 'fit-content' : '634px'),
		[isSent, step],
	);

	return (
		<CustomBox
			h={{ xl: containerHeight }}
			w='100%'
			p='26px'
			position='relative'
		>
			<Box
				h={{ xl: containerHeight }}
				w='100%'
				position='absolute'
				top={0}
				left={0}
				backdropFilter={'blur(10px); brightness(0.2)'}
				borderRadius='14px'
				zIndex={15}
				display='flex'
				justifyContent='center'
				alignItems='center'
			>
				<Text fontSize='50px' variant='purple'>
					SOON
				</Text>
			</Box>
			<Flex
				flexDirection={{ base: 'column', xl: 'row' }}
				h={{ base: 'auto', xl: '580px' }}
			>
				<Stack spacing={0} maxW={{ base: '100%', xl: '458px' }}>
					<HeaderStepsMintingComponent label='tBTC - UNMINTING PROCESS' />

					{!isConnected && <MintingProcessComponent />}
					{isConnected && step === 1 && (
						<Step1UnmintingProcess
							onOpen={handleOpen}
							isOpen={isOpen}
							onClose={handleClose}
							isUnminting={isUnminting}
							onClick={handleClick}
						/>
					)}
					{isConnected && step === 2 && (
						<Step2UnmintingProcess
							isSent={isSent}
							steps={steps}
							activeStep={activeStep}
							onClick={handleNewMint}
						/>
					)}
				</Stack>

				<DividerCustom />
				{!isConnected && <DurationComponent />}
				{isConnected && step === 1 && <DurationComponent />}
				{isConnected && step === 2 && (
					<ElapsedTimeComponent isSent={isSent} />
				)}
			</Flex>
		</CustomBox>
	);
};

export default UnmintComponent;
