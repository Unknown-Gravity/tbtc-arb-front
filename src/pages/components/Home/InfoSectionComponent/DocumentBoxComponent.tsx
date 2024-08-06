import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { IoMdLink } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Contract, Report } from '../../../../data/mockData';
import { BiSolidFileBlank } from 'react-icons/bi';
import { useDownload } from '../../../../hooks/useDownload';

type Props = {
	contract?: Contract;
	report?: Report;
};

const DocumentBoxComponent = (props: Props) => {
	const boxBg = useColorModeValue('light.lightGray', 'dark.focusGray');
	const { downloadFile } = useDownload();

	const handleDownload = () => {
		console.log('hello!');
		const fileName = 'DATA.txt';
		const fileURL = '../../../assets/files/' + fileName;
		downloadFile(fileName, fileURL);
	};
	return (
		<Flex
			bg={boxBg}
			p='16px'
			borderRadius='10px'
			justifyContent='space-between'
			alignItems='center'
			h={{ base: 'auto', xl: props.contract ? '80px' : '96px' }}
			flexDir={{ base: 'column', xl: 'row' }}
		>
			<Flex
				alignItems='center'
				gap='16px'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Box
					p={'11px'}
					bg='brand.purple.900'
					w='fit-content'
					borderRadius='6px'
				>
					{props.contract ? (
						<IoMdLink size='26px' color='white' />
					) : (
						<BiSolidFileBlank size='26px' color='white' />
					)}
				</Box>
				<Stack gap='0.5px'>
					<Text
						fontSize='18px'
						fontWeight='400'
						textAlign={{ base: 'center', xl: 'start' }}
					>
						{props.contract?.name}
						{props.report?.name}
					</Text>
					{props.report && (
						<Text
							fontSize='14px'
							fontWeight='400'
							variant='gray'
							textAlign={{ base: 'center', xl: 'start' }}
						>
							{props.report.description}
						</Text>
					)}
				</Stack>
			</Flex>
			<Text
				as={Link}
				to={props.contract?.link}
				target={props.contract && '_blank'}
				rel={props.contract && 'noopener noreferrer'}
				variant={'purpleDarkGradient'}
				whiteSpace='nowrap'
				onClick={props.report && handleDownload}
			>
				Read More
			</Text>
		</Flex>
	);
};

export default DocumentBoxComponent;
