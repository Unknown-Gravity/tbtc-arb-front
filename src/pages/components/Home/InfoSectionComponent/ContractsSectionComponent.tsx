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
	{
		name: 'L1 Bitcoin Depositor',
		link: 'https://etherscan.io/address/0x75A6e4A7C8fAa162192FAD6C1F7A6d48992c619A',
	},
	{
		name: 'L2 Bitcoin Depositor',
		link: 'https://arbiscan.io/address/0x1C8d7b744b474c080faADd5BF9AD965Be4258F9e',
	},
];

/**
 *
 * @name ContractsSectionComponent
 *
 * @description This component is a reusable component that displays the contracts section.
 *
 * @returns { JSX.Element }
 */

const ContractsSectionComponent = () => {
	return (
		<Stack
			as={CustomBox}
			w='100%'
			gap='20px'
			h={{ base: 'auto', xl: '430px' }}
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
