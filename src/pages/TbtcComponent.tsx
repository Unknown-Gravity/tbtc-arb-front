import { Button, Grid, Stack } from '@chakra-ui/react';

import { CustomBox } from '../components/CustomBox';
import BalanceComponent from './components/Minting/BalanceComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import MyActivityComponent from './components/Minting/MyActivityComponent';
import { useEffect, useState } from 'react';
import MintComponent from './components/Minting/MintComponent';
import UnmintComponent from './components/Minting/UnmintComponent';

type Props = {};

const TbtcComponent = (props: Props) => {
	const [tabSelected, setTabSelected] = useState<number>();
	const accountInfo = useSelector((state: RootState) => state.account);
	const { isConnected } = useWeb3ModalAccount();

	const handleClick = (tab: number): void => {
		setTabSelected(tab);
		localStorage.setItem('tab', tab.toString());
	};

	useEffect(() => {
		const tab = localStorage.getItem('tab');
		tab && setTabSelected(parseInt(tab));
	}, []);

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
			<Stack gap='20px' maxH='704px'>
				<BalanceComponent
					account={accountInfo}
					isConnected={isConnected}
				/>
				<MyActivityComponent
					account={accountInfo}
					isConnected={isConnected}
				/>
			</Stack>
			<Stack gap='20px' maxH='704px'>
				<CustomBox h='fit-content' p='5px'>
					<Grid
						templateColumns='repeat(2, minmax(0, 1fr))'
						gap='12px'
					>
						<Button
							variant='lightpurple'
							isActive={tabSelected === 1 && true}
							onClick={() => handleClick(1)}
						>
							Mint
						</Button>
						<Button
							variant='lightpurple'
							isActive={tabSelected === 2 && true}
							onClick={() => handleClick(2)}
						>
							Unmint
						</Button>
					</Grid>
				</CustomBox>
				{tabSelected === 1 ? (
					<MintComponent isConnected={isConnected} />
				) : (
					<UnmintComponent isConnected={isConnected} />
				)}
			</Stack>
		</Grid>
	);
};

export default TbtcComponent;
