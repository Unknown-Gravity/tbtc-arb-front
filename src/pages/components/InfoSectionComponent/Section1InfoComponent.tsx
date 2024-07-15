import { Flex, Stack, Text, Theme, useTheme } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Section1InfoComponent = () => {
	const theme: Theme = useTheme();

	return (
		<CustomBox
			minW={{ base: '100%', '2xl': '1134px' }}
			mx='auto'
			p='30px, 40px, 30px, 40px'
		>
			<Flex
				flexDir={{ base: 'column', md: 'row' }}
				gap={{ base: 5 }}
				justifyContent='space-between'
			>
				<Stack gap='15px' maxW='463px'>
					<Text fontSize='24px' fontWeight={700}>
						Bridging duration
					</Text>
					<Flex
						color={'brand.purple.900'}
						alignItems='center'
						gap={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
						<Text fontSize='16px'>
							Your tBTC token will arrive in{' '}
							<Text as='span' variant='purpleDarkGradient'>
								~ 1 to 3 hours
							</Text>{' '}
							after you initiate minting, depending on your
							deposited amount.
						</Text>
					</Flex>
				</Stack>
				<Stack gap='15px' maxW='463px'>
					<Text fontSize='24px' fontWeight={700}>
						Minimum deposit
					</Text>
					<Flex
						color={'brand.purple.900'}
						alignItems='center'
						gap={2}
					>
						<BsFillArrowRightCircleFill
							style={{ minWidth: '16px' }}
						/>
						<Text fontSize='16px'>
							The minimum deposit at launch is{' '}
							<Text as='span' variant='purpleDarkGradient'>
								0.01 BTC.
							</Text>{' '}
							Depositing less than the minimum can mean losing
							access to your funds.
						</Text>
					</Flex>
				</Stack>
			</Flex>
		</CustomBox>
	);
};

export default Section1InfoComponent;
