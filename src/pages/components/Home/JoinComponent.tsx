import { Flex, Stack, Text } from '@chakra-ui/react';
import { DiscordNoBackgroundIcon } from '../../../assets/icons/DiscordNoBackgroundIcon';
import { LogoAloneIcon } from '../../../assets/icons/LogoAlone';
import { TwitterIcon } from '../../../assets/icons/TwitterIcon';

type Props = {};

const JoinComponent = (props: Props) => {
	return (
		<Stack alignItems='center' py='200px'>
			<Text fontSize='47.8px' fontWeight={700} lineHeight='72px'>
				Join the Threshold DAO
			</Text>
			<Text
				fontSize='15.9px'
				maxW='594px'
				textAlign='center'
				lineHeight='24px'
			>
				If you have any feedback, ideas or questions, feel free to drop
				in and say hello! We are a project driven by the community and
				open source.
			</Text>
			<Flex gap='48px' mt='38px'>
				<Stack alignItems='center'>
					<DiscordNoBackgroundIcon
						color='brand.purple.900'
						boxSize='41px'
					/>
					<Text fontSize='13.9' lineHeight='21px' fontWeight={700}>
						Discord
					</Text>
				</Stack>
				<Stack alignItems='center'>
					<LogoAloneIcon color='brand.purple.900' boxSize='41px' />
					<Text fontSize='13.9' lineHeight='21px' fontWeight={700}>
						DAO Forum
					</Text>
				</Stack>
				<Stack alignItems='center'>
					<TwitterIcon color='brand.purple.900' boxSize='41px' />
					<Text fontSize='13.9' lineHeight='21px' fontWeight={700}>
						Twitter
					</Text>
				</Stack>
			</Flex>
		</Stack>
	);
};

export default JoinComponent;
