import React from 'react';
import { CustomBox } from '../../../components/CustomBox';
import { Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DarkJsonImage, LightJsonImage } from '../../../assets/images';

const JsonFileComponent = () => {
	const { colorMode } = useColorMode();

	return (
		<CustomBox
			as={Stack}
			maxW='100%'
			gap='20px'
			p={''}
			px='25px'
			pt='25px'
			pb='50px'
			h='738px'
		>
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
			<Image
				src={colorMode === 'light' ? LightJsonImage : DarkJsonImage}
				maxW={'256.63px'}
				alignSelf='center'
			/>
		</CustomBox>
	);
};

export default JsonFileComponent;
