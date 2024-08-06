import {
	Flex,
	Icon,
	Text,
	useColorModeValue,
	useTheme,
	As,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

type Props = {
	icon: As;
	isOpen?: boolean;
	text?: string;
	filled?: boolean;
	onClick?: () => void;
	link?: string;
};

const IconSideBar = ({ icon, isOpen, text, filled, onClick, link }: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const notSelectedColor = useColorModeValue(
		'brand.light.gray',
		'dark.coolGray',
	);

	return (
		<Flex
			px='10px'
			py='10px'
			onClick={onClick}
			cursor='pointer'
			transition='background-color 0.5s ease-in-out'
			alignItems='center'
			gap={2}
			bg={filled ? borderColor : 'none'}
			m='5px'
			borderRadius='5px'
			_hover={{
				bg: !filled ? 'brand.purple.910' : 'auto',
				textDecor: 'none',
			}}
			as={Link}
			href={link}
			isExternal={true}
		>
			<Icon
				as={icon}
				transition='color 0.5s ease-in-out'
				color={filled ? 'white' : notSelectedColor}
				boxSize='26px'
			/>
			{isOpen && (
				<Text
					fontSize='16px'
					fontWeight={500}
					transition='color 0.5s ease-in-out'
					color={filled ? 'white' : notSelectedColor}
				>
					{text}
				</Text>
			)}
		</Flex>
	);
};

export default IconSideBar;
