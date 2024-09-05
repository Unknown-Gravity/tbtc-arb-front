import {
	ComponentWithAs,
	Icon,
	IconProps,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';

type Props = {
	label: string;
	icon: ComponentWithAs<'svg', IconProps>;
	link: string;
};

const IconJoincomponent = ({ label, icon, link }: Props) => {
	return (
		<Stack
			alignItems='center'
			as={Link}
			href={link}
			isExternal={true}
			role='group'
		>
			<Icon
				as={icon}
				color='brand.purple.900'
				boxSize='41px'
				transition='filter 0.2'
				_groupHover={{ filter: 'brightness(1.25)' }}
			/>
			<Text fontSize='13.9' lineHeight='21px' fontWeight={700}>
				{label}
			</Text>
		</Stack>
	);
};

export default IconJoincomponent;
