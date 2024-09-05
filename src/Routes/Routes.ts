import { SearchIcon } from '../assets/icons/SearchIcon';
import { BitcoinIcon } from '../assets/icons/BitcoinIcon';
import { HouseIcon } from '../assets/icons/HouseIcon';
import { LoyaltyIcon } from '../assets/icons/LoyaltyIcon';
import { LinkType } from '../types/Links.type';

export const PublicRoutes = {
	Login: 'login',
	Home: 'home',
	Minting: 'minting',
	Loyalty: 'loyalty-program',
	Explore: 'explore',
};

export const ExternalRoutes = {
	Discord: 'https://discord.com/invite/Threshold',
	Youtube: 'https://www.youtube.com/channel/UCMEW6scsXJFigeeLhSCPF5Q',
	Github: 'https://github.com/threshold-network',
	X: 'https://x.com/TheTNetwork',
	Forum: 'https://forum.threshold.network/',
	Website: 'https://threshold.network/',
	Blog: 'https://blog.threshold.network/',
	Documentation: 'https://docs.threshold.network/',
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
		link: PublicRoutes.Minting,
	},
	{
		icon: SearchIcon,
		title: 'Explore',
		link: PublicRoutes.Explore,
	},
	{
		icon: LoyaltyIcon,
		title: 'Loyalty Program',
		link: PublicRoutes.Loyalty,
	},
];

export const externalLinks: Array<LinkType> = [
	{
		title: 'Youtube',
		link: ExternalRoutes.Youtube,
	},
	{
		title: 'Forum',
		link: ExternalRoutes.Forum,
	},
	{
		title: 'Loyalty',
		link: PublicRoutes.Loyalty,
	},
];

export const connectWithUsLinks: Array<LinkType> = [
	{
		title: 'DAO Forum',
		link: ExternalRoutes.Forum,
	},
	{
		title: 'Github',
		link: ExternalRoutes.Github,
	},
	{
		title: 'Discord',
		link: ExternalRoutes.Discord,
	},
	{
		title: 'X',
		link: ExternalRoutes.X,
	},
];

export const thresholdLinks: Array<LinkType> = [
	{
		title: 'Website',
		link: ExternalRoutes.Website,
	},
	{
		title: 'Blog',
		link: ExternalRoutes.Blog,
	},
	{
		title: 'Forum',
		link: ExternalRoutes.Forum,
	},
	{
		title: 'Documentation',
		link: ExternalRoutes.Documentation,
	},
];
