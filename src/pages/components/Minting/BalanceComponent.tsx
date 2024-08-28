import { CustomBox } from '../../../components/CustomBox';
import { BitcoinFilledIcon } from '../../../assets/icons/BitcoinFilledIcon';
import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import BTCtoCurrencyComponent from '../../../components/BTCtoCurrencycomponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';

const BalanceComponent = (props: BasicComponentProps) => {
	const { colorMode } = useColorMode();
	const tbtcBalance = useSelector(
		(state: RootState) => state.account.tbtcBalance,
	);
	return (
		<CustomBox h='fit-content' p='25px'>
			<Stack gap='16px'>
				<Flex gap='8px'>
					<BitcoinFilledIcon
						color={colorMode === 'light' ? 'light.gray' : 'white'}
						fill={
							colorMode === 'dark' ? 'brand.purple.900' : 'white'
						}
						boxSize='16px'
					/>
					<Text fontSize='16px' lineHeight='16px' fontWeight='600'>
						tBTC BALANCE
					</Text>
				</Flex>
				<Stack gap='10px' padding={props.isConnected ? '10px' : 0}>
					<Text fontSize='32px' lineHeight='32px' fontWeight={500}>
						{props.isConnected
							? parseFloat(tbtcBalance).toFixed(5)
							: '--'}{' '}
						<Text
							as='span'
							fontSize='14px'
							fontWeight={400}
							variant='gray'
							lineHeight='20px'
						>
							tBTC
						</Text>
					</Text>
					{props.isConnected && (
						<BTCtoCurrencyComponent
							btcAmount={parseFloat(tbtcBalance)}
							currency='USD'
							variant='gray'
						/>
					)}
				</Stack>
			</Stack>
		</CustomBox>
	);
};

export default BalanceComponent;
