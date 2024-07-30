import { Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import { contracts } from '../../../data/mockData';
import DocumentBoxComponent from './DocumentBoxComponent';

const ContractsSectionComponent = () => {
	return (
		<Stack as={CustomBox} w='100%' gap='20px' h='249px' p='25px'>
			<Text fontSize='24px' fontWeight={700} lineHeight='13px'>
				CONTRACTS
			</Text>
			<Stack gap='8px'>
				{contracts.map((contract, index) => {
					return (
						<DocumentBoxComponent key={index} contract={contract} />
					);
				})}
			</Stack>
		</Stack>
	);
};

export default ContractsSectionComponent;
