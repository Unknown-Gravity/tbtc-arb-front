import { Box, Stack, useColorModeValue, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import IconSideBar from './IconSideBar';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';
import { SidebarArrow } from '../../assets/icons/SidebarArrow';
import { LogoAloneIcon } from '../../assets/icons/LogoAlone';
import LogoIcon from '../../assets/icons/LogoIcon';

const MotionBox = motion(Box);

type Props = {
	isOpen: boolean;
	onOpen: () => void;
	onClick: (tag: number) => void;
};

const SideBarComponent = (props: Props) => {
	const [sideBarWidth, setSideBarWidth] = useState('');
	const [selectedTag, setSelectedTag] = useState<number | undefined>(1);
	const [hasAnimated, setHasAnimated] = useState(false);

	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');
	const logoColor = useColorModeValue('brand.purple.900', 'white');
	const handleClick = () => {
		props.onOpen();
	};

	useEffect(() => {
		props.isOpen ? setSideBarWidth('155px') : setSideBarWidth('55px');
		if (!hasAnimated) {
			setHasAnimated(true);
		}
	}, [hasAnimated, props.isOpen]);

	const handleChangeTag = (tag: number) => {
		setSelectedTag(tag);
	};

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
			transition='width 0.2s'
			justifyContent='space-between'
			zIndex={11}
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
						<LogoIcon color={logoColor} boxSize='121px' h='10px' />
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
						<LogoIcon color={logoColor} boxSize='121px' h='10px' />
					</MotionBox>
				)}

				<Stack>
					<IconSideBar
						tag={1}
						selectedTag={selectedTag}
						icon={HouseIcon}
						setSelectedTag={handleChangeTag}
						isOpen={props.isOpen}
						text='Overview'
					/>
					<IconSideBar
						tag={2}
						selectedTag={selectedTag}
						icon={BitcoinIcon}
						setSelectedTag={handleChangeTag}
						isOpen={props.isOpen}
						text='tBTC'
					/>
					<IconSideBar
						tag={3}
						selectedTag={selectedTag}
						icon={SearchIcon}
						setSelectedTag={handleChangeTag}
						isOpen={props.isOpen}
						text='Explorer'
					/>
				</Stack>
			</Stack>
			<Stack>
				<IconSideBar
					icon={GitHubIcon}
					isOpen={props.isOpen}
					text='GitHub'
				/>
				<IconSideBar
					icon={DiscorIcon}
					isOpen={props.isOpen}
					text='Discord'
				/>
			</Stack>
		</Stack>
	);
};

export default SideBarComponent;
