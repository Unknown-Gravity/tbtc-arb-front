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

const FooterIcon = (props: Props) => {
	return (
		<Link
			href={props.link}
			isExternal={true}
			_hover={{ filter: 'brightness(1.3)' }}
			transition='filter 0.2s'
		>
			{!props.solid ? (
				<Flex
					w='24px'
					aspectRatio={1}
					bg='brand.purple.900'
					placeContent='center'
					borderRadius='50%'
					alignItems='center'
				>
					<Icon as={props.icon} boxSize='14px' color='white' />
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
						as={props.icon}
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
