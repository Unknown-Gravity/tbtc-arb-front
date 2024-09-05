import { Flex, Stack, Text } from '@chakra-ui/react';
import { connectWithUsLinks, thresholdLinks } from '../../Routes/Routes';
import LinkComponent from './LinkComponent';

const LinksComponent = () => {
	return (
		<Flex gap='64px'>
			<Stack gap='20px' w='165px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					THRESHOLD
				</Text>
				{thresholdLinks.map((link, index) => {
					return <LinkComponent link={link} key={index} />;
				})}
			</Stack>
			<Stack gap='20px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					CONNECT WITH US
				</Text>
				{connectWithUsLinks.map((link, index) => {
					return <LinkComponent link={link} key={index} />;
				})}
			</Stack>
		</Flex>
	);
};

export default LinksComponent;
