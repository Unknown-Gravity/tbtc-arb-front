import { Flex, Stack } from '@chakra-ui/react';
import ComercialInfoComponent from './FooterComponent/ComercialInfoComponent';
import LinksComponent from './FooterComponent/LinksComponent';

const FooterComponent = () => {
	return (
		<Flex
			minW={{ base: '100%', '2xl': '1184px' }}
			mx='auto'
			justifyContent='space-between'
			pb='218px'
		>
			<ComercialInfoComponent />
			<LinksComponent />
		</Flex>
	);
};

export default FooterComponent;
