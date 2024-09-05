import { CustomBox } from '../../../../components/CustomBox';
import { Flex, Image, Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import { DarkJsonImage, LightJsonImage } from '../../../../assets/images';
import { UpRightIcon } from '../../../../assets/icons/UpRightIcon';

const JsonFileComponent = () => {
	const { colorMode } = useColorMode();

	return (
		<CustomBox
			as={Stack}
			maxW='100%'
			gap='30px'
			p='25px'
			h={{ base: 'auto', xl: '698px' }}
		>
			<Text fontSize='24px' fontWeight={700} lineHeight='16px'>
				JSON File for Fund Recoveries
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
				<Link variant='purpleDarkGradient'>
					here
					<UpRightIcon />
				</Link>
			</Text>
			<Flex h={'100%'} alignItems='flex-end' justifyContent='center'>
				<Image
					src={colorMode === 'light' ? LightJsonImage : DarkJsonImage}
					maxW={'200px'}
				/>
			</Flex>
		</CustomBox>
	);
};

export default JsonFileComponent;
