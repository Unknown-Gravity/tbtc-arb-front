import {
	As,
	border,
	Flex,
	Icon,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	tag?: number;
	selectedTag?: number;
	icon: As;
	setSelectedTag?: Dispatch<SetStateAction<number | undefined>>;
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

	return (
		<Flex
			px='10px'
			py='10px'
			onClick={setSelectedTag ? () => setSelectedTag(tag) : undefined}
			cursor='pointer'
			transition='background-color 0.5s ease-in-out'
			alignItems='center'
			gap={2}
			bg={tag ? (tag === selectedTag ? borderColor : 'none') : 'none'}
			m='5px'
			borderRadius='5px'
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
