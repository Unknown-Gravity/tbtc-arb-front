import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import ReceiptModalUnmint from './ModalUnminting/ReceiptModalUnmint';
import ConfirmActionModalUnmint from './ModalUnminting/ConfirmActionModalUnmint';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	isUnminting: boolean;
	onClick: () => void;
};

const ModalUnmintComponent = ({
	isOpen,
	onClose,
	isUnminting,
	onClick,
}: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent
				maxW='512px'
				borderRadius='14px'
				p={isUnminting ? '24px' : '20px'}
			>
				{!isUnminting ? (
					<ReceiptModalUnmint onClick={onClick} onClose={onClose} />
				) : (
					<ConfirmActionModalUnmint onClose={onClose} />
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalUnmintComponent;
