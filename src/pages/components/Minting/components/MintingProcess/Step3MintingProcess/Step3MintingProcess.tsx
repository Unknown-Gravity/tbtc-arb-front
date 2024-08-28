import { Box, Flex, useSteps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { useSdk } from '../../../../../../context/SDKProvider';
import { checkDepositStatus } from '../../../../../../services/depositServices';
import { addStatus } from '../../../../../../redux/reducers/DepositReducer';
import { Deposit } from '@keep-network/tbtc-v2.ts';

type Props = { setStep: Dispatch<SetStateAction<number>> };

const initialMsg = {
	header: 'Waiting for the Bitcoin Network confirmations',
	body: 'Your Bitcoin deposit transaction requires 6 confirmations on the Bitcoin network before initiating the minting process.',
	transaction: {
		label: 'blockstream',
		link: 'link',
	},
};

const mintingMsg = {
	header: 'Initializing minting',
	body: 'A Minter is assessing the minting initialization. Minters are a small group of experts who monitor BTC deposits on the chain.',
	transaction: {
		label: 'etherScan',
		link: 'link',
	},
};

const finalizingMinting = {
	header: 'Minting in progress',
	body: 'The contract is minting your tBTC tokens.',
	transaction: {
		label: 'etherScan',
		link: 'link',
	},
};

const Step3MintingProcess = ({ setStep }: Props) => {
	const depositInfo = useSelector((state: RootState) => state.deposit);
	const [status, setStatus] = useState(depositInfo.status);
	const dispatch = useDispatch();

	const { sdk } = useSdk();

	const [msg, setMsg] = useState(initialMsg);

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
		const initiateMinting = async (deposit: Deposit) => {
			try {
				const fundingUxtos = await deposit?.detectFunding();
				if (fundingUxtos) {
					await deposit?.initiateMinting(fundingUxtos[0]);
				}
			} catch (error) {}
		};

		const changeStep = async () => {
			switch (status) {
				case 0:
					setActiveStep(1);
					setMsg(mintingMsg);
					break;
				case 1:
					setActiveStep(2);
					setMsg(finalizingMinting);
					break;
				case 2:
					setActiveStep(3);
					break;
			}
			const depositStatus = await checkDepositStatus(deposit, sdk);
			if (depositStatus !== status && depositStatus) {
				dispatch(addStatus(depositStatus));
				setStatus(depositStatus);
			}
		};
		initiateMinting(deposit);
		changeStep();
	}, [depositInfo, dispatch, sdk, setActiveStep, status]);

	return (
		<Flex>
			<Box h={{ base: 'auto', xl: '555px' }}>
				<Step3HeaderComponent activeStep={activeStep} steps={steps} />
				<ConfirmingMinting
					step={activeStep}
					msg={msg}
					setStep={setStep}
				/>
			</Box>
		</Flex>
	);
};

export default Step3MintingProcess;
