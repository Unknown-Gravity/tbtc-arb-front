import {
	Flex,
	Image,
	Link,
	Stack,
	Text,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';
import { Deposit } from '@keep-network/tbtc-v2.ts';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import ModalMinting from './components/ModalMinting';
import Step1MintingProcess from './components/MintingProcess/Step1MintingProcess';
import Step2MintingProcess from './components/MintingProcess/Step2MintingProcess/Step2MintingProcess';
import Step3MintingProcess from './components/MintingProcess/Step3MintingProcess/Step3MintingProcess';
import MintingProcessComponent from './components/MintingProcessComponent';
import TimelineComponent from './components/Timeline/TimelineComponent';
import TimeLineTemplate from './components/Timeline/TimelineMintingTemplate';
import DividerCustom from '../../../components/DividerCustom';
import TransactionHistory from './components/MintingProcess/Step3MintingProcess/TransactionHistory';
import { DarkStep1Timeline, LightStep1Timeline } from '../../../assets/images';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useSdk } from '../../../context/SDKProvider';
import { downloadJson } from '../../../utils/jsonUtils';

type Props = {
	isConnected: boolean;
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	setTabSelected: Dispatch<SetStateAction<number>>;
};

const MintComponent = ({
	isConnected,
	step,
	setStep,
	setTabSelected,
}: Props) => {
	const { sdk } = useSdk();
	// Hooks de Estado
	const { colorMode } = useColorMode();
	const [btcRecoveryAddress, setBtcAdress] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [depositAddress, setDepositAdress] = useState('');
	const [initilizingDeposit, setInitializingDeposit] =
		useState<boolean>(false);
	const [deposit, setDeposit] = useState<Deposit | null>(null);

	// Hooks de Chakra y Web3
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { open } = useWeb3Modal();
	const { address } = useWeb3ModalAccount();
	const provider = useSelector((state: RootState) => state.account.provider);
	const chainId = provider?._network.chainId.toString();

	// Funciones Auxiliares
	const handleBtcAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
		setErrorMsg('');
		setBtcAdress(event.target.value);
	};

	const initializeDeposit = async () => {
		if (!btcRecoveryAddress) {
			setErrorMsg("The recovery address can't be empty");
			return;
		}

		if (chainId !== '421614') {
			open({ view: 'Networks' });
			return;
		}

		try {
			setInitializingDeposit(true);
			if (sdk) {
				const depositInstance =
					await sdk.deposits.initiateCrossChainDeposit(
						btcRecoveryAddress,
						'Arbitrum',
					);
				setInitializingDeposit(false);
				const btcAddress = await depositInstance.getBitcoinAddress();
				setDepositAdress(btcAddress);
				setDeposit(depositInstance);
				downloadJson(
					depositInstance.getReceipt(),
					btcRecoveryAddress,
					address,
				);
				setStep(2);
			}
		} catch (error) {
			setErrorMsg('Invalid Bitcoin address');
		} finally {
			setInitializingDeposit(false);
		}
	};

	const handleClickGenerateDepositAddress = async () => {
		await initializeDeposit();
		if (deposit) {
			downloadJson(deposit.getReceipt(), btcRecoveryAddress, address);
		}
	};

	const goBack = () => {
		setStep(prevStep => prevStep - 1);
		onClose();
		setBtcAdress('');
	};

	return (
		<CustomBox
			p='26px'
			h={{ base: 'none', xl: step === 1 ? '634px' : 'fit-content' }}
			zIndex={10}
		>
			<ModalMinting isOpen={isOpen} onClose={onClose} goBack={goBack} />

			<Flex w='100%' flexDirection={{ base: 'column', xl: 'row' }}>
				<Stack spacing={0} maxW={{ base: 'none', xl: '448px' }}>
					<Flex alignItems='center' gap='9px' zIndex={10}>
						{step === 2 && (
							<ArrowBackIcon
								boxSize='24px'
								p='0.5px'
								transition='transform 0.1s'
								cursor='pointer'
								_hover={{ transform: 'scale(1.2)' }}
								_active={{ transform: 'scale(1)' }}
								onClick={onOpen}
							/>
						)}
						<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
					</Flex>

					{!isConnected && <MintingProcessComponent />}
					{isConnected && step === 1 && (
						<Step1MintingProcess
							onClick={handleClickGenerateDepositAddress}
							onChange={handleBtcAddressChange}
							btcRecoveryAddress={btcRecoveryAddress}
							errorMsg={errorMsg}
							initializingDeposit={initilizingDeposit}
							setStep={setTabSelected}
						/>
					)}
					{isConnected && step === 2 && (
						<Step2MintingProcess
							onClick={setStep}
							deposit={deposit}
							btcDepositAddress={depositAddress}
							btcRecoveryAddress={btcRecoveryAddress}
						/>
					)}
					{isConnected && step === 3 && deposit && (
						<Step3MintingProcess deposit={deposit} />
					)}
				</Stack>

				<DividerCustom />
				{!isConnected && <TimelineComponent />}
				{isConnected && step === 1 && (
					<TimeLineTemplate
						label='PROVIDE A DEPOSIT ADDRESS'
						step={1}
					>
						<Text
							fontSize='14px'
							lineHeight='21px'
							fontWeight={400}
						>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address.
							<br />
							<Link as='span' variant='purpleDarkGradient'>
								Read More
							</Link>
						</Text>
						<Image
							src={
								colorMode === 'light'
									? LightStep1Timeline
									: DarkStep1Timeline
							}
						/>
					</TimeLineTemplate>
				)}
				{isConnected && step === 2 && (
					<TimeLineTemplate step={2} label='MAKE A BTC DEPOSIT'>
						<Text fontSize='14px'>
							Send any amount larger than 0.01 BTC to this unique
							BTC Deposit Address. The amount sent will be used to
							mint tBTC.
						</Text>
					</TimeLineTemplate>
				)}
				{isConnected && step === 3 && <TransactionHistory />}
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
