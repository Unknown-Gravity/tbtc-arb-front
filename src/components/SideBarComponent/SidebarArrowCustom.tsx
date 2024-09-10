import { SidebarArrow } from '../../assets/icons/SidebarArrow';

type Props = { isOpen: boolean; onClick: () => void };

/**
 * @name SidebarArrowCustom
 *
 * @description This component displays the arrow for the sidebar component
 *
 * @param {boolean} isOpen - The state of the sidebar
 * @param {() => void} onClick - The function to toggle the sidebar
 *
 * @returns {JSX.Element}
 */

const SidebarArrowCustom = ({ isOpen, onClick }: Props) => {
	return (
		<SidebarArrow
			position='absolute'
			right={0}
			top='40px'
			transform={`translateX(50%) ${
				isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
			}`}
			boxSize='20px'
			transition='transform 0.1s ease'
			_hover={{
				transform: `translateX(50%) scale(1.1) ${
					isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
				}`,
			}}
			_active={{
				transform: `translateX(50%) scale(1) ${
					isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
				}`,
			}}
			zIndex={1000}
			onClick={onClick}
		/>
	);
};

export default SidebarArrowCustom;
