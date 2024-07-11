import { LinkType } from "../types/Links.type";

export const PublicRoutes = {
	Login: "login",
	ResetPassword: "reset",
};

export const PrivateRoutes = {
	Home: "home",
	Stats: "stats",
	Users: "users",
	Companies: "companies",
	Invoices: "invoices",
};

export const links: LinkType[] = [
	{
		title: "home",
		link: PrivateRoutes.Home,
	},
	{
		title: "stats",
		link: PrivateRoutes.Stats,
	},
	{
		title: "users",
		link: PrivateRoutes.Users,
	},
	{
		title: "companies",
		link: PrivateRoutes.Companies,
	},
	{
		title: "invoices",
		link: PrivateRoutes.Invoices,
	},
];
