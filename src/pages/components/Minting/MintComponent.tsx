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
import MintingProcessComponent from './components/MintingProcessComponent';
import TimelineComponent from './components/Timeline/TimelineComponent';
import { ChangeEvent, useState } from 'react';
import Step1MintingProcess from './components/MintingProcess/Step1MintingProcess';
import TimeLineTemplate from './components/Timeline/TimelineMintingTemplate';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import { DarkStep1Timeline, LightStep1Timeline } from '../../../assets/images';
import { address } from 'bitcoinjs-lib';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ModalMinting from './components/ModalMinting';
import Step3MintingProcess from './components/MintingProcess/Step3MintingProcess/Step3MintingProcess';
import Step2MintingProcess from './components/MintingProcess/Step2MintingProcess/Step2MintingProcess';
import DividerCustom from '../../../components/DividerCustom';
import TransactionHistory from './components/MintingProcess/Step3MintingProcess/TransactionHistory';
import { useWeb3Modal } from '@web3modal/ethers/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';

type Props = {
	isConnected: boolean;
};

const MintComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const [step, setStep] = useState(1);
	const [btcAddress, setBtcAdress] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { open } = useWeb3Modal();
	const provider = useSelector((state: RootState) => state.account.provider);
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
	const chainId = provider?._network.chainId.toString();

	const handleClick = () => {
		if (btcAddress === '') {
			setErrorMsg('The recovery address can´t be empty');
		} else if (chainId === '421614') {
			try {
				address.toOutputScript(btcAddress);
				setStep(2); // If the address is valid, proceed to the next step
			} catch (error) {
				setErrorMsg('Invalid Bitcoin address');
			}
		} else {
			open({ view: 'Networks' });
		}
	};

	const changeBtcAdress = (event: ChangeEvent<HTMLInputElement>) => {
		if (errorMsg) {
			setErrorMsg('');
		}
		const { value } = event.target;
		setBtcAdress(value);
	};

	const goBack = () => {
		setStep(step - 1);
		onClose();
		setBtcAdress('');
	};

	return (
		<CustomBox
			p='26px'
			h={{ base: 'none', xl: step === 1 ? '634px' : 'fit-content' }}
			maxH={{
				base: 'none',
				xl: step === 1 || step === 3 ? '634px' : 'none',
			}}
		>
			<ModalMinting isOpen={isOpen} onClose={onClose} goBack={goBack} />

			<Flex w='100%' flexDirection={{ base: 'column', xl: 'row' }}>
				<Stack spacing={0} maxW={{ base: 'none', xl: '448px' }}>
					<Flex alignItems='center' gap='9px' zIndex={10}>
						{step === 2 && (
							<ArrowBackIcon
								boxSize='24px'
								p='0.5px'
								transition={'transform 0.1s'}
								cursor='pointer'
								_hover={{ transform: 'scale(1.2)' }}
								_active={{ transform: 'scale(1)' }}
								onClick={onOpen}
							/>
						)}
						<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
					</Flex>
					{!props.isConnected && <MintingProcessComponent />}
					{props.isConnected && step === 1 && (
						<Step1MintingProcess
							onClick={handleClick}
							onChange={changeBtcAdress}
							btcAddress={btcAddress}
							errorMsg={errorMsg}
						/>
					)}
					{props.isConnected && step === 2 && (
						<Step2MintingProcess
							onClick={setStep}
							btcAddress={btcAddress}
						/>
					)}

					{props.isConnected && step === 3 && <Step3MintingProcess />}
				</Stack>

				<DividerCustom />
				{!props.isConnected && <TimelineComponent />}
				{props.isConnected && step === 1 && (
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
							generate a unique BTC deposit address. <br />
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
				{props.isConnected && step === 2 && (
					<TimeLineTemplate step={2} label='MAKE A BTC DEPOSIT'>
						<Text fontSize='14px'>
							Send any amount lager than 0.01 BTC to this unique
							BTC Deposit Address. The amount sent will be used to
							mint tBTC.
						</Text>
					</TimeLineTemplate>
				)}
				{props.isConnected && step === 3 && (
					<TransactionHistory
						btcTxHash={btcTxHash}
						arbitrumTxHash={arbitrumTxHash}
						initializedEthTxHash={initializedEthTxHash}
						finalizedEthTxHash={finalizedEthTxHash}
					/>
				)}
			</Flex>
		</CustomBox>
	);
};

export default MintComponent;
