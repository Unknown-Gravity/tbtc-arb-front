import { Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';

type Props = { onClick: () => void };

const UnmintingDoneComponent = (props: Props) => {
	return (
		<Fragment>
			<Text
				fontSize='20px'
				lineHeight='24.2px'
				fontWeight={600}
				my='35px'
				textAlign='center'
			>
				Success!
			</Text>
			<Divider orientation='horizontal' mb='14px' />
			<Stack spacing='14px'>
				<Flex justifyContent='space-between'>
					<Text variant='coolGray' fontSize='14px' lineHeight='20px'>
						Ethereum Gas Cost
					</Text>
					<Text fontSize='14px' lineHeight='20px'>
						~50 gWEI
					</Text>
				</Flex>
				<Flex justifyContent='space-between'>
					<Text variant='coolGray' fontSize='14px' lineHeight='20px'>
						Threshold Networkd Fee
					</Text>
					<Text fontSize='14px' lineHeight='20px'>
						0.01 BTC
					</Text>
				</Flex>
			</Stack>
			<Button
				variant='purple'
				mt='35px'
				h='48px'
				w='100%'
				onClick={props.onClick}
			>
				New Mint
			</Button>
		</Fragment>
	);
};

export default UnmintingDoneComponent;
