import { Icon, Stack } from '@chakra-ui/react';
import IconSideBar from './IconSideBar';
import { publicLinks } from '../../Routes/Routes';
import { useNavigate } from 'react-router-dom';

type Props = { isOpen: boolean; path: string };

/**
 * @name NavigationLinks
 *
 * @description This component displays the navigation links for the sidebar component
 *
 * @param {boolean} isOpen - The state of the sidebar
 * @param {string} path - The current path
 *
 * @returns {JSX.Element}
 */

const NavigationLinks = ({ isOpen, path }: Props) => {
	const navigate = useNavigate();
	return (
		<Stack mt='25px'>
			{publicLinks.map((link, index) => {
				return (
					<IconSideBar
						key={index}
						icon={link.icon ?? Icon}
						isOpen={isOpen}
						text={link.title}
						filled={path === link.link}
						onClick={() => navigate(`/${link.link}`)}
					/>
				);
			})}
		</Stack>
	);
};

export default NavigationLinks;
