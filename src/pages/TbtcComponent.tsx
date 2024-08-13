import { Button, Grid, Stack } from '@chakra-ui/react';

import { CustomBox } from '../components/CustomBox';
import BalanceComponent from './components/Minting/BalanceComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';
import { useWeb3ModalAccount } from '@web3modal/ethers5/react';
import MyActivityComponent from './components/Minting/MyActivityComponent';
import { useEffect, useState } from 'react';
import MintComponent from './components/Minting/MintComponent';
import UnmintComponent from './components/Minting/UnmintComponent';
import ResumeDepositComponent from './components/Minting/ResumeDepositComponent';

type Props = {};

const TbtcComponent = (props: Props) => {
	const [step, setStep] = useState(1);
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
		<>
			<Grid
				maxW='1120px'
				minH='720px'
				mx='auto'
				mt={isConnected ? '0px' : '64px'}
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
				<Stack gap='20px'>
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
						<MintComponent
							isConnected={isConnected}
							step={step}
							setStep={setStep}
						/>
					) : tabSelected === 2 ? (
						<UnmintComponent
							isConnected={isConnected}
							setTabSelected={setTabSelected}
						/>
					) : (
						<ResumeDepositComponent />
					)}
				</Stack>
			</Grid>
		</>
	);
};

export default TbtcComponent;
