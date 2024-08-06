import { Flex, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import TimelineTemplate from '../Timeline/TimelineMintingTemplate';
import {
	DarkUnmintImage,
	LightUnmintImage,
} from '../../../../../assets/images';

type Props = {};

const DurationComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	return (
		<Stack gap='30px'>
			<Text fontWeight={600} fontSize='16px' lineHeight='16px'>
				DURATION
			</Text>
			<Flex gap='25px' alignItems='center'>
				<Text
					variant='purple'
					bg={colorMode === 'light' ? 'brand.purple.910' : 'none'}
					p='10px'
					borderRadius='7px'
				>
					3-5 Hours
				</Text>
				<Text variant='gray' fontSize='14px'>
					min.{' '}
					<Text as='span' fontSize='20px' variant='gray'>
						0.01
					</Text>{' '}
					BTC
				</Text>
			</Flex>

			<TimelineTemplate label='UNMINT tBTC' step={1} unmint>
				<Text fontSize='14px' fontWeight={400} lineHeight='21px'>
					Your unwrapped and withdraw BTC will be sent to the BTC
					address of your choice, in the next sweep.
				</Text>
			</TimelineTemplate>
			<Image
				src={colorMode === 'light' ? LightUnmintImage : DarkUnmintImage}
			/>
		</Stack>
	);
};

export default DurationComponent;
