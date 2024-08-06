import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {};

const LinksComponent = (props: Props) => {
	return (
		<Flex gap='64px'>
			<Stack gap='20px' w='155px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					THRESHOLD
				</Text>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
			</Stack>
			<Stack gap='20px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					CONNECT WITH US
				</Text>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Dao Forum
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Github
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Discord
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					X
				</Link>
			</Stack>
		</Flex>
	);
};

export default LinksComponent;
