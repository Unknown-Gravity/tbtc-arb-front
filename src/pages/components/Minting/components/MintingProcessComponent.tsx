import { Box, Flex, Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BitcoinFilledIcon } from '../../../../assets/icons/BitcoinFilledIcon';
import ConnectButton from '../../../../components/ConnectButton';
import { currencyFormatter } from '../../../../utils/utils';
import BTCtoCurrencyComponent from '../../../../components/BTCtoCurrencycomponent';
import TransactionMinting from '../components/TransactionMinting';
import { transactionsMint } from '../../../../data/mockData';
type Props = {};

const MintingProcessComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Box h='100%' w='100%'>
			<Flex alignItems='center' gap={5}>
				<BitcoinFilledIcon
					color={
						colorMode === 'light' ? 'light.primaryGray' : 'white'
					}
					fill={colorMode === 'dark' ? 'brand.purple.900' : 'white'}
					boxSize='32px'
				/>
				<Text fontSize='16px' lineHeight='16px' fontWeight={600}>
					tBTC - MINTING PROCESS
				</Text>
			</Flex>
			<Text
				fontSize='24px'
				lineHeight='32px'
				fontWeight={500}
				mt='31.5px'
				textAlign='center'
			>
				Ready to mint tBTC?
			</Text>
			<ConnectButton w='100%' mt='16.5px' />
			<Text mt='24px' fontSize='16px'>
				TOTAL SUPPLY
			</Text>
			<Stack alignItems='center'>
				<Text
					fontSize='60px'
					lineHeight='64px'
					fontWeight={700}
					textAlign='center'
					mt='6px'
				>
					{currencyFormatter(3342.22, 'USD', 'none')}
					<Text
						as='span'
						fontSize='24px'
						lineHeight='32px'
						fontWeight={500}
					>
						{' '}
						tBTC
					</Text>
				</Text>
				<BTCtoCurrencyComponent btcAmount={3342.22} currency='USD' />
			</Stack>
			<Text mt='32px' fontSize='15px'>
				Protocol History
			</Text>
			<Stack mt='12px'>
				{transactionsMint.map((tx, index) => {
					return <TransactionMinting key={index} transaction={tx} />;
				})}
			</Stack>
			<Flex w='100%' justifyContent='center' mt='32px'>
				<Link variant='purpleDarkGradient'>View on Dune Analytics</Link>
			</Flex>
		</Box>
	);
};

export default MintingProcessComponent;
