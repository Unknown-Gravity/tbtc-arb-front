import { Stack, Text } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import DocumentBoxComponent from './DocumentBoxComponent';

const contracts = [
	{
		name: 'Token Contract',
		link: 'https://sepolia.etherscan.io/address/0xE4835Ef9185847d1b7891267f3181172F7B96753#code#F1#L1',
	},
	{
		name: 'Bridge Contract',
		link: 'https://sepolia.etherscan.io/address/0xE4835Ef9185847d1b7891267f3181172F7B96753#code#F18#L1',
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
