import { Spinner, SpinnerProps, useColorModeValue } from '@chakra-ui/react';

/**
 * @name CustomSpinner
 *
 * @description This component is a reusable spinner component.
 *
 * @param { SpinnerProps } props - The props to pass to the Spinner component.
 *
 * @returns { JSX.Element }
 */

const CustomSpinner = (props: SpinnerProps) => {
	const { h, w, speed, thickness, color, emptyColor } = props;

	const emptyColorValue = useColorModeValue(
		'light.superLightGray',
		'dark.focusGray',
	);
	return (
		<Spinner
			{...props}
			h={h || '160px'}
			w={w || '160px'}
			speed={speed || '1.5s'}
			thickness={thickness || '12px'}
			color={color || 'brand.purple.900'}
			emptyColor={emptyColor || emptyColorValue}
		/>
	);
};

export default CustomSpinner;
