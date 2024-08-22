import {
	Box,
	Icon,
	Stack,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ExternalRoutes } from '../../Routes/Routes';
import { publicLinks } from '../../Routes/Routes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { SidebarArrow } from '../../assets/icons/SidebarArrow';
import { LogoAloneIcon } from '../../assets/icons/LogoAlone';
import LogoIcon from '../../assets/icons/LogoIcon';
import IconSideBar from './IconSideBar';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';

const MotionBox = motion(Box);

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	path: string;
};

const SideBarComponent = (props: Props) => {
	const [sideBarWidth, setSideBarWidth] = useState('');
	const [hasAnimated, setHasAnimated] = useState(false);
	const navigate = useNavigate();
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');
	const logoColor = useColorModeValue('brand.purple.900', 'white');
	const handleClick = () => {
		props.onOpen();
	};

	useEffect(() => {
		props.isOpen ? setSideBarWidth('200px') : setSideBarWidth('57px');
		if (!hasAnimated) {
			setHasAnimated(true);
		}
	}, [hasAnimated, props.isOpen]);

	return (
		<Stack
			w={sideBarWidth}
			borderRightRadius='20px'
			h='90vh'
			minH='520px'
			borderRight={`0.5px solid ${borderColor}`}
			borderBottom={`0.5px solid ${borderColor}`}
			bg={sidebarBG}
			position='fixed'
			top='0'
			left='0'
			py='28px'
			transition='width 0.1s'
			justifyContent='space-between'
			zIndex={20}
		>
			<Stack
				h='250px'
				justifyContent='space-between'
				m={0}
				w='100%'
				position='relative'
			>
				<SidebarArrow
					position='absolute'
					right={0}
					top='40px'
					transform={`translateX(50%) ${
						props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
					}`}
					boxSize='20px'
					transition='transform 0.1s ease'
					_hover={{
						transform: `translateX(50%) scale(1.1) ${
							props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
						}`,
					}}
					_active={{
						transform: `translateX(50%) scale(1) ${
							props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
						}`,
					}}
					zIndex={1000}
					onClick={handleClick}
				/>
				{!props.isOpen && !hasAnimated && (
					<MotionBox
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						<LogoAloneIcon
							color={logoColor}
							boxSize='37px'
							ml='10px'
						/>
					</MotionBox>
				)}
				{!props.isOpen && hasAnimated && (
					<Box>
						<LogoAloneIcon
							color={logoColor}
							boxSize='37px'
							ml='10px'
						/>
					</Box>
				)}
				{props.isOpen && !hasAnimated && (
					<MotionBox
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, delay: 0.2 }}
						mx='auto'
					>
						<LogoIcon color={logoColor} boxSize='121px' h='37px' />
					</MotionBox>
				)}
				{props.isOpen && hasAnimated && (
					<MotionBox
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, delay: 0.1 }}
						mx='auto'
					>
						<LogoIcon color={logoColor} boxSize='121px' h='37px' />
					</MotionBox>
				)}

				<Stack mt='25px'>
					{publicLinks.map((link, index) => {
						return (
							<IconSideBar
								key={index}
								icon={link.icon ?? Icon}
								isOpen={props.isOpen}
								text={link.title}
								filled={props.path === link.link}
								onClick={() => navigate(`/${link.link}`)}
							/>
						);
					})}
				</Stack>
			</Stack>
			<Stack>
				<IconSideBar
					icon={GitHubIcon}
					isOpen={props.isOpen}
					text='GitHub'
					link={ExternalRoutes.Github}
				/>
				<IconSideBar
					icon={DiscorIcon}
					isOpen={props.isOpen}
					text='Discord'
					link={ExternalRoutes.Discord}
				/>
			</Stack>
		</Stack>
	);
};

export default SideBarComponent;
