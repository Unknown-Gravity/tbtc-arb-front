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
import {
	ChangeEvent,
	Dispatch,
	DragEvent,
	SetStateAction,
	useState,
} from 'react';
import DragAndDropIcon from '../../../../../assets/icons/DragAndDropIcon';

interface Props {
	fileName: string | null;
	setFileName: Dispatch<SetStateAction<string | null>>;
	setFileContent: Dispatch<SetStateAction<string | ArrayBuffer | null>>; // Añadimos prop para manejar el contenido del archivo
}

const DragAndDropComponent = ({
	fileName,
	setFileName,
	setFileContent,
}: Props) => {
	const iconColor = useColorModeValue('brand.purple.500', 'white');
	const theme = useTheme();
	const [isDraggingInside, setIsDraggingInsise] = useState(false);

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingInsise(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingInsise(false);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDraggingInsise(false);

		const files = event.dataTransfer.files;
		if (files.length > 0) {
			const file = files[0];
			setFileName(file.name);
			readFileContent(file); // Leemos el contenido del archivo
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			setFileName(file.name);
			readFileContent(file); // Leemos el contenido del archivo
		}
	};

	const readFileContent = (file: File) => {
		const reader = new FileReader();
		reader.onload = e => {
			setFileContent(e.target?.result || null); // Guardamos el contenido del archivo
		};
		reader.readAsText(file); // Puedes cambiar readAsText a readAsDataURL o readAsArrayBuffer dependiendo de tus necesidades
	};

	const bgColor = useColorModeValue('gray.100', 'gray');

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
				filter={isDraggingInside ? 'brightness(0.8)' : 'none'}
				bg={isDraggingInside ? bgColor : 'none'}
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
					{fileName && (
						<Text mt='4'>
							Selected file:{' '}
							<Text variant='purple'>{fileName}</Text>
						</Text>
					)}
				</Box>
			</Stack>
		</Stack>
	);
};

export default DragAndDropComponent;
