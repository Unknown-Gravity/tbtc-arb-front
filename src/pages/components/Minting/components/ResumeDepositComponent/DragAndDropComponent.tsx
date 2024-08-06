import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Text,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { ChangeEvent, DragEvent } from 'react';
import DragAndDropIcon from '../../../../../assets/icons/DragAndDropIcon';

const DragAndDropComponent = () => {
	const iconColor = useColorModeValue('brand.purple.500', 'white');
	const theme = useTheme();
	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		console.log('🚀 ~ handleDragOver ~ ent:', event);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		console.log('🚀 ~ handleDragOver ~ ent:', event);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		console.log('🚀 ~ handleDragOver ~ ent:', event);

		// Here we'll handle the dropped files
	};

	const handleChange = (event: ChangeEvent) => {
		event.preventDefault();
		console.log('🚀 ~ handleDragOver ~ ent:', event);
	};
	return (
		<Stack spacing='8px'>
			<Flex justifyContent='space-between'>
				<Text fontWeight={600} lineHeight='24px'>
					Upload File
				</Text>
				<Text
					variant='grayPurpleGradient'
					lineHeight='20px'
					textDecor='none'
					fontSize='14px'
				>
					Required
				</Text>
			</Flex>
			<Stack
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				w='100%'
				h='312px'
				borderRadius='6px'
				border={`2px dashed ${theme.colors.light.coolGray}`}
				alignItems='center'
				justifyContent='center'
				textAlign='center'
			>
				<Box>
					<DragAndDropIcon
						color={iconColor}
						boxSize='80px'
						h='64.17px'
					/>
					<Text fontSize='16px' lineHeight='24px' variant='gray2'>
						Drag and drop your file here
					</Text>
					<Text
						fontSize='16px'
						lineHeight='28px'
						fontWeight={600}
						variant='coolGray'
					>
						OR
					</Text>
					<FormControl>
						<Button
							as={FormLabel}
							variant='grayOutlined'
							cursor='pointer'
							m='0'
							mt='12px'
						>
							Choose File
						</Button>
						<Input type='file' hidden onChange={handleChange} />
					</FormControl>
				</Box>
			</Stack>
		</Stack>
	);
};

export default DragAndDropComponent;
