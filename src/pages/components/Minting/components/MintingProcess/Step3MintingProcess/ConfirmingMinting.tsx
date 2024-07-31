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

type Props = {
	isLoading: boolean;
	confirmations: number;
	msg: {
		header: string;
		body: string;

		transaction: {
			label: string;
			link: string;
		};
	};
	finalizedMinting: boolean;
};

const ConfirmingMinting = (props: Props) => {
	const { colorMode } = useColorMode();
	const theme = useTheme();

	return (
		<Stack
			gap={props.finalizedMinting ? '35px' : '20px'}
			alignItems='center'
			maxW='458.46px'
		>
			{!props.finalizedMinting ? (
				<>
					<Text
						fontSize='12px'
						lineHeight='14.52px'
						textAlign='center'
					>
						{props.msg.header}
					</Text>

					{props.isLoading ? (
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

					<Stack gap='10px'>
						{props.confirmations < 6 && (
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
								<Text
									variant='lightCoolGray'
									lineHeight='19.36px'
									fontWeight={600}
								>
									{props.isLoading ? 6 : props.confirmations}
									/6 Bitcoin Network Confirmations
								</Text>
							</Flex>
						)}
						<Text
							variant='coolGray'
							textAlign='center'
							fontSize='14px'
							lineHeight='24px'
						>
							{props.msg.body}
						</Text>
					</Stack>
					<Text variant='coolGray' fontSize='14px' lineHeight='20px'>
						See transaction on{' '}
						<Link href={props.msg.transaction.link}>
							{props.msg.transaction.label}
						</Link>
					</Text>
				</>
			) : (
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
					<Button variant='purple' w='100%' h='48px'>
						New Mint
					</Button>
				</>
			)}
		</Stack>
	);
};

export default ConfirmingMinting;
