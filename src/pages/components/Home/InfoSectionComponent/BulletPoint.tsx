import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

type Props = {
	children: ReactNode;
};
const BulletPoint = ({ children }: Props) => {
	return (
		<Text lineHeight='24px'>
			<Box
				color='brand.purple.900'
				display='inline-block'
				verticalAlign='middle'
				mr={2}
			>
				<BsFillArrowRightCircleFill style={{ minWidth: '16px' }} />
			</Box>
			{children}
		</Text>
	);
};

export default BulletPoint;
