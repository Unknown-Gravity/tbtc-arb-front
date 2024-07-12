import { Box, BoxProps, Text, useColorMode } from '@chakra-ui/react';

export const CustomBox = (props: BoxProps) => {
	const { colorMode } = useColorMode();

	return (
		<Box
			{...props}
			borderRadius='14px'
			boxShadow={colorMode === 'light' ? '0px 0px 7px #00000025' : 'none'}
			bg={colorMode === 'light' ? 'white' : 'dark.primaryGray'}
			p={5}
		></Box>
	);
};
