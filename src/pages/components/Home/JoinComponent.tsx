import { Flex, Stack, Text } from '@chakra-ui/react';
import { DiscordNoBackgroundIcon } from '../../../assets/icons/DiscordNoBackgroundIcon';
import { LogoAloneIcon } from '../../../assets/icons/LogoAlone';
import { TwitterXIcon } from '../../../assets/icons/TwitterXIcon';
import IconJoincomponent from './JoinComponent/IconJoincomponent';
import { ExternalRoutes } from '../../../Routes/Routes';

/**
 * @name JoinComponent
 *
 * @description Component used for showing the Join the Threshold DAO info
 *
 * @returns { JSX.Element }
 */

const JoinComponent = () => {
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
					link={ExternalRoutes.Discord}
				/>
				<IconJoincomponent
					label='DAO Forum'
					icon={LogoAloneIcon}
					link={ExternalRoutes.Forum}
				/>
				<IconJoincomponent
					label='X'
					icon={TwitterXIcon}
					link={ExternalRoutes.X}
				/>
			</Flex>
		</Stack>
	);
};

export default JoinComponent;
