import { SearchIcon } from '../assets/icons/SearchIcon';
import { BitcoinIcon } from '../assets/icons/BitcoinIcon';
import { HouseIcon } from '../assets/icons/HouseIcon';
import { LinkType } from '../types/Links.type';

export const PublicRoutes = {
	Login: 'login',
	Home: 'home',
	Mintin: 'mintin',
	Explore: 'explore',
};

export const ExternalRoutes = {
	Discord: 'https://discord.com/invite/Threshold',
	Youtube: 'https://www.youtube.com/channel/UCMEW6scsXJFigeeLhSCPF5Q',
	Github: 'https://github.com/threshold-network',
	X: 'https://x.com/TheTNetwork',
	Forum: 'https://forum.threshold.network/',
};

export const PrivateRoutes = {};

export const publicLinks: Array<LinkType> = [
	{
		icon: HouseIcon,
		title: 'Overview',
		link: PublicRoutes.Home,
	},
	{
		icon: BitcoinIcon,
		title: 'tBTC',
		link: PublicRoutes.Mintin,
	},
	{
		icon: SearchIcon,
		title: 'Explore',
		link: PublicRoutes.Explore,
	},
];

export const externalLinks: Array<LinkType> = [
	{
		title: 'youtube',
		link: ExternalRoutes.Youtube,
	},
	{
		title: 'discord',
		link: ExternalRoutes.Discord,
	},
	{
		title: 'x',
		link: ExternalRoutes.X,
	},
	{
		title: 'github',
		link: ExternalRoutes.Github,
	},
	{
		title: 'forum',
		link: ExternalRoutes.Forum,
	},
];
