import { Link } from '@chakra-ui/react';
import { LinkType } from '../../types/Links.type';

type Props = { link: LinkType };

/**
 *
 * @name LinkComponent
 *
 * @description This component is a reusable component that displays a link with a gradient background.
 *
 * @param { LinkType } link - The link to display.
 *
 * @returns { JSX.Element }
 */

const LinkComponent = ({ link }: Props) => {
	return (
		<Link
			variant='purpleDarkGradient'
			fontWeight={500}
			isExternal={true}
			href={link.link}
		>
			{link.title}
		</Link>
	);
};

export default LinkComponent;
