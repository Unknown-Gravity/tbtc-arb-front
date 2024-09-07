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
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { useDispatch } from 'react-redux';
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
import {
	addDeposit,
	eraseDeposit,
} from '../../../redux/reducers/DepositReducer';
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
	const { colorMode } = useColorMode();
	const [btcRecoveryAddress, setBtcAdress] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [depositAddress, setDepositAdress] = useState('');
	const [initializingDeposit, setInitializingDeposit] =
		useState<boolean>(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { address } = useWeb3ModalAccount();

	const dispatch = useDispatch();

	const handleBtcAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
		setErrorMsg('');
		setBtcAdress(event.target.value);
	};

	const initializeDeposit = async () => {
		if (!btcRecoveryAddress) {
			setErrorMsg("The recovery address can't be empty");
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
				const btcDepositAddress =
					await depositInstance.getBitcoinAddress();
				setDepositAdress(btcDepositAddress);

				downloadJson(
					depositInstance.getReceipt(),
					btcDepositAddress,
					btcRecoveryAddress,
					address,
				);
				const ethAddress = address;
				dispatch(
					addDeposit(
						depositInstance,
						btcDepositAddress,
						btcRecoveryAddress,
						ethAddress,
					),
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
	};

	const goBack = () => {
		dispatch(eraseDeposit());
		setStep(1);
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
							initializingDeposit={initializingDeposit}
							setStep={setStep}
							setTabSelected={setTabSelected}
						/>
					)}
					{isConnected && step === 2 && (
						<Step2MintingProcess
							onClick={setStep}
							btcDepositAddress={depositAddress}
							btcRecoveryAddress={btcRecoveryAddress}
						/>
					)}
					{isConnected && step === 3 && (
						<Step3MintingProcess setStep={setStep} />
					)}
				</Stack>

				<DividerCustom />
				{!isConnected && <TimelineComponent />}
				{isConnected && step === 1 && (
					<TimeLineTemplate
						label='Provide a Deposit Address'
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
							<Link
								href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
								variant='purpleDarkGradient'
								isExternal
							>
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
					<TimeLineTemplate step={2} label='Make a BTC Deposit'>
						<Text fontSize='14px'>
							Send any amount of 0.01 BTC or larger to this unique
							BTC BTC Deposit Address. The amount sent will be
							used to mint tBTC.
						</Text>
					</TimeLineTemplate>
				)}
				{isConnected && step === 3 && <TransactionHistory />}
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
