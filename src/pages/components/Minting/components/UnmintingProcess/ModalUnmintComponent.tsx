import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import ReceiptModalUnmint from './ModalUnminting/ReceiptModalUnmint';
import ConfirmActionModalUnmint from './ModalUnminting/ConfirmActionModalUnmint';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	isUnminting: boolean;
	onClick: () => void;
};

const ModalUnmintComponent = (props: Props) => {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<ModalOverlay />
			<ModalContent
				maxW='512px'
				borderRadius='14px'
				p={props.isUnminting ? '24px' : '20px'}
			>
				{!props.isUnminting ? (
					<ReceiptModalUnmint
						onClick={props.onClick}
						onClose={props.onClose}
					/>
				) : (
					<ConfirmActionModalUnmint onClose={props.onClose} />
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalUnmintComponent;
