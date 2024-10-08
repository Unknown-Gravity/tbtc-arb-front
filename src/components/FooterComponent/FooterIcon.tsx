import {
	Box,
	ComponentWithAs,
	Flex,
	Icon,
	IconProps,
	Link,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
	link: string;
	icon: IconType | ComponentWithAs<'svg', IconProps>;
	solid?: boolean;
};

/**
 *
 * @name FooterIcon
 *
 * @description This component is a reusable component that displays an icon with a link to an external website.
 *
 * @param { string } link - The link to the external website.
 * @param { IconType | ComponentWithAs<'svg', IconProps> } icon - The icon to display.
 * @param { boolean } solid - A boolean to determine if the icon should be solid or not. It is used to determine the background color of the icon.
 *
 * @returns { JSX.Element }
 */

const FooterIcon = ({ link, icon, solid }: Props) => {
	return (
		<Link
			href={link}
			isExternal={true}
			_hover={{ filter: 'brightness(1.3)' }}
			transition='filter 0.2s'
		>
			{!solid ? (
				<Flex
					w='24px'
					aspectRatio={1}
					bg='brand.purple.900'
					placeContent='center'
					borderRadius='50%'
					alignItems='center'
				>
					<Icon as={icon} boxSize='14px' color='white' />
				</Flex>
			) : (
				<Box
					bg='white'
					h='22px'
					w='22px'
					position='relative'
					borderRadius='50%'
					transform='translateY(2px)'
				>
					<Icon
						as={icon}
						borderRadius='50%'
						boxSize='24px'
						color='brand.purple.900'
						position='absolute'
						bottom={0}
						left='-1px'
					/>{' '}
				</Box>
			)}
		</Link>
	);
};

export default FooterIcon;
