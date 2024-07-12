import { Box, Stack, useColorModeValue, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
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

const SideBarComponent = () => {
	const [sideBarWidth, setSideBarWidth] = useState('57px');
	const [selectedTag, setSelectedTag] = useState<number | undefined>(1);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);

	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');
	const logoColor = useColorModeValue('brand.purple.900', 'white');

	const handleClick = () => {
		setIsSidebarOpen(!isSidebarOpen);
		setSideBarWidth(sideBarWidth === '57px' ? '155px' : '57px');
		if (!hasAnimated) {
			setHasAnimated(true);
		}
	};

	return (
		<Stack
			w={sideBarWidth}
			borderRightRadius='20px'
			h='90vh'
			borderRight={`0.5px solid ${borderColor}`}
			borderBottom={`0.5px solid ${borderColor}`}
			bg={sidebarBG}
			position='fixed'
			top='0'
			left='0'
			py='28px'
			transition='width 0.2s'
			justifyContent='space-between'
			zIndex={10}
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
						isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)'
					}`}
					boxSize='20px'
					transition='transform 0.1s ease'
					_hover={{
						transform: `translateX(50%) scale(1.2) ${
							isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)'
						}`,
					}}
					_active={{
						transform: `translateX(50%) scale(1) ${
							isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)'
						}`,
					}}
					zIndex={1000}
					onClick={handleClick}
				/>
				{!isSidebarOpen && !hasAnimated && (
					<MotionBox
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
					>
						<LogoAloneIcon
							color={logoColor}
							boxSize='37px'
							ml='10px'
						/>
					</MotionBox>
				)}
				{!isSidebarOpen && hasAnimated && (
					<Box>
						<LogoAloneIcon
							color={logoColor}
							boxSize='37px'
							ml='10px'
						/>
					</Box>
				)}
				{isSidebarOpen && !hasAnimated && (
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
				{isSidebarOpen && hasAnimated && (
					<Box mx='auto'>
						<LogoIcon color={logoColor} boxSize='121px' h='10px' />
					</Box>
				)}

				<Stack spacing={2}>
					<IconSideBar
						tag={1}
						selectedTag={selectedTag}
						icon={HouseIcon}
						setSelectedTag={setSelectedTag}
						isOpen={isSidebarOpen}
						text='Overview'
					/>
					<IconSideBar
						tag={2}
						selectedTag={selectedTag}
						icon={BitcoinIcon}
						setSelectedTag={setSelectedTag}
						isOpen={isSidebarOpen}
						text='tBTC'
					/>
					<IconSideBar
						tag={3}
						selectedTag={selectedTag}
						icon={SearchIcon}
						setSelectedTag={setSelectedTag}
						isOpen={isSidebarOpen}
						text='Explorer'
					/>
				</Stack>
			</Stack>
			<Stack>
				<IconSideBar
					icon={GitHubIcon}
					isOpen={isSidebarOpen}
					text='GitHub'
				/>
				<IconSideBar
					icon={DiscorIcon}
					isOpen={isSidebarOpen}
					text='Discord'
				/>
			</Stack>
		</Stack>
	);
};

export default SideBarComponent;
