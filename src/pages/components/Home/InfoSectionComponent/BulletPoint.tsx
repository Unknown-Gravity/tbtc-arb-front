import { Box, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

type Props = {
	children: ReactNode;
};

/**
 * @name BulletPoint
 *
 * @description This component is a reusable component that displays the point used in the Tansaction history page.
 *
 * @param { ReactNode } children - The children of the component.
 *
 * @returns { JSX.Element }
 */

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
