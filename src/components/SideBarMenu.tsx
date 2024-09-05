import SideBarComponent from './SideBarComponent/SideBarComponent';
import DrawerComponent from './SideBarComponent/DrawerComponent';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	isMobile: boolean;
};

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
