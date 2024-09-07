import { Grid, Stack, Text } from '@chakra-ui/react';
import { FiDatabase } from 'react-icons/fi';
import { TbDeviceIpadHorizontalSearch } from 'react-icons/tb';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { FC } from 'react';
import LittleInfoComponent from './LittleInfoComponent';

const infos = [
	{
		header: 'Battle-tested',
		body: 'tBTC on Threshold has securely minted over 11,000 BTC. tBTC smart contracts have undergone rigorous security reviews conducted by Mixbytes and Cantina. Threshold offers a $500k bug bounty program to encourage ongoing scrutiny of the protocol.',
		icon: TbDeviceIpadHorizontalSearch,
	},
	{
		header: 'Decentralized ',
		body: 'tBTC is Threshold’s decentralized bridge to bring BTC to Decentralized Finance (DeFi) without reliance on centralized entities. It allows holders to permissionlessly use Bitcoin in DeFi. Redeemable by anyone, 1-1 for BTC.',
		icon: BsCurrencyBitcoin,
	},
	{
		header: 'Open-source',
		body: 'tBTC is an open-source project developed by Thesis and operated by the Threshold Network.',
		icon: FiDatabase,
	},
];

const HeaderInfoComponent: FC = () => {
	return (
		<Stack
			alignItems='center'
			minW={{ base: '100%', xl: '1134px' }}
			mx='auto'
			my={10}
		>
			<Text fontSize='40px' fontWeight={700} mb={10} textAlign='center'>
				Trust-minimized and Permissionless
			</Text>
			<Grid
				gridTemplateColumns={{ xl: 'repeat(3, minmax(0 ,1fr))' }}
				w='100%'
				gap={{ base: '100px', md: 50 }}
			>
				{infos.map((info, index) => {
					return (
						<LittleInfoComponent
							key={index}
							header={info.header}
							body={info.body}
							icon={info.icon}
						/>
					);
				})}
			</Grid>
		</Stack>
	);
};

export default HeaderInfoComponent;
