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

const IconJoincomponent = (props: Props) => {
	return (
		<Stack
			alignItems='center'
			as={Link}
			href={props.link}
			isExternal={true}
		>
			<Icon as={props.icon} color='brand.purple.900' boxSize='41px' />
			<Text fontSize='13.9' lineHeight='21px' fontWeight={700}>
				{props.label}
			</Text>
		</Stack>
	);
};

export default IconJoincomponent;
