import { Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import { Stepper, useSteps } from '@chakra-ui/react';
import { UpRightIcon } from '../../../../assets/icons/UpRightIcon';
import BulletPoint from './BulletPoint';
import StepContent from './StepContent';

/**
 * @name MintingTimelineComponent
 *
 * @description This component is a reusable component that displays the minting timeline for the user.
 *
 * @returns { JSX.Element }
 */

const MintingTimelineComponent = () => {
	const { colorMode } = useColorMode();
	const { activeStep } = useSteps({ index: 1 });

	const addressBoxStyle = {
		mt: 2,
		px: 2,
		borderRadius: '6px',
		bg: colorMode === 'light' ? 'light.lightGray' : 'none',
		py: 1,
		w: 'fit-content',
	};

	return (
		<CustomBox w='100%' fontSize='14px' h={{ xl: '1360px' }} p='25px'>
			<Text fontSize='24px' fontWeight={700} lineHeight='16px' mb='16px'>
				Bridging Duration
			</Text>

			<Stepper
				index={activeStep}
				orientation='vertical'
				gap={8}
				w={{ base: '100%', xl: '502px' }}
				variant='main'
			>
				<StepContent stepNumber={1} title='Provide a Deposit Address'>
					<Text lineHeight='24px'>
						Provide an ETH address and a BTC Return address to
						generate a unique BTC deposit address.
					</Text>
					<Link
						href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
						variant='purpleDarkGradient'
						isExternal
					>
						Read More
						<UpRightIcon />
					</Link>
				</StepContent>

				<Stack w='100%' gap='35px' fontSize='16px'>
					<Text {...addressBoxStyle}>ETH Address</Text>
					<BulletPoint>
						This is where your tBTC (ERC20) will be sent after
						minting initiation.
					</BulletPoint>

					<Text {...addressBoxStyle}>Recovery BTC Address</Text>
					<BulletPoint>
						Providing a BTC refund address means your bitcoin will
						be safe, even in the unlikely case of an error minting.{' '}
						<Link
							href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
							variant='purpleDarkGradient'
							isExternal
						>
							Read More
							<UpRightIcon />
						</Link>
					</BulletPoint>
					<BulletPoint>
						Make sure you provide a single BTC recovery address that
						you control. Don't use a multi-sig or an exchange
						address. You can read more about the requirements and
						P2PKH.{' '}
						<Link
							href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
							variant='purpleDarkGradient'
							isExternal
						>
							Read More
							<UpRightIcon />
						</Link>
					</BulletPoint>
					<BulletPoint>
						This address has to start with “1” or “bc1” for Bitcoin
						Mainnet and with “m”, “n” or “tb1” for Testnet Bitcoin.
						This means that your addresses are P2PKH or P2WPKH
						compliant.{' '}
						<Link
							href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
							variant='purpleDarkGradient'
							isExternal
						>
							Read More
							<UpRightIcon />
						</Link>
					</BulletPoint>
					<BulletPoint>
						Based on these two addresses, the protocol will create a
						unique BTC deposit address using a P2SWH for each user.{' '}
						<Link
							href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
							variant='purpleDarkGradient'
							isExternal
						>
							Read More
							<UpRightIcon />
						</Link>
					</BulletPoint>
					<BulletPoint>
						At the time of deposit finalization, 0.001 tBTC is
						subtracted from the deposited amount on mainnet. This is
						because the contract accounts for the deposit max fee
						value to process the bridge interaction
					</BulletPoint>
				</Stack>

				<StepContent stepNumber={2} title='Make a BTC Deposit'>
					Send any amount larger than 0.01 BTC to this unique BTC
					Deposit Address. The amount sent will be used to mint tBTC.
				</StepContent>

				<StepContent stepNumber={3} title='Initiate Minting'>
					Minting tBTC does not require you to wait for the Bitcoin
					confirmations. Sign an Ethereum transaction in your wallet
					and your tBTC will arrive in around 1 to 3 hours.
				</StepContent>
			</Stepper>
		</CustomBox>
	);
};

export default MintingTimelineComponent;
