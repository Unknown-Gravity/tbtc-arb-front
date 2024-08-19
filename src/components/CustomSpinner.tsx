import { Spinner, SpinnerProps, useColorModeValue } from '@chakra-ui/react';

const CustomSpinner = (props: SpinnerProps) => {
	const emptyColorValue = useColorModeValue(
		'light.superLightGray',
		'dark.focusGray',
	);
	return (
		<Spinner
			{...props}
			h={props.h || '160px'}
			w={props.w || '160px'}
			speed={props.speed || '1.5s'}
			thickness={props.thickness || '12px'}
			color={props.color || 'brand.purple.900'}
			emptyColor={props.emptyColor || emptyColorValue}
		/>
	);
};

export default CustomSpinner;
