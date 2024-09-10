import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerFooter,
	Flex,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import LogoIcon from '../../assets/icons/LogoIcon';
import IconSideBar from './IconSideBar';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';
import { LoyaltyIcon } from '../../assets/icons/LoyaltyIcon';
import { ExternalRoutes, PublicRoutes } from '../../Routes/Routes';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const drawerBgColor = useColorModeValue('white', 'dark.primaryGray');
	return (
		<Drawer isOpen={isOpen} placement='left' onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent bgColor={drawerBgColor}>
				<DrawerHeader w='100%' display='flex' justifyContent='center'>
					<LogoIcon color='white' boxSize='160px' h='20px' />
				</DrawerHeader>

				<DrawerBody display='flex' flexDir='column' gap='20px'>
					<IconSideBar
						icon={HouseIcon}
						isOpen={isOpen}
						text='Overview'
						filled={path === PublicRoutes.Home}
						onClick={() => navigate(`/${PublicRoutes.Home}`)}
					/>
					<IconSideBar
						icon={BitcoinIcon}
						isOpen={isOpen}
						text='tBTC'
						filled={path === PublicRoutes.Minting}
						onClick={() => navigate(`/${PublicRoutes.Minting}`)}
					/>
					<IconSideBar
						icon={SearchIcon}
						isOpen={isOpen}
						text='Explorer'
						filled={path === PublicRoutes.Explore}
						onClick={() => navigate(`/${PublicRoutes.Explore}`)}
					/>
					<IconSideBar
						icon={LoyaltyIcon}
						isOpen={isOpen}
						text='Loyalty Program'
						filled={path === PublicRoutes.Loyalty}
						onClick={() => navigate(`/${PublicRoutes.Loyalty}`)}
					/>
				</DrawerBody>
				<DrawerFooter justifyContent='center' flexDir='column'>
					<Flex>
						<IconSideBar
							icon={GitHubIcon}
							isOpen={false}
							text='GitHub'
							link={ExternalRoutes.Github}
						/>
						<IconSideBar
							icon={DiscorIcon}
							isOpen={false}
							text='Discord'
							link={ExternalRoutes.Discord}
						/>
					</Flex>
					<Text fontSize='10px'>© 2024 Threshold Network</Text>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerComponent;
