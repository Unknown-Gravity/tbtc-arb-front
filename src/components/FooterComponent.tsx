import { Flex } from '@chakra-ui/react';
import ComercialInfoComponent from './FooterComponent/ComercialInfoComponent';
import LinksComponent from './FooterComponent/LinksComponent';

const FooterComponent = () => {
	return (
		<Flex
			minW={{ base: '100%', xl: '1184px' }}
			mx='auto'
			justifyContent='space-between'
			pb={{ xl: '218px' }}
			gap={{ base: '20px' }}
			flexDir={{ base: 'column', xl: 'row' }}
		>
			<ComercialInfoComponent />
			<LinksComponent />
		</Flex>
	);
};

export default FooterComponent;
