import { Center, Divider, useBreakpointValue } from '@chakra-ui/react';

type Props = {};

const DividerCustom = (props: Props) => {
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
