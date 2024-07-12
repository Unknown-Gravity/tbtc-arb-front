import {
	As,
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
	const notSelectedColor = useColorModeValue('brand.light.gray', 'white');

	return (
		<Flex
			w='calc(100% - 5px)'
			px='15px'
			py='13px'
			onClick={setSelectedTag ? () => setSelectedTag(tag) : undefined}
			cursor='pointer'
			boxShadow={
				tag
					? tag === selectedTag
						? `5px 0px 0px ${borderColor}`
						: 'none'
					: 'none'
			}
			transition='box-shadow 0.5s ease-in-out'
			alignItems='center'
			gap={2}
		>
			<Icon
				as={icon}
				transition='color 0.5s ease-in-out'
				color={
					tag
						? tag === selectedTag
							? borderColor
							: notSelectedColor
						: notSelectedColor
				}
				boxSize='26px'
			/>
			{isOpen && (
				<Text
					fontSize='16px'
					fontWeight={500}
					color={
						tag
							? tag === selectedTag
								? borderColor
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
