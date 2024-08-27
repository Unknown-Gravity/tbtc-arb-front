import { Box, Flex, useSteps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { useSdk } from '../../../../../../context/SDKProvider';

type Props = {};

const Step3MintingProcess = () => {
	const [initializedMint, setInitializedMint] = useState<boolean>(false);
	const [finalizedMint, setFinalizedMint] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const depositInfo = useSelector((state: RootState) => state.deposit);
	const { sdk } = useSdk();

	const [msg, setMsg] = useState({
		header: 'Waiting for the Bitcoin Network confirmations',
		body: 'Your Bitcoin deposit transaction requires 6 confirmations on the Bitcoin network before initiating the minting process.',
		transaction: {
			label: 'blockstream',
			link: 'link',
		},
	});

	const steps = [
		{ title: 'First', description: 'Contact Info' },
		{ title: 'Second', description: 'Date & Time' },
		{ title: 'Third', description: 'Select Rooms' },
	];

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});

	useEffect(() => {
		const intiateMinting = async () => {
			try {
				const deposit = depositInfo.deposit;
				const fundingUxtos = await deposit?.detectFunding();
				if (fundingUxtos) {
					const { outputIndex, transactionHash } = fundingUxtos[0];
					const depositState =
						await sdk?.tbtcContracts.bridge.deposits(
							transactionHash,
							outputIndex,
						);
					console.log(
						'🚀 ~ intiateMinting ~ depositState:',
						depositState,
					);

					const txHash = await deposit?.initiateMinting(
						fundingUxtos[0],
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		intiateMinting();
	}, [depositInfo]);

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
