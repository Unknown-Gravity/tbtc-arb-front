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
import { ChainIdentifier, Hex } from '@keep-network/tbtc-v2.ts';
import { JsonData } from '../../../../../interfaces/JsonData.interface';

interface Props {
	fileName: string | null;
	setFileName: Dispatch<SetStateAction<string | null>>;
	setFileContent: Dispatch<JsonData>; // Añadimos prop para manejar el contenido del archivo
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
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			console.log('🚀 ~ handleChange ~ file:', file);
			setFileName(file.name);
			readFileContent(file);
		}
	};

	const readFileContent = (file: File) => {
		const reader = new FileReader();

		reader.onload = e => {
			try {
				// Parse the JSON content from the file
				const parsedContent = JSON.parse(e.target?.result as string);
				console.log(
					'🚀 ~ readFileContent ~ parsedContent:',
					parsedContent,
				);

				// Validate and cast the parsed content to the Receipt type
				const fileContent = {
					depositor: {
						identifierHex: parsedContent.depositor.identifierHex,
						equals: (identifier: ChainIdentifier) => {
							return (
								parsedContent.depositor.identifierHex ===
								identifier.identifierHex
							);
						},
					},
					refundLocktime: Hex.from(parsedContent.refundLocktime),
					refundPublicKeyHash: Hex.from(
						parsedContent.refundPublicKeyHash,
					),
					blindingFactor: Hex.from(parsedContent.blindingFactor),
					ethAddress: parsedContent.ethAddress,
					walletPublicKeyHash: Hex.from(
						parsedContent.walletPublicKeyHash,
					),
					btcRecoveryAddress: parsedContent.btcRecoveryAddress,
					btcDepositAddress: parsedContent.btcDepositAddress,
				};
				console.log('🚀 ~ readFileContent ~ receipt:', fileContent);
				// Set the file content in the correct format
				setFileContent(fileContent);
			} catch (error) {
				console.error('Error parsing file content:', error);
				// You can also handle errors here, like showing an alert or setting an error state
			}
		};
		reader.readAsText(file);
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
							<Text as='span' variant='purple'>
								{fileName}
							</Text>
						</Text>
					)}
				</Box>
			</Stack>
		</Stack>
	);
};

export default DragAndDropComponent;
