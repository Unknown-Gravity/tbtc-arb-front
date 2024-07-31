import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { BitcoinFilledIcon } from '../../../../../assets/icons/BitcoinFilledIcon';
import { useSelector } from 'react-redux';
import { stat } from 'fs';
import { RootState } from '../../../../../types/RootState';
import CustomInput from '../../../../../components/CustomInput';
import { ChangeEvent, useState } from 'react';

type Props = {};

const initialValue = { amount: 0, btcAddres: '' };

const Step1UnmintingProcess = (props: Props) => {
	const { colorMode } = useColorMode();
	const balance = useSelector((state: RootState) => state.account.balance);
	const [unmint, setUnmint] = useState(initialValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		console.log(name, value);
	};

	return (
		<Box w={{ base: '100%', xl: '448px' }} maxW='470px' mx='auto'>
			<Stack spacing='24px' mt='24px' w='100%'>
				<Text fontSize='16px' lineHeight='28px' fontWeight={600}>
					<Text variant='purpleDarkGradient' as={'span'}>
						STEP 1
					</Text>
					- UNMINT YOUR TBTC TOKENS
				</Text>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='24px'
					fontWeight={400}
				>
					Unminting requires one Ethereum transaction and it takes
					around 3-5 hours.
				</Text>
			</Stack>
			<Stack spacing='24px' mt='50.31px' w='100%'>
				<CustomInput
					leftLabel='Amount'
					rightLabel={`Balance: ${balance}`}
					name='amount'
					leftIcon
				/>

				<CustomInput leftLabel='BTC Address' name='btcAdress' />
				<Stack spacing='8px'>
					<Flex alignItems='center' gap={2}>
						<Text
							fontSize='16px'
							lineHeight='24px'
							fontWeight={600}
						>
							BTC Recovery Adress
						</Text>
					</Flex>
				</Stack>
				<Stack gap='10.37px'>
					<Button variant='purple' h='48px' w='100%'>
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

export default Step1UnmintingProcess;
