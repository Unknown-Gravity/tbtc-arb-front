import React from 'react';
import { CustomBox } from '../../../components/CustomBox';
import { Flex, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DarkJsonImage, LightJsonImage } from '../../../assets/images';

const JsonFileComponent = () => {
	const { colorMode } = useColorMode();

	return (
		<CustomBox as={Stack} maxW='100%' gap='20px' p='25px' h='738px'>
			<Text fontSize='24px' fontWeight={700} lineHeight='16px'>
				JSON file for fund recoveries
			</Text>
			<Text fontSize='14px'>
				The JSON file is important to save in case you need to recover
				your funds.
			</Text>
			<Text fontSize='14px'>
				It’s important to keep this JSON file until you have
				successfully initiated tBTC minting.
			</Text>
			<Text fontSize='14px' w='100%' overflow='wrap'>
				This file contains your BTC recovery address, the wallet's
				public key, the refund public key, and the refund lock time of
				this deposit. It can be used to reconstruct the deposit address
				in case of system error.
			</Text>
			<Text fontSize='14px'>
				Each new deposit will generate a new JSON file. Take note:
				Recovery time lock is currently 9 months.
			</Text>
			<Text fontSize='14px'>
				Recovery guide can be found{' '}
				<Text as={Link} variant='purpleDarkGradient'>
					here
				</Text>
			</Text>
			<Flex h={'100%'} alignItems='center' justifyContent='center'>
				<Image
					src={colorMode === 'light' ? LightJsonImage : DarkJsonImage}
					maxW={'256.63px'}
					alignSelf='center'
				/>
			</Flex>
		</CustomBox>
	);
};

export default JsonFileComponent;
