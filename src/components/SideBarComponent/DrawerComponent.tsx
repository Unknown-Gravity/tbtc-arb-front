import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerFooter,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import LogoIcon from '../../assets/icons/LogoIcon';
import SideBarLinkList from './SideBarLinkList';
import MediaLinksList from './MediaLinksList';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	path: string;
};

/**
 *
 * @name DrawerComponent
 *
 * @description Mobile version of the sidebar component. It contains the same links as the sidebar.
 *
 * @param { boolean } isOpen - A boolean to determine if the drawer is open or not.
 * @param { () => void } onClose - A function to close the drawer.
 * @param { string } path - The current path of the application.
 *
 * @returns { JSX.Element }
 */

const DrawerComponent = ({ isOpen, onClose, path }: Props) => {
	const drawerBgColor = useColorModeValue('white', 'dark.primaryGray');

	return (
		<Drawer isOpen={isOpen} placement='left' onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent bgColor={drawerBgColor}>
				<DrawerHeader w='100%' display='flex' justifyContent='center'>
					<LogoIcon color='white' boxSize='160px' h='20px' />
				</DrawerHeader>

				<DrawerBody>
					<SideBarLinkList
						path={path}
						onClose={onClose}
						isOpen={isOpen}
					/>
				</DrawerBody>
				<DrawerFooter justifyContent='center' flexDir='column'>
					<MediaLinksList />
					<Text fontSize='10px'>© 2024 Threshold Network</Text>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerComponent;
