import { Button, Grid, Stack } from '@chakra-ui/react';

import { CustomBox } from '../components/CustomBox';
import BalanceComponent from './components/Minting/BalanceComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import MyActivityComponent from './components/Minting/MyActivityComponent';
import { useState } from 'react';
import MintComponent from './components/Minting/MintComponent';

type Props = {};

const Minting = (props: Props) => {
	const [tabSelected, setTabSelected] = useState<number>(0);
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
				<CustomBox h='fit-content' p='5px'>
					<Grid
						templateColumns='repeat(2, minmax(0, 1fr))'
						gap='12px'
					>
						<Button
							variant='lightpurple'
							isActive={tabSelected === 1 && true}
							onClick={() => setTabSelected(1)}
						>
							Mint
						</Button>
						<Button
							variant='lightpurple'
							isActive={tabSelected === 2 && true}
							onClick={() => setTabSelected(2)}
						>
							Unmint
						</Button>
					</Grid>
				</CustomBox>
				<MintComponent isConnected={isConnected} />
			</Stack>
		</Grid>
	);
};

export default Minting;
