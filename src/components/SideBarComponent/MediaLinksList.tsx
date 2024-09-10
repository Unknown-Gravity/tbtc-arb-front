import { Flex, useMediaQuery } from '@chakra-ui/react';
import IconSideBar from './IconSideBar';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';
import { ExternalRoutes } from '../../Routes/Routes';
import { useState } from 'react';

const mediaLinks = [
	{
		icon: GitHubIcon,
		text: 'GitHub',
		link: ExternalRoutes.Github,
	},
	{
		icon: DiscorIcon,
		text: 'Discord',
		link: ExternalRoutes.Discord,
	},
];

type Props = { isOpen?: boolean };

const MediaLinksList = ({ isOpen }: Props) => {
	const [isMobile] = useMediaQuery('(max-width: 600px)');
	return (
		<Flex flexDir={isMobile ? 'row' : 'column'} gap='5px'>
			{mediaLinks.map((link, index) => (
				<IconSideBar
					key={index}
					icon={link.icon}
					text={link.text}
					link={link.link}
					isOpen={isOpen}
				/>
			))}
		</Flex>
	);
};

export default MediaLinksList;
