import { useEffect, useState } from 'react';
import {
	Box,
	Flex,
	Stack,
	Text,
	Input,
	useColorMode,
	Link,
	Icon,
	useColorModeValue,
} from '@chakra-ui/react';
import { CustomBox } from '../components/CustomBox';
import {
	LightLoyaltyProgramGrid,
	DarkLoyaltyProgramGrid,
} from '../assets/images';
import LeaderboardComponent from './components/Loyalty/LeaderboardComponent';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowUpRight } from 'react-icons/bs';

/**
 * @name Loyalty
 *
 * @description This component displays the Loyalty page.
 *
 * @returns {JSX.Element}
 */

const loyaltyLinks = [
	{
		name: 'Curve tBTC/WBTC Pool',
		link: 'https://curve.fi/#/arbitrum/pools/factory-stable-ng-69/deposit',
	},
	{
		name: 'Uniswap V3 tBTC/WBTC Pool',
		link: 'https://merkl.angle.money/arbitrum/pool/0xe9e6b9aAAfaf6816C3364345F6eF745CcFC8660a',
	},
	{
		name: 'Uniswap V3 tBTC/ETH Pool',
		link: 'https://merkl.angle.money/arbitrum/pool/2/0xCb198a55e2a88841E855bE4EAcaad99422416b33',
	},
];

const Loyalty = () => {
	const { colorMode } = useColorMode();
	const [searchQuery, setSearchQuery] = useState(''); // New state for search query
	const acceptedTerms = localStorage.getItem('acceptedTerms');
	const bgImage = useColorModeValue(
		LightLoyaltyProgramGrid,
		DarkLoyaltyProgramGrid,
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!acceptedTerms) {
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
					bgImage={bgImage}
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
							<Text fontSize='15px' fontWeight={300} mb='12px'>
								The program runs for 30 weeks, starting on 
								September 9th and concluding on April 7th. 
								Join now to maximize your rewards!
							</Text>
							<Text fontSize='15px' fontWeight={500} mt='24px'>
								Links to the pools:
							</Text>
							<Flex
								fontSize='15px'
								fontWeight={500}
								direction='row'
								gap={8}
							>
								{loyaltyLinks.map((link, index) => (
									<Link
										key={index}
										display='flex'
										justifyContent='center'
										gap={2}
										href={link.link}
										variant='purpleDarkGradient'
										isExternal
									>
										{link.name}
										<Icon as={BsBoxArrowUpRight} />
									</Link>
								))}
							</Flex>
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
