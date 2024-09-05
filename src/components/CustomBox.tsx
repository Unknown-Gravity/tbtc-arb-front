import { Box, BoxProps, useColorMode } from '@chakra-ui/react';

export const CustomBox = (props: BoxProps) => {
	const { bg, p } = props;
	const { colorMode } = useColorMode();

	return (
		<Box
			{...props}
			borderRadius='14px'
			boxShadow={colorMode === 'light' ? '0px 0px 7px #00000025' : 'none'}
			bg={bg || (colorMode === 'light' ? 'white' : 'dark.primaryGray')}
			p={p || 5}
		></Box>
	);
};
