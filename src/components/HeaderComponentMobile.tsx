import {
	Box,
	BoxProps,
	Flex,
	IconButton,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { HiMoon } from 'react-icons/hi';
import { HiOutlineSun } from 'react-icons/hi';
import ConnectButton from './ConnectButton';
import { LogoAloneIcon } from '../assets/icons/LogoAlone';
import { HamburgerIcon } from '@chakra-ui/icons';

type Props = {
	isOpen: boolean;
	onOpen: () => void;
};

/**
 *
 * @name HeaderComponentMobile
 *
 * @description This component is a reusable component that displays the header of the application on mobile.
 *
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 * @param { () => void } onOpen - A function to open the sidebar.
 *
 * @returns { JSX.Element }
 */

const HeaderComponentMobile = ({ isOpen, onOpen }: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const { colorMode, toggleColorMode } = useColorMode();
	const bgHeaderColor = useColorModeValue('white', 'dark.primaryGray');
	const logoColor = useColorModeValue('brand.purple.900', 'white');

	const boxStyle: BoxProps = {
		position: 'fixed',
		top: 0,
		padding: '1rem',
		backgroundColor: bgHeaderColor,
		zIndex: 15,
		borderBottom: `1px solid ${borderColor}`,
		width: '100%',
	};

	return (
		<Box {...boxStyle}>
			<Flex justifyContent='space-between' alignItems='center'>
				<Flex gap='20px' px='20px' alignItems='center'>
					<IconButton
						aria-label='HamburgerIcon'
						as={HamburgerIcon}
						cursor='pointer'
						p='8px'
						onClick={onOpen}
					/>
					<LogoAloneIcon color={logoColor} boxSize='25px' />
				</Flex>
				<Flex alignItems='center' gap='10px'>
					{colorMode === 'light' ? (
						<HiMoon
							size='19px'
							onClick={toggleColorMode}
							cursor='pointer'
						/>
					) : (
						<HiOutlineSun
							size='19px'
							onClick={toggleColorMode}
							cursor='pointer'
						/>
					)}
					<ConnectButton />
				</Flex>
			</Flex>
		</Box>
	);
};

export default HeaderComponentMobile;
