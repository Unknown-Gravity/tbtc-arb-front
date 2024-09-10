import {
	Icon,
	Stack,
	StackProps,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { publicLinks } from '../../Routes/Routes';
import { useEffect, useState } from 'react';
import IconSideBar from './IconSideBar';
import SideBarLogo from './SideBarLogo';
import MediaLinksList from './MediaLinksList';
import SidebarArrowCustom from './SidebarArrowCustom';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	path: string;
};

/**
 * @name SideBarComponent
 *
 * @description This component is a reusable component that displays a sidebar with links to the different pages of the application.
 *
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 * @param { () => void } onOpen - A function to open the sidebar.
 * @param { string } path - The current path of the application.
 *
 * @returns { JSX.Element }
 */

const SideBarComponent = ({ isOpen, onOpen, path }: Props) => {
	const [sideBarWidth, setSideBarWidth] = useState('');
	const navigate = useNavigate();
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');

	const sideBarStyles: StackProps = {
		w: sideBarWidth,
		borderRightRadius: '20px',
		h: '100vh',
		minH: '520px',
		borderRight: `0.5px solid ${borderColor}`,
		borderBottom: `0.5px solid ${borderColor}`,
		bg: sidebarBG,
		position: 'fixed', // Corregimos el valor de position
		top: '0',
		left: '0',
		py: '28px',
		transition: 'width 0.1s',
		justifyContent: 'space-between',
		zIndex: 20,
	};

	const handleClick = () => {
		onOpen();
	};

	useEffect(() => {
		isOpen ? setSideBarWidth('200px') : setSideBarWidth('57px');
	}, [isOpen]);

	return (
		<Stack {...sideBarStyles}>
			<Stack
				h='250px'
				justifyContent='space-between'
				m={0}
				w='100%'
				position='relative'
			>
				<SidebarArrowCustom isOpen={isOpen} onClick={handleClick} />
				<SideBarLogo isOpen={isOpen} />
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
			</Stack>
			<MediaLinksList isOpen={isOpen} />
		</Stack>
	);
};

export default SideBarComponent;
