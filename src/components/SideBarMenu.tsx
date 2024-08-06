import { useColorMode, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import SideBarComponent from './SideBarComponent/SideBarComponent';
import DrawerComponent from './SideBarComponent/DrawerComponent';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	isMobile: boolean;
};

const SideBarMenu = (props: Props) => {
	const [selectedTag, setSelectedTag] = useState<number | undefined>(0);
	const path = window.location.pathname.slice(1);

	const handleClick = (tag: number) => {
		setSelectedTag(tag);
	};

	const handleOpen = () => {
		props.isOpen ? props.onClose() : props.onOpen();
	};
	return (
		<>
			{props.isMobile ? (
				<SideBarComponent
					isOpen={props.isOpen}
					onOpen={handleOpen}
					onClick={handleClick}
					path={path}
				/>
			) : (
				<DrawerComponent
					onClose={props.onClose}
					isOpen={props.isOpen}
					onClick={handleClick}
					path={path}
				/>
			)}
		</>
	);
};

export default SideBarMenu;
