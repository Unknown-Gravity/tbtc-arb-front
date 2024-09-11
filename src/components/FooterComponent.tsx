import { Flex, FlexProps } from '@chakra-ui/react';
import ComercialInfoComponent from './FooterComponent/ComercialInfoComponent';
import LinksComponent from './FooterComponent/LinksComponent';

/**
 *
 * @name FooterComponent
 *
 * @description This component contains the footer of the website.
 *
 * @returns { JSX.Element }
 */

const footerStyles: FlexProps = {
	w: '100%',
	maxW: '1134px',
	mx: 'auto',
	justifyContent: 'space-between',
	pb: { xl: '218px' },
	gap: { base: '20px' },
	flexDir: { base: 'column', xl: 'row' },
};

const FooterComponent = () => {
	return (
		<Flex {...footerStyles}>
			<ComercialInfoComponent />
			<LinksComponent />
		</Flex>
	);
};

export default FooterComponent;
