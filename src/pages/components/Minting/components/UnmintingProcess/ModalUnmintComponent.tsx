import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import ReceiptModalUnmint from './ModalUnminting/ReceiptModalUnmint';
import ConfirmActionModalUnmint from './ModalUnminting/ConfirmActionModalUnmint';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	isUnminting: boolean;
	onClick: () => void;
};

/**
 * @name ModalUnmintComponent
 *
 * @description This component displays the unmint modal component.
 *
 * @param {boolean} isOpen The state of the modal.
 * @param {() => void} onClose The function to be called when the modal is closed.
 * @param {boolean} isUnminting The state of the unminting process.
 * @param {() => void} onClick The function to be called when the button is clicked.
 *
 * @returns {JSX.Element}
 */

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
