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
				/>
			) : (
				<DrawerComponent
					onClose={props.onClose}
					isOpen={props.isOpen}
					onClick={handleClick}
				/>
			)}
		</>
	);
};

export default SideBarMenu;
