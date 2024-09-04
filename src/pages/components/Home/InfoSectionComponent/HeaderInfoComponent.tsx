import { Grid, Stack, Text } from '@chakra-ui/react';
import { FiDatabase } from 'react-icons/fi';
import { TbDeviceIpadHorizontalSearch } from 'react-icons/tb';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { FC } from 'react';
import LittleInfoComponent from './LittleInfoComponent';

const infos = [
	{
		header: 'Audited Contracts',
		body: 'Our smart contracts have undergone rigorous security audits conducted by the reputable firms Mixbytes and Cantina. We invite you to check out our app which is now fully operational and accessible.',
		icon: TbDeviceIpadHorizontalSearch,
	},
	{
		header: 'A Bitcoin-backed',
		body: 'tBTC is a decentralized, BTC-backed token with 1-1 price peg to Bitcoin. It allows holders to use Bitcoin on DeFi.',
		icon: BsCurrencyBitcoin,
	},
	{
		header: 'Open-source',
		body: 'tBTC is an open-source project created by Thesis and operated by the Threshold Network.',
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
				Trustless and Unstoppable
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
