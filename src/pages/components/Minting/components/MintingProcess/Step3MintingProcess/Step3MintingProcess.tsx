import { Box, Flex, useColorMode, useSteps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import TransactionHistory from './TransactionHistory';

type Props = {};

const Step3MintingProcess = (props: Props) => {
	const { colorMode } = useColorMode();
	const [confirmations, setConfirmations] = useState<number>(3);
	const [initializedMint, setInitializedMint] = useState<boolean>(false);
	const [finalizedMint, setFinalizedMint] = useState<boolean>(false);
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
		index: 0,
		count: steps.length,
	});

	const [btcTxHash, setTxHash] = useState<string | undefined>('A');
	const [arbitrumTxHash, setArbitrumTxHash] = useState<string | undefined>(
		'A',
	);
	const [initializedEthTxHash, setInitializedEthTxHash] = useState<
		string | undefined
	>(undefined);
	const [finalizedEthTxHash, setFinalizedEthTxHash] = useState<
		string | undefined
	>(undefined);

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
			<Box>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting
					isLoading={isLoading}
					confirmations={confirmations}
					msg={msg}
					finalizedMinting={finalizedMint}
				/>
			</Box>
			<Box
				bg={colorMode === 'dark' ? 'white' : 'light.coolGray'}
				alignSelf='start'
				h={{ base: '1px', xl: '584px' }}
				w={{ base: '100%', xl: '1px' }}
				mx='22px'
			></Box>
			<TransactionHistory
				btcTxHash={btcTxHash}
				arbitrumTxHash={arbitrumTxHash}
				initializedEthTxHash={initializedEthTxHash}
				finalizedEthTxHash={finalizedEthTxHash}
			/>
		</Flex>
	);
};

export default Step3MintingProcess;
