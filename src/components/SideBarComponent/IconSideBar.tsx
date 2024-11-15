import {
	Flex,
	Icon,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

type Props = {
	icon: any;
	isOpen?: boolean;
	text?: string;
	filled?: boolean;
	onClick?: () => void;
	link?: string;
};

/**
 *
 * @name IconSideBar
 *
 * @description This component is a reusable component that displays an icon with a text.
 *
 * @param { As } icon - The icon to display.
 * @param { boolean } isOpen - A boolean to determine if the icon is open or not.
 * @param { string } text - The text to display.
 * @param { boolean } filled - A boolean to determine if the icon should be filled or not.
 * @param { () => void } onClick - A function to execute when the icon is clicked.
 * @param { string } link - The link to the external website.
 *
 * @returns { JSX.Element }
 */

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
