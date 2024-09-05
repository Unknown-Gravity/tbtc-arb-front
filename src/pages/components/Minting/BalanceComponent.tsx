import { CustomBox } from '../../../components/CustomBox';
import { BitcoinFilledIcon } from '../../../assets/icons/BitcoinFilledIcon';
import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BasicComponentProps } from '../../../interfaces/BasicComponentProps';
import BTCtoCurrencyComponent from '../../../components/BTCtoCurrencycomponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types/RootState';

/**
 * @name BalanceComponent
 * @description Displays the user's tBTC balance with a Bitcoin icon and conditional formatting based on connection status and color mode.
 *
 * @param {BasicComponentProps} props - The properties passed to the component, including connection status.
 *
 * @returns {JSX.Element} A component that shows the tBTC balance and a Bitcoin icon.
 *
 * @throws {Error} If the tbtcBalance is not available in the Redux store.
 */
const BalanceComponent = ({ isConnected }: BasicComponentProps) => {
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
				<Stack gap='10px' padding={isConnected ? '10px' : 0}>
					<Text fontSize='32px' lineHeight='32px' fontWeight={500}>
						{isConnected
							? parseFloat(tbtcBalance) === 0
								? 0
								: tbtcBalance.slice(0, 7)
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
					{isConnected && (
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
