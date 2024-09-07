import {
	Modal,
	ModalOverlay,
	ModalContent,
	Flex,
	Text,
	CloseButton,
	Stack,
	useColorMode,
	Image,
	Link,
	Divider,
	Button,
} from '@chakra-ui/react';
import { DarkModalMinting, LightModalMinting } from '../../../../assets/images';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	goBack: () => void;
};

const ModalMinting = ({ isOpen, onClose, goBack }: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent maxW='512px' h='685px' borderRadius='14px' p='20px'>
				<Stack gap='10px'>
					<Flex justifyContent='space-between' p='12px'>
						<Text
							fontSize='24px'
							lineHeight='32px'
							fontWeight={500}
						>
							Take Note
						</Text>
						<CloseButton onClick={onClose} />
					</Flex>
					<Stack
						p='24px'
						bg={
							colorMode === 'light'
								? 'light.lightGray'
								: 'dark.primaryGray'
						}
						gap='16px'
						borderRadius='14px'
					>
						<Text
							fontSize='24px'
							lineHeight='32px'
							fontWeight={500}
							color={
								colorMode === 'light'
									? 'light.secondaryGray'
									: 'white'
							}
						>
							You are about to go generate a new Deposit Address,
							are you sure?
						</Text>
						<Text
							fontSize='18px'
							lineHeight='28px'
							fontWeight={400}
							variant='gray2'
						>
							Going back means you will redo Step 1 and generate a
							new Deposit Address.
							<br />
							<br />
							You will not be able to use your current generated
							address if you generate a new one.
						</Text>
					</Stack>
				</Stack>
				<Image
					src={
						colorMode === 'light'
							? LightModalMinting
							: DarkModalMinting
					}
					maxW='248px'
					my='27px'
					mx='auto'
				/>
				<Stack gap='10px'>
					<Text fontSize='14px' lineHeight='20px' textAlign='center'>
						Read more about the{' '}
						<Link 
							href="https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc" 
							variant='purpleDarkGradient' 
							isExternal
						>
							bridge contract.
						</Link>
					</Text>
					<Divider
						opacity={1}
						borderColor={
							colorMode === 'light'
								? 'light.superLightGray'
								: 'dark.coolGray'
						}
					/>
				</Stack>
				<Flex mt='24px' gap='12px' justifyContent='flex-end'>
					<Button variant='grayOutlined' onClick={goBack}>
						Generate New Address
					</Button>
					<Button variant='purple' onClick={onClose}>
						Dismiss
					</Button>
				</Flex>
			</ModalContent>
		</Modal>
	);
};

export default ModalMinting;
