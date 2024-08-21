import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerFooter,
	Flex,
	Text,
} from '@chakra-ui/react';
import LogoIcon from '../../assets/icons/LogoIcon';
import IconSideBar from './IconSideBar';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';
import { ExternalRoutes, PublicRoutes } from '../../Routes/Routes';
import { useNavigate } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	path: string;
};

const DrawerComponent = (props: Props) => {
	const navigate = useNavigate();

	return (
		<Drawer isOpen={props.isOpen} placement='left' onClose={props.onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader w='100%' display='flex' justifyContent='center'>
					<LogoIcon
						color='brand.purple.900'
						boxSize='160px'
						h='20px'
					/>
				</DrawerHeader>

				<DrawerBody display='flex' flexDir='column' gap='20px'>
					<IconSideBar
						icon={HouseIcon}
						isOpen={props.isOpen}
						text='Overview'
						filled={props.path === PublicRoutes.Home}
						onClick={() => navigate(`/${PublicRoutes.Home}`)}
					/>
					<IconSideBar
						icon={BitcoinIcon}
						isOpen={props.isOpen}
						text='tBTC'
						filled={props.path === PublicRoutes.Minting}
						onClick={() => navigate(`/${PublicRoutes.Minting}`)}
					/>
					<IconSideBar
						icon={SearchIcon}
						isOpen={props.isOpen}
						text='Explorer'
						filled={props.path === PublicRoutes.Explore}
						onClick={() => navigate(`/${PublicRoutes.Explore}`)}
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
