import { Box, Flex, useSteps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ConfirmingMinting from './ConfirmingMinting';
import Step3HeaderComponent from './Step3HeaderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../types/RootState';
import { useSdk } from '../../../../../../context/SDKProvider';
import { checkDepositStatus } from '../../../../../../services/depositServices';
import {
	addArbTxHash,
	addStatus,
} from '../../../../../../redux/reducers/DepositReducer';
import { Deposit } from '@keep-network/tbtc-v2.ts';
import {
	getFundingTxVectors,
	handleCrossChainTransactions,
	setDepositStatus,
} from '../../../../../../services/tbtcServices';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

type Props = { setStep: Dispatch<SetStateAction<number>> };

const initialMsg = {
	header: 'Waiting for the initialization of the deposit',
	body: 'The deposit is being initialized. This process can take a few minutes.',
	transaction: {
		label: 'blockstream',
		link: 'https://blockstream.info/tx/',
	},
};

const mintingMsg = {
	header: 'Initializing minting',
	body: 'A Minter is assessing the minting initialization. Minters are a small group of experts who monitor BTC deposits on the chain.',
	transaction: {
		label: 'etherscan',
		link: 'https://etherscan.io/tx/',
	},
};

const finalizingMinting = {
	header: 'Minting in progress',
	body: 'The contract is minting your tBTC tokens.',
	transaction: {
		label: 'etherscan',
		link: 'https://etherscan.io/tx/',
	},
};

const Step3MintingProcess = ({ setStep }: Props) => {
	const depositInfo = useSelector((state: RootState) => state.deposit);
	// eslint-disable-next-line
	const [txHash, setTxHash] = useState(depositInfo.utxo?.transactionHash);
	const [status, setStatus] = useState(depositInfo.status);
	const { isConnected, chainId, address } = useWeb3ModalAccount();
	console.log('🚀 ~ Step3MintingProcess ~ address:', address);
	const isMainnet =
		isConnected && chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;

	const dispatch = useDispatch();

	const { sdk } = useSdk();

	const [msg, setMsg] = useState({
		...initialMsg,
		transaction: {
			...initialMsg.transaction,
			link: `${initialMsg.transaction.link}${txHash}`,
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
		if (!deposit || !sdk) return;
		const initiateMinting = async (deposit: Deposit) => {
			try {
				const fundingUxtos = await deposit?.detectFunding();
				if (fundingUxtos) {
					const arbTxHash = await deposit.initiateMinting(
						fundingUxtos[0],
					);
					dispatch(addArbTxHash(arbTxHash.toString()));
				}
			} catch (error) {
				console.error('Error initiating minting:', error);
			}
		};

		const checkDepositStep = async () => {
			try {
				const utxo = depositInfo.utxo;
				if (utxo) {
					const { transactionHash, outputIndex } = utxo;

					setDepositStatus(
						transactionHash,
						outputIndex,
						sdk,
						dispatch,
					);
					const fundingTxVectors = await getFundingTxVectors(
						transactionHash,
						sdk,
					);
					await handleCrossChainTransactions(
						fundingTxVectors,
						address,
						isMainnet,
						dispatch,
					);
				}
			} catch (error) {
				console.error('Error processing deposit:', error);
			}
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

		if (deposit && depositInfo.arbTxHash === null) {
			initiateMinting(deposit);
		}

		// Set up interval for checking deposit step
		const interval = setInterval(() => {
			checkDepositStep();
			changeStep();
		}, 30000);

		// Clear interval when component unmounts or dependencies change
		return () => clearInterval(interval);
	}, [depositInfo.deposit, sdk, depositInfo.finalizedEthTxHash, status, address, isMainnet, dispatch, setActiveStep]);

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
