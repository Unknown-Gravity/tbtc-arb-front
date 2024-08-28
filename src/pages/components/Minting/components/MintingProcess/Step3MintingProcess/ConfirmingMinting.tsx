import {
	Box,
	Button,
	Flex,
	Link,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { IoCheckmark } from 'react-icons/io5';
import CustomSpinner from '../../../../../../components/CustomSpinner';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { eraseDeposit } from '../../../../../../redux/reducers/DepositReducer';

type Props = {
	step: number;
	setStep: Dispatch<SetStateAction<number>>;
	msg: {
		header: string;
		body: string;

		transaction: {
			label: string;
			link: string;
		};
	};
};

const ConfirmingMinting = ({ msg, step, setStep }: Props) => {
	const { colorMode } = useColorMode();
	const theme = useTheme();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(eraseDeposit());
		setStep(1);
	};

	return (
		<Stack
			gap={step !== 3 ? '35px' : '20px'}
			alignItems='center'
			maxW={{ xl: '458.46px' }}
			placeItems='center'
		>
			{step !== 3 && (
				<Text fontSize='12px' lineHeight='14.52px' textAlign='center'>
					{msg.header}
				</Text>
			)}

			{step !== 3 ? (
				<CustomSpinner />
			) : (
				<Box
					boxSize='160px'
					bg={
						colorMode === 'light'
							? 'brand.purple.900'
							: 'linear-gradient(to right, #EDC6FF, #AB5AFA)'
					}
					display='flex'
					alignItems='center'
					justifyContent='center'
					borderRadius='full'
				>
					<IoCheckmark
						size='120px'
						color={
							colorMode === 'light'
								? 'white'
								: theme.colors.dark.primaryGray
						}
					/>
				</Box>
			)}

			{step !== 3 && (
				<Stack gap='10px'>
					{
						<Flex
							gap='4px'
							color={
								colorMode === 'light'
									? 'light.coolGray2'
									: 'white'
							}
							alignItems='center'
							justifyContent='center'
						>
							<BsFillCheckCircleFill size='14.67px' />
						</Flex>
					}
					<Text
						variant='coolGray'
						textAlign='center'
						fontSize='14px'
						lineHeight='24px'
					>
						{msg.body}
					</Text>
				</Stack>
			)}
			<Text variant='coolGray' fontSize='14px' lineHeight='20px'>
				See transaction on{' '}
				<Link href={msg.transaction.link}>{msg.transaction.label}</Link>
			</Text>

			{step === 3 && (
				<>
					<Stack gap='10px' alignItems='center'>
						<Text
							fontSize='20px'
							lineHeight='24.2px'
							fontWeight={600}
							variant='purpleDarkGradient'
						>
							Success!
						</Text>
						<Text fontSize='14px' lineHeight='24px' variant='gray'>
							Add the tBTC token address to your Ethereum wallet
						</Text>
					</Stack>
					<Button
						variant='purple'
						w='100%'
						h='48px'
						onClick={handleClick}
					>
						New Mint
					</Button>
				</>
			)}
		</Stack>
	);
};

export default ConfirmingMinting;
