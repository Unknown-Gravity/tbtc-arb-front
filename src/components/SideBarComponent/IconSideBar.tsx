import {
	As,
	Box,
	Icon,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	tag?: number;
	selectedTag?: number;
	icon: As;
	setSelectedTag?: Dispatch<SetStateAction<number | undefined>>;
};

const IconSideBar = ({ tag, selectedTag, icon, setSelectedTag }: Props) => {
	const theme = useTheme();
	const borderColor = theme.colors.brand.purple[900];
	const notSelectedColor = useColorModeValue('brand.light.gray', 'white');
	return (
		<Box
			w='100%'
			px='10px'
			py='13px'
			onClick={
				setSelectedTag ? () => setSelectedTag(tag) : setSelectedTag
			}
			cursor='pointer'
			boxShadow={
				tag
					? tag === selectedTag
						? `5px 0px 0px  ${borderColor}`
						: `none`
					: 'none'
			}
			transition={'box-shadow 0.5s ease-in-out'}
		>
			<Icon
				as={icon}
				transition={'color 0.5s ease-in-out'}
				color={
					tag
						? tag === selectedTag
							? borderColor
							: notSelectedColor
						: notSelectedColor
				}
				boxSize='26px'
			/>
		</Box>
	);
};
export default IconSideBar;
