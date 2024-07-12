import {
	border,
	Box,
	Stack,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LogoAloneIcon } from '../../assets/icons/LogoAlone';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import IconSideBar from './IconSideBar';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';

type Props = {};

const SideBarComponent = (props: Props) => {
	const theme = useTheme();
	const [sideBarWidth, setSideBarWidth] = useState('57px');
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');
	const [selectedTag, setSelectedTag] = useState<number | undefined>(1);
	console.log('🚀 ~ SideBarComponent ~ selectedTag:', selectedTag);
	const logoColor = useColorModeValue('brand.purple.900', 'white');

	return (
		<Stack
			w={sideBarWidth}
			borderRightRadius='20px'
			h='90vh'
			borderRight={`0.5px solid ${borderColor}`}
			borderBottom={`0.5px solid ${borderColor}`}
			bg={sidebarBG}
			position='absolute'
			top='-50px'
			left='-72px'
			py='28px'
			justifyContent='space-between'
			zIndex={10}
		>
			<Stack
				h={'250px'}
				alignItems='center'
				justifyContent='space-between'
				m={0}
				w='100%'
				position='relative'
			>
				<LogoAloneIcon color={logoColor} boxSize='37px' />
				<Stack>
					<IconSideBar
						tag={1}
						selectedTag={selectedTag}
						icon={HouseIcon}
						setSelectedTag={setSelectedTag}
					/>
					<IconSideBar
						tag={2}
						selectedTag={selectedTag}
						icon={BitcoinIcon}
						setSelectedTag={setSelectedTag}
					/>
					<IconSideBar
						tag={3}
						selectedTag={selectedTag}
						icon={SearchIcon}
						setSelectedTag={setSelectedTag}
					/>
				</Stack>
			</Stack>
			<Stack>
				<IconSideBar icon={GitHubIcon} />
				<IconSideBar icon={DiscorIcon} />
			</Stack>
		</Stack>
	);
};

export default SideBarComponent;
