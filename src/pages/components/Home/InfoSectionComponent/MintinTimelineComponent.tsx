import { Box, Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import {
	Step,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	useSteps,
} from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { UpRightIcon } from '../../../../assets/icons/UpRightIcon';

type Props = {};

const MintinTimelineComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const { activeStep } = useSteps({
		index: 1,
	});

	return (
		<CustomBox w='100%' fontSize='14px' h={{ xl: '993px' }} p='25px'>
			<Text fontSize='24px' fontWeight={700} lineHeight='16px' mb='16px'>
				Bridging duration
			</Text>

			<Stepper
				index={activeStep}
				orientation='vertical'
				gap={8}
				w={{ base: '100%', xl: '502px' }}
				variant='main'
			>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber>1</StepNumber>}
							incomplete={<StepNumber>1</StepNumber>}
							active={<StepNumber>1</StepNumber>}
						/>
					</StepIndicator>

					<Stack flexShrink='0' w='100%' maxW='470px'>
						<StepTitle>PROVIDE A DEPOSIT ADDRESS</StepTitle>
						<Text lineHeight='24px'>
							Provide an ETH address and a BTC Return address to
							generate a unique BTC deposit address.
						</Text>
						<Link variant='purpleDarkGradient'>
							Read More
							<UpRightIcon />
						</Link>
					</Stack>

					<StepSeparator />
				</Step>
				<Stack w='100%' gap='16px' fontSize='16px'>
					<Text
						mt={2}
						px={2}
						borderRadius='6px'
						bg={colorMode === 'light' ? 'light.lightGray' : 'none'}
						py={1}
						w='fit-content'
					>
						ETH Address
					</Text>
					<Text lineHeight='24px'>
						<Box
							color='brand.purple.900'
							display='inline-block'
							verticalAlign='middle'
							mr={2}
						>
							<BsFillArrowRightCircleFill
								style={{ minWidth: '16px' }}
							/>
						</Box>
						This is where your tBTC (ERC20) will be sent after
						minting initiation.
					</Text>
					<Text
						mt={2}
						px={2}
						borderRadius='6px'
						bg={colorMode === 'light' ? 'light.lightGray' : 'none'}
						py={1}
						w='fit-content'
					>
						Recovery BTC Address
					</Text>
					<Text lineHeight='24px'>
						<Box
							color='brand.purple.900'
							display='inline-block'
							verticalAlign='middle'
							mr={2}
						>
							<BsFillArrowRightCircleFill
								style={{ minWidth: '16px' }}
							/>
						</Box>
						Providing a BTC refund address means your bitcoin will
						be safe, even in the unlikely case of an error minting.{' '}
						<Link variant='purpleDarkGradient'>
							Read More
							<UpRightIcon />
						</Link>
					</Text>
					<Text lineHeight='24px'>
						<Box
							color='brand.purple.900'
							display='inline-block'
							verticalAlign='middle'
							mr={2}
						>
							<BsFillArrowRightCircleFill
								style={{ minWidth: '16px' }}
							/>
						</Box>
						Make sure you provide a single BTC recovery address that
						you control. Don't use a multi-sig or an exchange
						address. You can read more about the requirements and
						P2PKH.{' '}
						<Link variant='purpleDarkGradient'>
							Read More
							<UpRightIcon />
						</Link>
					</Text>
					<Text lineHeight='24px'>
						<Box
							color='brand.purple.900'
							display='inline-block'
							verticalAlign='middle'
							mr={2}
						>
							<BsFillArrowRightCircleFill
								style={{ minWidth: '16px' }}
							/>
						</Box>
						This address has to start with “1” or “bc1”for Bitcoin
						Mainnet and with “m”, “n” or “tb1” for Testnet Bitcoin.
						This means that your addresses are P2PKH or P2WPKH
						compliant.{' '}
						<Link variant='purpleDarkGradient'>
							Read More
							<UpRightIcon />
						</Link>
					</Text>
					<Text lineHeight='24px'>
						Based on these two addresses, the protocol will create a
						unique BTC deposit address using a P2SWH for each user.{' '}
						<Link variant='purpleDarkGradient'>
							Read More
							<UpRightIcon />
						</Link>
					</Text>
				</Stack>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber>2</StepNumber>}
							incomplete={<StepNumber>2</StepNumber>}
							active={<StepNumber>2</StepNumber>}
						/>
					</StepIndicator>

					<Stack w='100%' h='140px'>
						<StepTitle>Make a BTC deposit</StepTitle>
						<Text lineHeight='24px'>
							Send any amount larger than 0.01 BTC to this unique
							BTC Deposit Address. The amount sent will be used to
							mint tBTC.
						</Text>
					</Stack>
					<StepSeparator />
				</Step>
				<Step>
					<StepIndicator>
						<StepStatus
							complete={<StepNumber>3</StepNumber>}
							incomplete={<StepNumber>3</StepNumber>}
							active={<StepNumber>3</StepNumber>}
						/>
					</StepIndicator>
					<Stack w='100%' h='140px'>
						<StepTitle>Initiate minting</StepTitle>
						<Text lineHeight='24px'>
							Minting tBTC does not require you to wait for the
							Bitcoin confirmations. Sign an Ethereum transaction
							in your wallet and your tBTC will arrive in around 1
							to 3 hours.
						</Text>
					</Stack>
					<StepSeparator />
				</Step>
			</Stepper>
		</CustomBox>
	);
};

export default MintinTimelineComponent;
