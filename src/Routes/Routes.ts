import { LinkType } from '../types/Links.type';

export const PublicRoutes = {
	Login: 'login',
	Home: 'home',
	Minting: 'minting',
	Explore: 'explore',
};

export const PrivateRoutes = {};

export const links: LinkType[] = [
	{
		title: 'home',
		link: PublicRoutes.Home,
	},
	{
		title: 'minting',
		link: PublicRoutes.Minting,
	},
	{
		title: 'explore',
		link: PublicRoutes.Explore,
	},
];
