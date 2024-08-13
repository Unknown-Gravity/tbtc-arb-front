import { Box, Flex, useColorMode, useSteps } from '@chakra-ui/react';
import { useEffect, useState, useMemo } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { Deposit } from '@keep-network/tbtc-v2.ts';

type Props = { deposit: Deposit };

const Step3MintingProcess = ({ deposit }: Props) => {
	console.log('🚀 ~ Step3MintingProcess ~ deposit:', deposit.getReceipt());

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

	useEffect(() => {
		const intiateMinting = async () => {
			try {
				const txHash = await deposit.initiateMinting();
				console.log('🚀 ~ intiateMinting ~ txHash:', txHash);
			} catch (error) {
				console.log(error);
			}
		};
		intiateMinting();
	}, [deposit]);

	return (
		<Flex>
			<Box h={{ base: 'auto', xl: '555px' }}>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting
					isLoading={isLoading}
					initializedMint={initializedMint}
					msg={msg}
					finalizedMinting={finalizedMint}
				/>
			</Box>
		</Flex>
	);
};

export default Step3MintingProcess;
