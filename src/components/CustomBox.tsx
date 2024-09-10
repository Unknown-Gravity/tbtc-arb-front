import { Box, BoxProps, useColorMode } from '@chakra-ui/react';

/**
 * @name CustomBox
 *
 * @description This component is a reusable component used for the container boxes of the website.
 *
 * @param { BoxProps } props - The props to pass to the Box component.
 *
 * @returns { JSX.Element }
 */

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
