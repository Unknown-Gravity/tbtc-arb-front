import { useState } from 'react';
import { Box, Flex, Stack, Text, Input, useColorMode } from '@chakra-ui/react';
import { CustomBox } from '../components/CustomBox';
import {
	LightLoyaltyProgramGrid,
	DarkLoyaltyProgramGrid,
} from '../assets/images';
import LeaderboardComponent from './components/Loyalty/LeaderboardComponent';

type Props = {};

const Loyalty = (props: Props) => {
	const { colorMode } = useColorMode();
	const [searchQuery, setSearchQuery] = useState(''); // New state for search query

	return (
		<Box
			bgSize='auto'
			bgRepeat='repeat'
			w='100%'
			left={0}
			pt='80px'
			pb='80px'
		>
			<Stack
				position='relative'
				gap={5}
				maxW={{ base: '100%', '2xl': '1134px' }}
				mx='auto'
			>
				<Box
					borderRadius='14px'
					boxShadow={
						colorMode === 'light' ? '0px 0px 7px #00000025' : 'none'
					}
					p='32px'
					minW={{ base: '100%', '2xl': '1134px' }}
					mx='auto'
					position='relative'
					overflow='hidden'
					bgImage={
						colorMode === 'light'
							? `url('${LightLoyaltyProgramGrid}')`
							: `url('${DarkLoyaltyProgramGrid}')`
					}
					bgRepeat='no-repeat'
					bgPosition='top center'
				>
					<Flex
						flexDir={{ base: 'column', lg: 'row' }}
						alignItems='center'
						justifyContent='space-between'
						gap={{ base: 8 }}
					>
						<Stack gap='15px' maxW='720px'>
							<Text fontSize='24px' fontWeight={600}>
								Claim Your Share of the 50,000 ARB Treasure
								Chest
							</Text>
							<Text fontSize='15px' fontWeight={300} mt='16px'>
								Unlock your share of the Treasure Chest—50,000
								ARB + 25% boost in T is up for grabs! This
								loyalty program rewards liquidity providers not
								just for their participation but for their
								commitment.
							</Text>
							<Text fontSize='15px' fontWeight={300} mb='12px'>
								Points are assigned based on your weighted
								average liquidity across Curve and Uniswap V3
								pools on Arbitrum. When the program concludes,
								the points determine your cut of the treasure.
								The more liquidity you provide, the more
								treasure you’ll claim.
							</Text>
						</Stack>
					</Flex>
				</Box>
				<CustomBox h='fit-content' w='100%' p='25px'>
					<Stack gap='16px'>
						<Flex px='12px' w='full' justifyContent='space-between'>
							<Text
								fontSize='24px'
								fontWeight={600}
								textTransform='uppercase'
							>
								leaderboard
							</Text>
							<Input
								placeholder='Search by wallet address'
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								border='transparent'
								maxW='300px'
								fontSize='12px'
							/>
						</Flex>
						<LeaderboardComponent searchQuery={searchQuery} />
					</Stack>
				</CustomBox>
			</Stack>
		</Box>
	);
};

export default Loyalty;
