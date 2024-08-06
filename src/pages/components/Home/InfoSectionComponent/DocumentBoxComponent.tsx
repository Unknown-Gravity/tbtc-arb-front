import {
	Box,
	Flex,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { IoMdLink } from 'react-icons/io';
import { Contract, Report } from '../../../../data/mockData';
import { BiSolidFileBlank } from 'react-icons/bi';
import { UpRightIcon } from '../../../../assets/icons/UpRightIcon';

type Props = {
	contract?: Contract;
	report?: Report;
};

const DocumentBoxComponent = (props: Props) => {
	const boxBg = useColorModeValue('light.lightGray', 'dark.focusGray');
	const filter = useColorModeValue('brightness(0.9)', 'brightness(1.15)');

	return (
		<Flex
			bg={boxBg}
			p='16px'
			borderRadius='10px'
			justifyContent='space-between'
			alignItems='center'
			h={{ base: 'auto', xl: props.contract ? '80px' : '96px' }}
			flexDir={{ base: 'column', xl: 'row' }}
			as={Link}
			href={props.contract?.link || props.report?.link}
			rel={props.contract && 'noopener noreferrer'}
			isExternal={true}
			transition='filter 0.2s'
			_hover={{
				textDecor: 'none',
				filter: filter,
			}}
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
			<Link variant={'purpleDarkGradient'} whiteSpace='nowrap'>
				Read More
				<UpRightIcon />
			</Link>
		</Flex>
	);
};

export default DocumentBoxComponent;
