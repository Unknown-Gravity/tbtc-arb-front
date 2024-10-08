import { SearchIcon } from '../assets/icons/SearchIcon';
import { BitcoinIcon } from '../assets/icons/BitcoinIcon';
import { HouseIcon } from '../assets/icons/HouseIcon';
import { LoyaltyIcon } from '../assets/icons/LoyaltyIcon';
import { LinkType } from '../types/Links.type';

// PublicRoutes object containing various route names
export const PublicRoutes = {
	Login: 'login',
	Home: 'home',
	Minting: 'minting',
	Loyalty: 'loyalty-program',
	Explore: 'explore',
};

// ExternalRoutes object containing various external URLs
export const ExternalRoutes = {
	Discord: 'https://discord.com/invite/Threshold',
	Youtube: 'https://www.youtube.com/channel/UCMEW6scsXJFigeeLhSCPF5Q',
	Github: 'https://github.com/threshold-network',
	X: 'https://x.com/TheTNetwork',
	Forum: 'https://forum.threshold.network/',
	Website: 'https://threshold.network/',
	Blog: 'https://blog.threshold.network/',
	Documentation: 'https://docs.threshold.network/',
	Curve: 'https://curve.fi/#/arbitrum/pools/factory-stable-ng-69/deposit',
	TBTCPool:
		'https://merkl.angle.money/arbitrum/pool/0xe9e6b9aAAfaf6816C3364345F6eF745CcFC8660a',
	ETHPool:
		'https://merkl.angle.money/arbitrum/pool/2/0xCb198a55e2a88841E855bE4EAcaad99422416b33',
	GMX: 'https://app.gmx.io/#/trade',
};

// publicLinks array containing public links with their respective icons, titles, and routes
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

// externalLinks array containing external links with their respective titles and URLs
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

// connectWithUsLinks array containing links to connect with the community with their respective titles and URLs
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

// thresholdLinks array containing links related to Threshold Network with their respective titles and URLs
export const thresholdLinks: Array<LinkType> = [
	{
		title: 'Curve tBTC/WBTC',
		link: ExternalRoutes.Curve,
	},
	{
		title: 'Uniswap tBTC/WBTC',
		link: ExternalRoutes.TBTCPool,
	},
	{
		title: 'Uniswap tBTC/ETH',
		link: ExternalRoutes.ETHPool,
	},
	{
		title: 'GMX',
		link: ExternalRoutes.GMX,
	},
];
