import { useNavigate } from 'react-router-dom';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { LoyaltyIcon } from '../../assets/icons/LoyaltyIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { PublicRoutes } from '../../Routes/Routes';
import IconSideBar from './IconSideBar';
import { Stack } from '@chakra-ui/react';

type Props = {
	onClose: () => void;
	path: string;
	isOpen: boolean;
};

const drawerLinks = [
	{
		icon: HouseIcon,
		text: 'Overview',
		route: PublicRoutes.Home,
	},
	{
		icon: BitcoinIcon,
		text: 'tBTC',
		route: PublicRoutes.Minting,
	},
	{
		icon: SearchIcon,
		text: 'Explorer',
		route: PublicRoutes.Explore,
	},
	{
		icon: LoyaltyIcon,
		text: 'Loyalty Program',
		route: PublicRoutes.Loyalty,
	},
];

/**
 * @name SideBarLinkList
 *
 * @description This component is a reusable component that displays the links in the sidebar.
 *
 * @param { () => void } onClose - A function to close the sidebar.
 * @param { string } path - The current path of the application.
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 *
 * @returns { JSX.Element }
 */

const SideBarLinkList = ({ onClose, path, isOpen }: Props) => {
	const navigate = useNavigate();
	const handleClick = (route: string) => {
		navigate(route);
		onClose();
	};

	return (
		<Stack gap='20px'>
			{drawerLinks.map((link, index) => (
				<IconSideBar
					key={index}
					icon={link.icon}
					text={link.text}
					filled={path === link.route}
					onClick={() => handleClick(link.route)}
					isOpen={isOpen}
				/>
			))}
		</Stack>
	);
};

export default SideBarLinkList;
