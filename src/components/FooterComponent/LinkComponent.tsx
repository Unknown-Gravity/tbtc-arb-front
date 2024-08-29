import { Link } from '@chakra-ui/react';
import { LinkType } from '../../types/Links.type';

type Props = { link: LinkType };

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
