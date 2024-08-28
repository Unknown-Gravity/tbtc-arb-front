import {
	Flex,
	Icon,
	Image,
	Link,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import { TbClockHour3Filled } from 'react-icons/tb';
import {
	DarkPurpleBitcoinIcon,
	DarkTransactionBoxImage,
	DarkYellowBitcoinIcon,
	LightPurpleBitcoinIcon,
	LightTransactionBoxImage,
	LightYellowBitcoinIcon,
} from '../../../../../../assets/images';
import { GoDotFill } from 'react-icons/go';
import { useEffect, useState } from 'react';

type Props = {
	btcTxHash?: string;
	arbitrumTxHash?: string;
	initializedEthTxHash?: string;
	finalizedEthTxHash?: string;
};

const TransactionHistory = (props: Props) => {
	const { colorMode } = useColorMode();
	const gradientColor = 'linear(to-r, #B62CFF,#7D00FF )';
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex(prevIndex => (prevIndex + 1) % 20);
		}, 100);

		return () => clearInterval(interval);
	}, []);

	const getColor = (index: number) => {
		return index === activeIndex
			? 'brand.purple.900'
			: colorMode === 'light'
			? 'light.superLightGray'
			: 'dark.focusGray';
	};

	return (
		<Stack spacing={0} w={'100%'}>
			<Stack gap='20px' w='100%'>
				<Text
					fontSize='14px'
					fontWeight={600}
					lineHeight='16px'
					letterSpacing='7.5%'
				>
					TRANSACTION HISTORY
				</Text>
				<Flex
					gap='4px'
					padding='4px 8px 4px 8px'
					borderRadius='100px'
					bgGradient={gradientColor}
					alignItems='center'
					w='fit-content'
				>
					<TbClockHour3Filled color='white' size='9.75px' />
					<Text
						color='white'
						fontSize='10px'
						fontWeight={500}
						lineHeight='12px'
					>
						~3 HOURS MINTING TIME
					</Text>
				</Flex>
			</Stack>
			<Stack mt='10px'>
				{props.btcTxHash && (
					<Text
						variant='gray'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						BTC confirmations{' '}
						<Link
							variant='purpleDarkGradient'
							href={`https://blockstream.info/testnet/tx/${props.btcTxHash}`}
							isExternal={true}
						>
							{' '}
							transactions
						</Link>
					</Text>
				)}
				{props.arbitrumTxHash && (
					<Text
						variant='gray'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						Reveal{' '}
						<Link
							variant='purpleDarkGradient'
							href={props.arbitrumTxHash}
						>
							{' '}
							transactions
						</Link>
					</Text>
				)}
				{props.initializedEthTxHash && (
					<Text
						variant='gray'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						Minting Initialized{' '}
						<Link
							variant='purpleDarkGradient'
							href={props.initializedEthTxHash}
						>
							{' '}
							transactions
						</Link>
					</Text>
				)}
				{props.finalizedEthTxHash && (
					<Text
						variant='gray'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						Minting finalized{' '}
						<Link
							variant='purpleDarkGradient'
							href={props.finalizedEthTxHash}
						>
							{' '}
							transactions
						</Link>
					</Text>
				)}
				<Flex alignItems='center' mt='50px'>
					<Image
						src={
							colorMode === 'light'
								? LightPurpleBitcoinIcon
								: DarkPurpleBitcoinIcon
						}
					/>
					<Icon
						as={GoDotFill}
						boxSize='32px'
						color={getColor(0)}
						transition='color 0.2s ease'
					/>
					<Icon
						as={GoDotFill}
						boxSize='32px'
						color={getColor(1)}
						transition='color 0.2s ease'
					/>
					<Icon
						as={GoDotFill}
						boxSize='32px'
						color={getColor(2)}
						transition='color 0.2s ease'
					/>
					<Image
						src={
							colorMode === 'light'
								? LightYellowBitcoinIcon
								: DarkYellowBitcoinIcon
						}
					/>
				</Flex>
				<Stack
					borderRadius='12px'
					gap='10px'
					padding='10px'
					bg={
						colorMode === 'light'
							? 'linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(121.21deg, #D987FF 3.33%, #7A00F8 95.81%)'
							: 'dark.focusGray'
					}
					boxShadow={
						colorMode === 'light'
							? 'none'
							: `0 0 0 1px ${borderColor}`
					}
					alignItems='center'
					mt='32px'
				>
					<Image
						src={
							colorMode === 'light'
								? LightTransactionBoxImage
								: DarkTransactionBoxImage
						}
						maxW='91px'
					/>
					<Text
						color='white'
						fontWeight={600}
						fontSize='18px'
						lineHeight='26px'
					>
						6/6 Bitcoin Confirmations Requirement
					</Text>
					<Text
						color='white'
						fontSize='14px'
						lineHeight='20px'
						fontWeight={400}
					>
						Six confirmations typically ensure transaction validity
						and finality.{' '}
						<Link
							variant='purpleDarkGradient'
							href='https://en.bitcoin.it/wiki/Confirmation'
							isExternal
						>
							Read more
						</Link>
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default TransactionHistory;
