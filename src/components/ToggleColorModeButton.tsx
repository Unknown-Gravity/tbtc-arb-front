import { IconButton, useColorMode } from '@chakra-ui/react';
import { HiMoon, HiOutlineSun } from 'react-icons/hi';

type Props = {};

/**
 * @name ToggleColorModeButton
 *
 * @description This component displays a button that changes the color moded of the site.
 * @returns {JSX.Element}
 */

const ToggleColorModeButton = (props: Props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const icon =
		colorMode === 'light' ? (
			<HiMoon size='19px' />
		) : (
			<HiOutlineSun size='19px' />
		);
	return (
		<IconButton
			aria-label='toggle color button'
			icon={icon}
			onClick={toggleColorMode}
			bg='none'
		/>
	);
};

export default ToggleColorModeButton;
