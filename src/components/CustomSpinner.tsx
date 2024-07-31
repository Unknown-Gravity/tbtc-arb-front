import { Spinner, SpinnerProps } from '@chakra-ui/react';

const CustomSpinner = (props: SpinnerProps) => {
	return (
		<Spinner
			{...props}
			h='160px'
			w='160px'
			speed='1.5s'
			thickness='12px'
			color='brand.purple.900'
			emptyColor='light.superLightGray'
		/>
	);
};

export default CustomSpinner;
