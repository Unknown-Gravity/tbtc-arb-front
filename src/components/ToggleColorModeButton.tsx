import { IconButton, useColorMode } from '@chakra-ui/react';
import { HiMoon, HiOutlineSun } from 'react-icons/hi';

type Props = {};

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
