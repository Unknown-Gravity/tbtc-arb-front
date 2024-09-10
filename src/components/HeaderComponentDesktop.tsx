import { Box, Flex, Text, useColorModeValue, useTheme } from '@chakra-ui/react';
import ConnectButton from './ConnectButton';
import ToggleColorModeButton from './ToggleColorModeButton';

type Props = {
	isOpen: boolean;
	title: string | undefined;
};

/**
 *
 * @name HeaderComponentDesktop
 *
 * @description This component is a reusable component that displays the header of the application on desktop.
 *
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 * @param { string | undefined } title - The title of the header.
 *
 * @returns { JSX.Element }
 */

const HeaderComponentDesktop = ({ isOpen, title }: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[940];
	const bgColor = useColorModeValue('white', 'dark.primaryGray');
	// const { isOpen } = useDisclosure();

	return (
		<Box
			position='fixed'
			top={0}
			right={0}
			w={isOpen === false ? 'calc(100% - 37px)' : 'calc(100% - 185px)'}
			transition='width 0.2s'
			p='10px 60px 10px 60px'
			borderBottom={`1px solid ${borderColor}`}
			borderRadius='0px 0px 10px 10px'
			bg={bgColor}
			zIndex={15}
		>
			<Flex justifyContent='space-between'>
				<Text
					fontSize='24px'
					fontWeight={600}
					lineHeight='36px'
					variant='gray'
				>
					{title}
				</Text>
				<Flex alignItems='center' gap='10px'>
					<ToggleColorModeButton />
					<ConnectButton />
				</Flex>
			</Flex>
		</Box>
	);
};

export default HeaderComponentDesktop;
