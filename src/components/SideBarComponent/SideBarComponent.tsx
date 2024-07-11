import {
	border,
	Box,
	Stack,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LogoAloneIcon } from '../../assets/icons/LogoAlone';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';

type Props = {};

const SideBarComponent = (props: Props) => {
	const theme = useTheme();
	const [sideBarWidth, setSideBarWidth] = useState('57px');
	const borderColor = theme.colors.brand.purple[900];
	const sidebarBG = useColorModeValue('white', 'dark.primaryGray');

	return (
		<Stack
			w={sideBarWidth}
			borderRightRadius='20px'
			h='100vh'
			borderRight={`0.5px solid ${borderColor}`}
			borderBottom={`0.5px solid ${borderColor}`}
			bg={sidebarBG}
			position='absolute'
			top='-50px'
			left='-72px'
			py='28px'
		>
			<Stack
				h={'256px'}
				alignItems='center'
				justifyContent='space-between'
				m={0}
				w='100%'
			>
				<LogoAloneIcon color='white' boxSize='37px' />
				<Stack>
					<Box
						borderRight={`2px solid ${borderColor}`}
						w='100%'
						p='10px'
					>
						<HouseIcon color='white' boxSize='24px' />
					</Box>
					<Box w='100%' p='10px'>
						<BitcoinIcon color='white' boxSize='26px' />
					</Box>
					<Box w='100%' p='10px'>
						<SearchIcon color='white' boxSize='26px' />
					</Box>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default SideBarComponent;
