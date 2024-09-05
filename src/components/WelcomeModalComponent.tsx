import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	useDisclosure,
	Image,
	useColorModeValue,
	Stack,
	Text,
	Divider,
} from '@chakra-ui/react';
import { DarkWelcomeImage, LightWelcomeImage } from '../assets/images';
import InfoWelcomeModalComponent from './WelcomeModalComponent/InfoWelcomeModalComponent';
import { useEffect } from 'react';
type Props = {};

const WelcomeModalComponent = (props: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const headerModalImage = useColorModeValue(
		LightWelcomeImage,
		DarkWelcomeImage,
	);

	const acceptedTerms = localStorage.getItem('acceptedTerms');

	useEffect(() => {
		if (!acceptedTerms) {
			onOpen();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAcceptTerms = () => {
		localStorage.setItem('acceptedTerms', 'true');
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
			<ModalOverlay />
			<ModalContent maxW='512px' mx='20px' w='95%'>
				<ModalHeader></ModalHeader>
				<ModalBody>
					<Stack alignItems='center'>
						<Image maxW='339px' src={headerModalImage} />
						<Stack mt='55px' alignItems='center'>
							<Text
								fontWeight={600}
								fontSize='24px'
								lineHeight='32px'
							>
								The NEW tBTC dApp is here!
							</Text>
							<Text
								variant='coolGray'
								fontSize='18px'
								lineHeight='28px'
							>
								Take note of the following before you proceed.
							</Text>
						</Stack>
						<Stack mt='48px'>
							<Stack spacing='25px'>
								<InfoWelcomeModalComponent
									header='BRIDGING DURATION'
									info1='Your tBTC token will arrive in'
									purpleInfo='~ 1 to 3 hours'
									info2='after you Initiate Minting, depending on your deposited amount.'
								/>
								<InfoWelcomeModalComponent
									header='MINIMUM DEPOSIT'
									info1='The minimum deposit at launch is'
									purpleInfo='0.01 BTC.'
									info2='Depositing less than the minimum can mean losing access to your funds.'
								/>
							</Stack>
						</Stack>
						<Text
							variant='coolGray'
							fontSize='14px'
							lineHeight='20px'
							mt='83px'
						>
							By clicking the button below, you acknowledge and
							accept the terms.
						</Text>
						<Divider />
					</Stack>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} variant='grayOutlined'>
						How it Works
					</Button>
					<Button variant='purple' onClick={handleAcceptTerms}>
						I Agree, Let's Go!
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default WelcomeModalComponent;
