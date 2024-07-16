import { Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import { IoMdLink } from 'react-icons/io';
import { contracts } from '../../../data/mockData';
import { Link } from 'react-router-dom';
import DocumentBoxComponent from './DocumentBoxComponent';

const ContractsSectionComponent = () => {
	return (
		<Stack as={CustomBox} w='100%' gap='20px' h='249px'>
			<Text fontSize='24px' fontWeight={700} lineHeight='16px'>
				CONTRACTS
			</Text>
			<Stack gap='8px'>
				{contracts.map((contract, index) => {
					return <DocumentBoxComponent contract={contract} />;
				})}
			</Stack>
		</Stack>
	);
};

export default ContractsSectionComponent;
