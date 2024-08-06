import { Box, Flex, useColorMode, useSteps } from '@chakra-ui/react';
import { useEffect, useState, useMemo } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';

type Props = {};

const Step3MintingProcess = (props: Props) => {
	const { colorMode } = useColorMode();
	const [confirmations, setConfirmations] = useState<number>(7);
	const [initializedMint, setInitializedMint] = useState<boolean>(true);
	const [finalizedMint, setFinalizedMint] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [msg, setMsg] = useState({
		header: 'Waiting for the Bitcoin Network confirmations',
		body: 'Your Bitcoin deposit transaction requires 6 confirmations on the Bitcoin network before initiating the minting process.',
		transaction: {
			label: 'blockstream',
			link: 'link',
		},
	});

	const steps = useMemo(
		() => [
			{ title: 'First', description: 'Contact Info' },
			{ title: 'Second', description: 'Date & Time' },
			{ title: 'Third', description: 'Select Rooms' },
		],
		[],
	);

	const { activeStep, setActiveStep } = useSteps({
		index: 2,
		count: steps.length,
	});

	useEffect(() => {
		if (confirmations >= 6 && !initializedMint && activeStep === 0) {
			setIsLoading(false);
			setMsg(prevMsg => ({
				...prevMsg,
				header: 'Confirmations completed',
			}));
			setTimeout(() => {
				setActiveStep(1);
			}, 2000);
		} else if (confirmations >= 6 && !initializedMint && activeStep === 1) {
			setIsLoading(true);
			setMsg(prevMsg => ({
				...prevMsg,
				header: 'Initializing minting',
				body: 'A Minter is assessing the minting initialization. Minters are a small group of experts who monitor BTC deposits on the chain.',
				transaction: {
					label: 'etherscan',
					link: 'ether',
				},
			}));
		} else if (confirmations >= 6 && initializedMint && activeStep === 1) {
			setIsLoading(false);
			setMsg(prevMsg => ({ ...prevMsg, header: 'Minting Initialized' }));
			setTimeout(() => {
				setActiveStep(2);
			}, 2000);
		} else if (confirmations >= 6 && !finalizedMint && activeStep === 2) {
			setIsLoading(true);
			setMsg(prevMsg => ({
				...prevMsg,
				header: 'Minting in progress',
				body: 'The contract is minting your tBTC tokens.',
			}));
		}
	}, [
		activeStep,
		confirmations,
		finalizedMint,
		initializedMint,
		setActiveStep,
	]);

	return (
		<Flex>
			<Box h={{ base: 'auto', xl: '555px' }}>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting
					isLoading={isLoading}
					confirmations={confirmations}
					msg={msg}
					finalizedMinting={finalizedMint}
				/>
			</Box>
		</Flex>
	);
};

export default Step3MintingProcess;
