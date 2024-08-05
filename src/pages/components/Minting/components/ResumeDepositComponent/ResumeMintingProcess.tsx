import React from 'react';
import HeaderStepsMintingComponent from '../MintingProcess/HeaderStepsMintingComponent';
import { Button, Link, Stack, Text } from '@chakra-ui/react';
import DragAndDropComponent from './DragAndDropComponent';

type Props = {};

const ResumeMintingProcess = (props: Props) => {
	return (
		<Stack spacing='25px' w={{ base: '100%', xl: '456px' }}>
			<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
			<Text fontSize='18px' lineHeight='28px' fontWeight={400}>
				<Text fontWeight={600} as='span' variant='purpleDarkGradient'>
					Resume minting
				</Text>{' '}
				- Upload .JSON file
			</Text>
			<Text variant='gray'>
				To resume your minting you need to upload your .JSON file and
				sign the Minting Initiation transaction triggered in the dApp.
			</Text>
			<DragAndDropComponent />

			<Button variant='purple'>Upload And Resume</Button>
			<Link
				variant='purpleDarkGradient'
				fontSize='14px'
				lineHeight='20px'
				textAlign='center'
			>
				Bridge contract
			</Link>
		</Stack>
	);
};

export default ResumeMintingProcess;
