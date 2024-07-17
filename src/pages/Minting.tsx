import { Grid, Stack } from '@chakra-ui/react';

import { CustomBox } from '../components/CustomBox';
import BalanceComponent from './components/Minting/BalanceComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import MyActivityComponent from './components/Minting/MyActivityComponent';

type Props = {};

const Minting = (props: Props) => {
	const accountInfo = useSelector((state: RootState) => state.account);
	console.log('🚀 ~ Minting ~ accountInfo:', accountInfo);
	const { isConnected } = useWeb3ModalAccount();

	return (
		<Grid
			maxW='1120px'
			minH='720px'
			mt='64px'
			mx='auto'
			gap='20px'
			templateColumns={{
				base: 'minmax(0, 1fr)',
				xl: 'minmax(0, 280px) minmax(0, 820px)',
			}}
		>
			<Stack gap='20px'>
				<BalanceComponent
					account={accountInfo}
					isConnected={isConnected}
				/>
				<MyActivityComponent
					account={accountInfo}
					isConnected={isConnected}
				/>
			</Stack>
			<Stack gap='20px'>
				<CustomBox h='50px'></CustomBox>
				<CustomBox h='100%'></CustomBox>
			</Stack>
		</Grid>
	);
};

export default Minting;
