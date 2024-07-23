import {
	Box,
	Flex,
	Stack,
	Text,
	useColorMode,
	useClipboard,
	useTheme,
	Icon,
} from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import QRCode from 'qrcode.react';
import { Dispatch, SetStateAction } from 'react';
import { InfoIcon } from '../../../../../assets/icons/InfoIcon';
import { CopyIcon } from '@chakra-ui/icons';
import { TbCopy } from 'react-icons/tb';
import ConfirmationsEstimatedComponents from './ConfirmationsEstimatedComponents';

type Props = {
	onClick: Dispatch<SetStateAction<number>>;
};

const Step2MintingProcess = (props: Props) => {
	const { address } = useWeb3ModalAccount();
	const { colorMode } = useColorMode();
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const iconColor = theme.colors.light.coolGray;
	const { onCopy } = useClipboard(
		'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
	);

	return (
		<Box w='448.28px' maxW='448.28px'>
			<Text fontSize='16px' lineHeight='28px' fontWeight={600} mt='24px'>
				<Text variant='purpleDarkGradient' as={'span'}>
					STEP 2{' '}
				</Text>
				- PROVIDE DATA
			</Text>
			<Text fontSize='14px' lineHeight='24px' mt='10px' variant='gray'>
				Use this generated address to send any amount larger than 0.01
				BTC, to mint as tBTC.{' '}
			</Text>
			<Text fontSize='14px' lineHeight='24px' mt='24px' variant='gray'>
				This address is a uniquely generated address based on the data
				you provided.{' '}
			</Text>

			<Stack
				bg={
					colorMode === 'dark' ? 'dark.background' : 'light.lightGray'
				}
				p='16px'
				borderRadius='14px'
				mt='20px'
				spacing='15px'
			>
				<Flex gap={2} alignItems='center'>
					<Text>BTC Deposit Address</Text>
					<InfoIcon />
				</Flex>
				<Box
					mx='auto'
					p='20px'
					bg='white'
					borderRadius='15px'
					border={`1px solid ${borderColor}`}
				>
					<QRCode value={address || ''} />
				</Box>
				<Flex
					bg={colorMode === 'dark' ? 'dark.secondaryGray' : 'white'}
					p='8px'
					borderRadius='8px'
					gap='10px'
					alignItems='center'
				>
					<Text
						fontSize='16px'
						lineHeight='24px'
						color={
							colorMode === 'light' ? 'brand.purple.900' : 'white'
						}
					>
						bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
					</Text>{' '}
					<Icon
						as={TbCopy}
						boxSize='17.25px'
						color={iconColor}
						transition='transform 0.1s'
						_hover={{ transform: 'scale(1.1)' }}
						_active={{ transform: 'scale(1)' }}
						cursor='pointer'
					/>
				</Flex>
			</Stack>
			<ConfirmationsEstimatedComponents />
		</Box>
	);
};

export default Step2MintingProcess;
