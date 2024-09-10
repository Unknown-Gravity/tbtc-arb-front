import { Center, Divider, useBreakpointValue } from '@chakra-ui/react';

/**
 *
 * @name DividerCustom
 *
 * @description This component is a reusable component that displays a divider.
 *
 * @returns { JSX.Element }
 */

const DividerCustom = () => {
	const orientation = useBreakpointValue<'horizontal' | 'vertical'>({
		base: 'horizontal',
		xl: 'vertical',
	});
	return (
		<Center height='auto'>
			<Divider
				orientation={orientation}
				m={{ base: '32px 0', xl: '0 32px' }}
			/>
		</Center>
	);
};

export default DividerCustom;
