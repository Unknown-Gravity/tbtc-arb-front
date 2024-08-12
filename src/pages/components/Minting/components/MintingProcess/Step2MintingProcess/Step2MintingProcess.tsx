import {
	Box,
	Flex,
	Stack,
	Text,
	useColorMode,
	useClipboard,
	useTheme,
	Icon,
	Divider,
	Button,
	Spinner,
	Link,
} from '@chakra-ui/react';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import QRCode from 'qrcode.react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { InfoIcon } from '../../../../../../assets/icons/InfoIcon';
import { TbCopy } from 'react-icons/tb';
import ConfirmationsEstimatedComponents from './ConfirmationsEstimatedComponents';
import { formatAddress } from '../../../../../../utils/utils';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { getSDK } from '../../../../../../services/intiateSDK';
import { downloadJson } from '../../../../../../utils/jsonUtils';

type Props = {
	onClick: Dispatch<SetStateAction<number>>;
	btcAddress: string;
};

const cardsInfo = [
	{
		time: 1,
		confirmations: 1,
		btc: '< 0.10',
	},
	{
		time: 2,
		confirmations: 3,
		btc: '< 1.00',
	},
	{
		time: 1,
		confirmations: 6,
		btc: '≥ 1.00',
	},
];

const Step2ProvideDataComponent = (props: Props) => {
	const { address } = useWeb3ModalAccount();
	const { colorMode } = useColorMode();
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const iconColor = theme.colors.light.coolGray;
	const [depositAddress, setDepositAdress] = useState('');
	const sdk = getSDK();
	const { onCopy: onCopyDepositAddress } = useClipboard(depositAddress);
	const { onCopy: onCopyEthAddress } = useClipboard(address || '');
	const { onCopy: onCopyBtcAddress } = useClipboard(props.btcAddress);

	useEffect(() => {
		const getDepositAddress = async () => {
			const deposit = await sdk.deposits.initiateDeposit(
				props.btcAddress,
			);
			console.log(
				'🚀 ~ getDepositAddress ~ deposit:',
				deposit.getReceipt().refundLocktime.toPrefixedString(),
			);
			const btcDepositAddress = await deposit.getBitcoinAddress();
			setDepositAdress(btcDepositAddress);
			downloadJson(
				deposit.getReceipt(),
				depositAddress,
				deposit.getReceipt().depositor.identifierHex.toString(),
			);
		};
		getDepositAddress();
	}, [props.btcAddress, sdk.deposits]);

	return (
		<Box maxW={{ xl: '448.28px' }}>
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
					h='170px'
					w='170px'
					borderRadius='15px'
					border={`1px solid ${borderColor}`}
				>
					{depositAddress && <QRCode value={depositAddress} />}
				</Box>
				{depositAddress ? (
					<Flex
						bg={
							colorMode === 'dark'
								? 'dark.secondaryGray'
								: 'white'
						}
						p='8px'
						borderRadius='8px'
						gap='10px'
						alignItems='center'
					>
						<Text
							fontSize='16px'
							lineHeight='24px'
							color={
								colorMode === 'light'
									? 'brand.purple.900'
									: 'white'
							}
							maxW='363.8px'
							whiteSpace='nowrap'
							overflow='hidden'
							textOverflow='ellipsis'
						>
							{depositAddress}
						</Text>

						<Icon
							as={TbCopy}
							boxSize='24px'
							color={iconColor}
							transition='transform 0.1s'
							_hover={{ transform: 'scale(1.1)' }}
							_active={{ transform: 'scale(1)' }}
							cursor='pointer'
							onClick={onCopyDepositAddress}
						/>
					</Flex>
				) : (
					<Spinner
						h='40px'
						w='40px'
						color='brand.purple.900'
						mx='auto'
					/>
				)}
			</Stack>
			<Stack gap='20px' mt='10px'>
				<Flex
					justifyContent='space-between'
					flexDir={{ base: 'column', lg: 'row' }}
					alignItems={{ base: 'center', xl: 'flex-start' }}
				>
					{cardsInfo.map((card, index) => {
						return (
							<ConfirmationsEstimatedComponents
								key={index}
								time={card.time}
								confirmations={card.confirmations}
								btc={card.btc}
							/>
						);
					})}
				</Flex>
				<Text variant='gray2' fontWeight={400} lineHeight='24px'>
					Provided Addresses Recap
				</Text>
				<Flex justifyContent='space-between'>
					<Box
						bg={
							colorMode === 'light'
								? 'brand.purple.100'
								: 'dark.focusGray'
						}
						padding='4px 8px 4px 8px'
						borderRadius='4px'
					>
						<Text
							variant='darkPurpleGradient'
							fontSize='14px'
							lineHeight='20px'
						>
							Arbitrum Address
						</Text>
					</Box>
					<Flex gap='9px'>
						<Link
							variant='grayPurple'
							href={`${process.env.REACT_APP_ARB_EXPLORER}${address}`}
							isExternal={true}
						>
							{formatAddress(address)}
						</Link>
						<Icon
							as={TbCopy}
							boxSize='24px'
							color={iconColor}
							transition='transform 0.1s'
							_hover={{ transform: 'scale(1.1)' }}
							_active={{ transform: 'scale(1)' }}
							cursor='pointer'
							onClick={onCopyEthAddress}
						/>
					</Flex>
				</Flex>
				<Flex justifyContent='space-between'>
					<Box
						bg={
							colorMode === 'light'
								? 'brand.purple.100'
								: 'dark.focusGray'
						}
						padding='4px 8px 4px 8px'
						borderRadius='4px'
					>
						<Text
							variant='darkPurpleGradient'
							fontSize='14px'
							lineHeight='20px'
						>
							BTC Recovery Address
						</Text>
					</Box>
					<Flex gap='9px'>
						<Link
							variant='grayPurple'
							href={`${process.env.REACT_APP_BTC_EXPLORER}${props.btcAddress}`}
							isExternal={true}
						>
							{formatAddress(props.btcAddress)}
						</Link>
						<Icon
							as={TbCopy}
							boxSize='24px'
							color={iconColor}
							transition='transform 0.1s'
							_hover={{ transform: 'scale(1.1)' }}
							_active={{ transform: 'scale(1)' }}
							cursor='pointer'
							onClick={onCopyBtcAddress}
						/>
					</Flex>
				</Flex>
				<Divider borderColor='light.coolGray' />
				<Flex color='brand.purple.900' gap='9px' alignItems='center'>
					<Box>
						<BsFillArrowRightCircleFill size='15px' />
					</Box>
					<Text variant='gray' fontSize='14px' lineHeight='24px'>
						Send the funds and come back to this dApp. You do not
						need to wait for the BTC transaction to be mined.
					</Text>
				</Flex>
				<Button
					variant='purple'
					h='48px'
					fontSize='18px'
					onClick={() => props.onClick(3)}
				>
					I sent the BTC
				</Button>
			</Stack>
		</Box>
	);
};

export default Step2ProvideDataComponent;
