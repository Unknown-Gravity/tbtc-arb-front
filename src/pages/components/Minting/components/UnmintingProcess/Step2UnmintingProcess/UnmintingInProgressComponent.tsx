import { Box, Link, Stack, Text } from '@chakra-ui/react';
import CustomSpinner from '../../../../../../components/CustomSpinner';

type Props = {
	steps: Array<{ step: string }>;
	activeStep: number;
};

const UnmintingInProgressComponent = (props: Props) => {
	return (
		<Box>
			<Stack gap='35px' alignItems='center'>
				<Text fontSize='12px' lineHeight='14.52px' variant='gray'>
					Unminting in progress
				</Text>
				<CustomSpinner />
				<Text
					fontSize='12px'
					lineHeight='24px'
					variant='gray'
					px='40px'
					textAlign='center'
				>
					Your redemption request is being processed. This will take
					around 3-5 hours.
				</Text>
				<Text fontSize='12px' lineHeight='20px' variant='gray'>
					See transaction on{' '}
					<Link variant='purpleDarkGradient'>explorer.</Link>
				</Text>
			</Stack>
		</Box>
	);
};

export default UnmintingInProgressComponent;
