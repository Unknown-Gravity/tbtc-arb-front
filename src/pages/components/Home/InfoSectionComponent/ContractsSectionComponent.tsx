import { Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import DocumentBoxComponent from './DocumentBoxComponent';

const contracts = [
	{
		name: 'Token Contract',
		link: 'https://arbiscan.io/address/0x6c84a8f1c29108F47a79964b5Fe888D4f4D0dE40',
	},
	{
		name: 'Bridge Contract',
		link: 'https://etherscan.io/address/0x5e4861a80B55f035D899f66772117F00FA0E8e7B',
	},
];

const ContractsSectionComponent = () => {
	return (
		<Stack
			as={CustomBox}
			w='100%'
			gap='20px'
			h={{ base: 'auto', xl: '249px' }}
			p='25px'
		>
			<Text fontSize='24px' fontWeight={700} lineHeight='13px'>
				Contracts
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
