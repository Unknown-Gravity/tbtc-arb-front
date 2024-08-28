import { Box, Flex, useSteps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { useSdk } from '../../../../../../context/SDKProvider';
import { Deposit } from '@keep-network/tbtc-v2.ts';
import { checkDepositStatus } from '../../../../../../services/depositServices';

type Props = {};

const Step3MintingProcess = () => {
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
		const deposit = depositInfo.deposit;
		if (!deposit || !sdk) {
			return;
		}
		const intiateMinting = async (deposit: Deposit) => {
			try {
				const fundingUxtos = await deposit?.detectFunding();
				if (fundingUxtos) {
					const txHash = await deposit?.initiateMinting(
						fundingUxtos[0],
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		const changeStep = async () => {
			const depositStatus = await checkDepositStatus(deposit, sdk);
			switch (depositStatus) {
				case 0:
					setActiveStep(1);
					break;
				case 1:
					setActiveStep(2);
					break;
				case 2:
					setActiveStep(3);
					break;
			}
		};
		changeStep();
	}, [depositInfo, sdk, setActiveStep]);

	return (
		<Flex>
			<Box h={{ base: 'auto', xl: '555px' }}>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting step={activeStep} msg={msg} />
			</Box>
		</Flex>
	);
};

export default Step3MintingProcess;
