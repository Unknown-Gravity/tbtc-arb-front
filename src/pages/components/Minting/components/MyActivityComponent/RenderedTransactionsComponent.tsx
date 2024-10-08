import { Grid, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = { data: Array<JSX.Element> };

/**
 * @name RenderedTransactionsComponent
 *
 * @description This component displays the rendered transactions.
 *
 * @param {Array<JSX.Element>} data The data to be displayed.
 *
 * @returns {JSX.Element}
 */

const RenderedTransactionsComponent = ({ data }: Props) => {
	return (
		<Stack mt='40px' maxH='520px'>
			<Grid
				w={{ base: '95%', xl: '220px' }}
				mx={'auto'}
				templateColumns='repeat(3, minmax(0, 1fr))'
				placeItems='center'
			>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='16px'
					fontWeight={600}
					placeSelf='start'
				>
					TBTC
				</Text>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='16px'
					fontWeight={600}
					transform='translateX(-10px)'
				>
					TX
				</Text>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='16px'
					fontWeight={600}
					transform='translateX(5px)'
				>
					STATE
				</Text>
			</Grid>
			<Stack gap='14.5px'>
				{data.map((item, index) => (
					<React.Fragment key={index}>{item}</React.Fragment>
				))}
			</Stack>
		</Stack>
	);
};

export default RenderedTransactionsComponent;
