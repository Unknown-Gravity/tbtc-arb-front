import { Box, Button, Link, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../types/RootState';
import CustomInput from '../../../../../components/CustomInput';
import { ChangeEvent, useState } from 'react';
import ModalUnmintComponent from './ModalUnmintComponent';

type Props = {
	onOpen: () => void;
	onClose: () => void;
	onClick: () => void;
	isOpen: boolean;
	isUnminting: boolean;
};

const initialValue = { amount: 0, btcRecoveryAddress: '' };

/**
 * @name Step1UnmintingProcess
 *
 * @description This component displays the first step of the unminting process.
 *
 * @param {() => void} onOpen The function to be called when the modal is opened.
 * @param {() => void} onClose The function to be called when the modal is closed.
 * @param {() => void} onClick Function that sets isMinting to true.
 * @param {boolean} isOpen The state of the modal.
 * @param {boolean} isUnminting The state of the unminting process.
 *
 * @returns {JSX.Element}
 */

const Step1UnmintingProcess = ({
	onOpen,
	onClose,
	onClick,
	isOpen,
	isUnminting,
}: Props) => {
	const balance = useSelector(
		(state: RootState) => state.account.tbtcBalance,
	);
	const [unmint, setUnmint] = useState(initialValue);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setUnmint({ ...unmint, [name]: value });
	};

	return (
		<Box w={{ base: '100%', xl: '448px' }} mx='auto'>
			<ModalUnmintComponent
				isOpen={isOpen}
				onClose={onClose}
				isUnminting={isUnminting}
				onClick={onClick}
			/>
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
					leftlabel='Amount'
					rightlabel={`Balance: ${balance}`}
					lefticon='true'
					name='amount'
					value={unmint.amount}
					onChange={handleChange}
				/>

				<CustomInput
					leftlabel='BTC Address'
					name='btcRecoveryAddress'
					onChange={handleChange}
					value={unmint.btcRecoveryAddress}
				/>

				<Button
					variant='purple'
					h='48px'
					w='100%'
					mt='26px'
					onClick={onOpen}
				>
					Unmint
				</Button>
				<Link variant='purpleDarkGradient' mt='26px' mx='auto'>
					Bridge Contract
				</Link>
			</Stack>
		</Box>
	);
};

export default Step1UnmintingProcess;
