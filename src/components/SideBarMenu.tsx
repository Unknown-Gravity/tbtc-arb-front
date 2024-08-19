import SideBarComponent from './SideBarComponent/SideBarComponent';
import DrawerComponent from './SideBarComponent/DrawerComponent';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	isMobile: boolean;
};

const SideBarMenu = (props: Props) => {
	const path = window.location.pathname.slice(1);

	const handleOpen = () => {
		props.isOpen ? props.onClose() : props.onOpen();
	};
	return (
		<>
			{props.isMobile ? (
				<SideBarComponent
					isOpen={props.isOpen}
					onOpen={handleOpen}
					path={path}
				/>
			) : (
				<DrawerComponent
					onClose={props.onClose}
					isOpen={props.isOpen}
					path={path}
				/>
			)}
		</>
	);
};

export default SideBarMenu;
