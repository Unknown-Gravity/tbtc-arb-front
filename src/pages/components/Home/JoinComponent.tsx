import { Flex, Stack, Text } from '@chakra-ui/react';
import { DiscordNoBackgroundIcon } from '../../../assets/icons/DiscordNoBackgroundIcon';
import { LogoAloneIcon } from '../../../assets/icons/LogoAlone';
import { socialMedia } from '../../../data/mockData';
import { TwitterXIcon } from '../../../assets/icons/TwitterXIcon';
import IconJoincomponent from './JoinComponent/IconJoincomponent';

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
				<IconJoincomponent
					label='Discord'
					icon={DiscordNoBackgroundIcon}
					link={socialMedia.discord}
				/>
				<IconJoincomponent
					label='DAO Forum'
					icon={LogoAloneIcon}
					link={socialMedia.forum}
				/>
				<IconJoincomponent
					label='X'
					icon={TwitterXIcon}
					link={socialMedia.x}
				/>
			</Flex>
		</Stack>
	);
};

export default JoinComponent;
