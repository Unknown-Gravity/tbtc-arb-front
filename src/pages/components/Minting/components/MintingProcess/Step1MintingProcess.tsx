import {
	Box,
	Button,
	Flex,
	Input,
	Stack,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { InfoIcon } from '../../../../../assets/icons/InfoIcon';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';

type Props = {
	onClick: () => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	btcAddress: string;
	errorMsg: string;
};

const Step1MintingProcess = (props: Props) => {
	const { address } = useWeb3ModalAccount();

	return (
		<Box h={{ base: 'auto', xl: '555px' }} zIndex={10}>
			<Stack spacing='24px' mt='24px'>
				<Text fontSize='16px' lineHeight='28px' fontWeight={600}>
					<Text variant='purpleDarkGradient' as={'span'}>
						STEP 1
					</Text>
					- PROVIDE DATA
				</Text>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='24px'
					fontWeight={400}
				>
					Based on these two addresses, the system will generate for
					you an unique BTC deposit address. There is no minting
					limit.
				</Text>
			</Stack>
			<Stack spacing='24px' mt='50.31px'>
				<Stack spacing='8px'>
					<Flex alignItems='center' gap={2}>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontWeight={600}
						>
							ETH Address
						</Text>
						<Tooltip
							hasArrow
							borderRadius='5px'
							p='10px'
							placement='top'
							bg={'white'}
							color='light.primaryGray'
							label="ETH address is prepopulated with your wallet address. This is the address where you'll receive your tBTC."
						>
							<InfoIcon />
						</Tooltip>
					</Flex>
					<Input
						name='ArbitrumAdress'
						value={address ? address : 'Loading...'}
					/>
				</Stack>
				<Stack spacing='8px'>
					<Flex alignItems='center' gap={2}>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontWeight={600}
						>
							BTC Recovery Adress
						</Text>
						<Tooltip
							hasArrow
							borderRadius='5px'
							p='10px'
							placement='top'
							bg={'white'}
							color='light.primaryGray'
							label='This address needs to start with “1” or “bc1”. Return Address is a BTC address where your BTC funds are sent back if something exceptional happens with your deposit. A Return Address cannot be a multi-sig or an exchange address. Funds claiming is done by using the JSON file'
						>
							<InfoIcon />
						</Tooltip>
					</Flex>
					<Input
						name='BTCAdress'
						value={props.btcAddress}
						onChange={props.onChange}
					/>
					{props.errorMsg !== '' && (
						<Text color='red'>{props.errorMsg}</Text>
					)}
				</Stack>
				<Stack gap='10.37px'>
					<Button variant='purple' h='48px' onClick={props.onClick}>
						Generate Deposit Adress
					</Button>
					<Button variant='purpleOutlined' h='48px'>
						Resume Deposit
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Step1MintingProcess;
