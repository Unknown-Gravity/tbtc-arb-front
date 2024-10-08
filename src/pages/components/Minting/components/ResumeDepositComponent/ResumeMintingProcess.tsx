import { Dispatch, SetStateAction, useState } from 'react';
import HeaderStepsMintingComponent from '../MintingProcess/HeaderStepsMintingComponent';
import { Button, Flex, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import DragAndDropComponent from './DragAndDropComponent';
import { useSdk } from '../../../../../context/SDKProvider';
import { JsonData } from '../../../../../interfaces/JsonData.interface';
import { useDispatch } from 'react-redux';
import {
	addArbTxHash,
	addDeposit,
	addFinalizedEthTxHash,
	addInitializedEthTxHash,
	addStatus,
	addUtxo,
} from '../../../../../redux/reducers/DepositReducer';
import { getDepositInfo } from '../../../../../services/depositServices';
import { getDepositId, reverseString } from '../../../../../utils/utils';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	checkTransactionExist,
	getFinalizedTxHash,
	getInitializedTxHash,
} from '../../../../../services/tbtcServices';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import { extractBitcoinRawTxVectors } from '@keep-network/tbtc-v2.ts';

type Props = {
	setTabSelected: Dispatch<SetStateAction<number>>;
	setStep: Dispatch<SetStateAction<number>>;
};

const ResumeMintingProcess = ({ setTabSelected, setStep }: Props) => {
	const { address } = useWeb3ModalAccount();
	const { isConnected, chainId } = useWeb3ModalAccount();
	const [fileName, setFileName] = useState<string | null>(null);
	const [fileContent, setFileContent] = useState<JsonData>();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const { sdk } = useSdk();

	const isMainnet =
		isConnected &&
		chainId.toString() === process.env.REACT_APP_MAINNET_CHAINID;
	const handleClick = async () => {
		if (fileName !== null && fileContent && sdk) {
			setIsLoading(true);
			const deposit = await getDepositInfo(fileContent, sdk);
			const utxos = await deposit?.detectFunding();
			const { btcDepositAddress, btcRecoveryAddress, ethAddress } =
				fileContent;
			if (deposit && utxos) {
				dispatch(
					addDeposit(
						deposit,
						btcDepositAddress,
						btcRecoveryAddress,
						ethAddress,
					),
				);
				if (utxos.length === 0) {
					setStep(2);
				} else {
					dispatch(addUtxo(utxos[0]));
					const { transactionHash, outputIndex } = utxos[0];
					const fundingTxHash = reverseString(
						transactionHash.toString(),
					);
					const depositId = getDepositId(fundingTxHash, outputIndex);
					const status = await sdk
						.crossChainContracts('Arbitrum')
						?.l1BitcoinDepositor.getDepositState(depositId);

					if (status) {
						dispatch(addStatus(status));
					}

					const bitcoinRawTx =
						await sdk.bitcoinClient?.getRawTransaction(
							transactionHash,
						);

					const fundingTxVectors =
						extractBitcoinRawTxVectors(bitcoinRawTx);

					const arbitrumTx = await checkTransactionExist(
						isMainnet,
						fundingTxVectors,
						address,
					);
					dispatch(addArbTxHash(arbitrumTx?.hash));
					const initializedTx = await getInitializedTxHash(
						isMainnet,
						address,
						fundingTxVectors,
					);
					if (initializedTx !== null) {
						dispatch(addInitializedEthTxHash(initializedTx));
					}

					const finalizedTx = await getFinalizedTxHash(
						isMainnet,
						address,
						fundingTxVectors,
					);
					if (finalizedTx !== null) {
						dispatch(addFinalizedEthTxHash(finalizedTx));
					}

					setStep(3);
				}
			}
			setTabSelected(1);
		}
	};

	return (
		<Stack spacing='25px' w={{ base: '100%', xl: '456px' }}>
			<Flex alignItems='center' gap='9px' zIndex={10}>
				<ArrowBackIcon
					boxSize='24px'
					p='0.5px'
					transition='transform 0.1s'
					cursor='pointer'
					_hover={{ transform: 'scale(1.2)' }}
					_active={{ transform: 'scale(1)' }}
					onClick={() => setTabSelected(1)}
				/>

				<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
			</Flex>
			<Text fontSize='18px' lineHeight='28px' fontWeight={400}>
				<Text fontWeight={600} as='span' variant='purpleDarkGradient'>
					Resume minting
				</Text>{' '}
				- Upload .JSON file
			</Text>
			<Text variant='gray'>
				To resume your minting you need to upload your .JSON file and
				sign the Minting Initiation transaction triggered in the dApp.
			</Text>
			<DragAndDropComponent
				fileName={fileName}
				setFileName={setFileName}
				setFileContent={setFileContent}
			/>

			<Button
				variant='purple'
				onClick={handleClick}
				rightIcon={isLoading ? <Spinner /> : undefined}
			>
				Upload And Resume
			</Button>
			<Link
				variant='purpleDarkGradient'
				fontSize='14px'
				lineHeight='20px'
				textAlign='center'
			>
				Bridge contract
			</Link>
		</Stack>
	);
};

export default ResumeMintingProcess;
