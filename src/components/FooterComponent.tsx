import { color, Flex, Grid, Stack, Text, useColorMode } from '@chakra-ui/react';
import React from 'react';
import ThresholdIcon from '../assets/icons/ThresholdIcon';
import { BitcoinIcon } from '../assets/icons/BitcoinIcon';
import { BitcoinFilledIcon } from '../assets/icons/BitcoinFilledIcon';

const FooterComponent = () => {
	const { colorMode } = useColorMode();
	return (
		<Flex minW={{ base: '100%', '2xl': '1134px' }} mx='auto'>
			<Stack>
				<Flex gap={2}>
					<Stack gap={0} alignItems='flex-end'>
						<ThresholdIcon
							color={
								colorMode === 'light'
									? 'light.primaryGray'
									: 'white'
							}
							boxSize='127px'
							h='fit-content'
						/>
						<Text variant='gray'>tBTC</Text>
					</Stack>
					<BitcoinFilledIcon
						color='brand.purple.900'
						boxSize='56px'
					/>
				</Flex>
			</Stack>
		</Flex>
	);
};

export default FooterComponent;
