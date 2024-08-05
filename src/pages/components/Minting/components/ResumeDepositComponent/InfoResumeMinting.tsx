import { Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import {
	DarkInfoResumeImage,
	LightInfoResumeImage,
} from '../../../../../assets/images';

type Props = {};

const InfoResumeMinting = (props: Props) => {
	const image = useColorModeValue(LightInfoResumeImage, DarkInfoResumeImage);
	return (
		<Stack spacing='24px' maxW={{ xl: '201px' }}>
			<Text
				fontSize='14px'
				lineHeight='16px'
				letterSpacing='0.075em'
				fontWeight={600}
			>
				RESUMING A DEPOSIT
			</Text>
			<Text fontSize='12px' lineHeight='16px'>
				Each deposit is issued an individual Deposit Receipt. These
				receipts contain a wallet public key, a refund public key and a
				refund lock time of your deposits.
				<br />
				<br /> To resume a deposit you will need to download the Deposit
				Receipt and upload it.
				<br />
				<br /> This action will resume your bridging and will take you
				to Step 3 of the bridging. <br />
				<br />
				You can resume a an interrupted deposit in a 2 week period since
				the BTC transaction.
				<br />
				<br />
			</Text>
			<Image src={image} />
		</Stack>
	);
};

export default InfoResumeMinting;
