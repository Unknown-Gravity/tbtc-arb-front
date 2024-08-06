import {
	Flex,
	Icon,
	Text,
	useColorModeValue,
	useTheme,
	As,
} from '@chakra-ui/react';

type Props = {
	tag?: number;
	selectedTag?: number;
	icon: As;
	setSelectedTag?: (tag: number) => void;
	isOpen?: boolean;
	text?: string;
};

const IconSideBar = ({
	tag,
	selectedTag,
	icon,
	setSelectedTag,
	isOpen,
	text,
}: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const notSelectedColor = useColorModeValue(
		'brand.light.gray',
		'dark.coolGray',
	);

	const handleClick = () => {
		if (tag !== undefined && setSelectedTag) {
			setSelectedTag(tag);
		}
	};

	return (
		<Flex
			px='10px'
			py='10px'
			onClick={handleClick}
			cursor='pointer'
			transition='background-color 0.5s ease-in-out'
			alignItems='center'
			gap={2}
			bg={tag ? (tag === selectedTag ? borderColor : 'none') : 'none'}
			m='5px'
			borderRadius='5px'
			_hover={{ bg: tag !== selectedTag ? 'brand.purple.910' : 'auto' }}
		>
			<Icon
				as={icon}
				transition='color 0.5s ease-in-out'
				color={
					tag
						? tag === selectedTag
							? 'white'
							: notSelectedColor
						: notSelectedColor
				}
				boxSize='26px'
			/>
			{isOpen && (
				<Text
					fontSize='16px'
					fontWeight={500}
					transition='color 0.5s ease-in-out'
					color={
						tag
							? tag === selectedTag
								? 'white'
								: notSelectedColor
							: notSelectedColor
					}
				>
					{text}
				</Text>
			)}
		</Flex>
	);
};

export default IconSideBar;
