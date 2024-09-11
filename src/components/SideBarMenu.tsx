import SideBarComponent from './SideBarComponent/SideBarComponent';
import DrawerComponent from './SideBarComponent/DrawerComponent';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	isMobile: boolean;
};

/**
 * @name SideBarMenu
 *
 * @description This component is a reusable component that displays the sidebar of the application.
 *
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 * @param { () => void } onOpen - A function to open the sidebar.
 * @param { () => void } onClose - A function to close the sidebar.
 * @param { boolean } isMobile - A boolean to determine if the device is mobile or not.
 *
 * @returns { JSX.Element }
 */

const SideBarMenu = ({ isOpen, onOpen, onClose, isMobile }: Props) => {
	const path = window.location.pathname.slice(1);

	const handleOpen = () => {
		isOpen ? onClose() : onOpen();
	};
	return (
		<>
			{isMobile ? (
				<SideBarComponent
					isOpen={isOpen}
					onOpen={handleOpen}
					path={path}
				/>
			) : (
				<DrawerComponent
					onClose={onClose}
					isOpen={isOpen}
					path={path}
				/>
			)}
		</>
	);
};

export default SideBarMenu;
