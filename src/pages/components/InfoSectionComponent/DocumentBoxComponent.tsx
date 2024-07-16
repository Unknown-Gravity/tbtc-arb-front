import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IoMdLink } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Contract, Report } from '../../../data/mockData';
import { BiSolidFileBlank } from 'react-icons/bi';

type Props = {
	contract?: Contract;
	report?: Report;
};

const DocumentBoxComponent = (props: Props) => {
	const boxBg = useColorModeValue('light.lightGray', 'dark.focusGray');
	return (
		<Flex
			bg={boxBg}
			p='16px'
			borderRadius='10px'
			justifyContent='space-between'
			alignItems='center'
			h={props.contract ? '80px' : '96px'}
		>
			<Flex alignItems='center' gap='16px'>
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
					<Text fontSize='18px' fontWeight='400'>
						{props.contract?.name}
						{props.report?.name}
					</Text>
					{props.report && (
						<Text fontSize='14px' fontWeight='400' variant='gray'>
							{props.report.description}
						</Text>
					)}
				</Stack>
			</Flex>
			<Text
				as={Link}
				to={props.contract?.link || props.report?.link}
				target='_blank'
				rel='noopener noreferrer'
				variant={'purpleDarkGradient'}
				whiteSpace='nowrap'
			>
				Read More
			</Text>
		</Flex>
	);
};

export default DocumentBoxComponent;
