import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { FiDatabase } from 'react-icons/fi';
import { TbDeviceIpadHorizontalSearch } from 'react-icons/tb';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { FC } from 'react';

const HeaderInfoComponent: FC = () => {
	return (
		<Stack
			alignItems='center'
			minW={{ base: '100%', '2xl': '1134px' }}
			mx='auto'
			my={10}
		>
			<Text fontSize='40px' fontWeight={700} mb={10} textAlign='center'>
				Trustless and Unstoppable
			</Text>
			<Flex
				w='100%'
				justifyContent='space-around'
				flexDir={{ base: 'column', md: 'row' }}
				gap={{ base: '100px', md: 0 }}
			>
				<Stack gap='12px' alignItems='center'>
					<Box
						p={'15px'}
						bg='brand.purple.900'
						w='fit-content'
						borderRadius='10px'
					>
						<TbDeviceIpadHorizontalSearch
							size='26px'
							color='white'
						/>
					</Box>
					<Text fontSize='17.9px' fontWeight={700}>
						Audited Contracts
					</Text>
					<Text fontSize='13.9px' variant='gray'>
						Lorem ipsum
					</Text>
				</Stack>
				<Stack gap='12px' alignItems='center'>
					<Box
						p={'15px'}
						bg='brand.purple.900'
						w='fit-content'
						borderRadius='10px'
					>
						<BsCurrencyBitcoin size='26px' color='white' />
					</Box>
					<Text fontSize='17.9px' fontWeight={700}>
						A Bitcoin-backed
					</Text>
					<Text fontSize='13.9px' variant='gray'>
						Lorem ipsum
					</Text>
				</Stack>
				<Stack gap='12px' alignItems='center'>
					<Box
						p={'15px'}
						bg='brand.purple.900'
						w='fit-content'
						borderRadius='10px'
					>
						<FiDatabase size='26px' color='white' />
					</Box>
					<Text fontSize='17.9px' fontWeight={700}>
						Lorem Ipsum
					</Text>
					<Text fontSize='13.9px' variant='gray'>
						Lorem ipsum
					</Text>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default HeaderInfoComponent;
