import { Transaction } from '../interfaces/Transaction.interface';

interface Tx {
	amount: number;
	address: string;
	time: Date;
}

export interface Contract {
	name: string;
	link: string;
}

export interface Report {
	id: number;
	name: string;
	description: string;
	link: string;
}

export const transactions: Tx[] = [
	{
		amount: 0.02,
		address: '0x1d50c1a394d50f6a7f0d4d3e60c9c24c18d9c24a',
		time: new Date('2024-07-15T12:00:00Z'),
	},
	{
		amount: 0.02,
		address: '0x2d60e2b5a6e60f7b8e1f5e7e70d9c25b29e9d25b',
		time: new Date('2024-07-15T12:20:00Z'),
	},
	{
		amount: 0.02,
		address: '0x3d70f3c6b7f71f8c9f2g6h8f80e9d26c39f9e26c',
		time: new Date('2024-07-15T12:40:00Z'),
	},
	{
		amount: 0.02,
		address: '0x4d80g4d7c8g82g9d0h3h7i9g90f9d27d49g0f27d',
		time: new Date('2024-07-15T13:00:00Z'),
	},
	{
		amount: 0.02,
		address: '0x1d50c1a394d50f6a7f0d4d3e60c9c24c18d9c24a',
		time: new Date('2024-07-15T12:00:00Z'),
	},
	{
		amount: 0.02,
		address: '0x2d60e2b5a6e60f7b8e1f5e7e70d9c25b29e9d25b',
		time: new Date('2024-07-15T12:20:00Z'),
	},
	{
		amount: 0.02,
		address: '0x3d70f3c6b7f71f8c9f2g6h8f80e9d26c39f9e26c',
		time: new Date('2024-07-15T12:40:00Z'),
	},
	{
		amount: 0.02,
		address: '0x4d80g4d7c8g82g9d0h3h7i9g90f9d27d49g0f27d',
		time: new Date('2024-07-15T13:00:00Z'),
	},
];

export const contracts = [
	{
		name: 'Token Contract',
		link: 'https://sepolia.etherscan.io/address/0xE4835Ef9185847d1b7891267f3181172F7B96753#code#F1#L1',
	},
	{
		name: 'Bridge Contract',
		link: 'https://sepolia.etherscan.io/address/0xE4835Ef9185847d1b7891267f3181172F7B96753#code#F18#L1',
	},
];

export const reports = [
	{
		id: 1,
		name: 'Least Authority Report',
		description: 'tBTC Bridge v2 Security',
		link: 'https://leastauthority.com/blog/audits/audit-of-keep-network-tbtc-bridge-v2/',
	},
	{
		id: 2,
		name: 'CertiK Report',
		description: 'Vending Machine Security',
		link: 'https://skynet.certik.com/projects/threshold-network',
	},
	{
		id: 3,
		name: 'ChainSecurity Report',
		description: 'Staking Contract, T Token, Vending Machine Security',
		link: 'https://www.chainsecurity.com/security-audit/threshold-network',
	},
	{
		id: 4,
		name: 'Mintin service Report',
		description: 'Staking Contract, T Token, Vending Machine Security',
		link: 'https://leastauthority.com/blog/audits/audit-of-keep-network-solana-smart-contracts/',
	},
];

export const walletInfo = {
	balance: 0,
};

export const transactions2: Transaction[] = [
	{
		tbtc: 1.5,
		tx: '0xabc123def456gh789ijk012lmn345opq678rst901uvw234xyz567abc890d123e',
		state: 'minted',
	},
	{
		tbtc: 0.75,
		tx: '0xfed456cba987zyx654wvu321tsr098qpo765lmn432ijk109gh876def543abc2',
		state: 'pending',
	},
	{
		tbtc: 2.0,
		tx: '0x123ghj456def789abc012klm345nop678qrs901tuv234wxy567zab890cde123f',
		state: 'error',
	},
	{
		tbtc: 1.0,
		tx: '0x456def789abc012ghj345klm678nop901qrs234tuv567wxy890zab123cde456g',
		state: 'minted',
	},
	{
		tbtc: 1.25,
		tx: '0x789abc012def345ghj678klm901nop234qrs567tuv890wxy123zab456cde789h',
		state: 'pending',
	},
	{
		tbtc: 0.5,
		tx: '0x012def345ghj678abc901klm234nop567qrs890tuv123wxy456zab789cde012i',
		state: 'minted',
	},
	{
		tbtc: 3.0,
		tx: '0x345ghj678abc012def901klm234nop567qrs890tuv123wxy456zab789cde345j',
		state: 'error',
	},
	{
		tbtc: 0.3,
		tx: '0x678abc012def345ghj901klm234nop567qrs890tuv123wxy456zab789cde678k',
		state: 'minted',
	},
	{
		tbtc: 2.5,
		tx: '0x012def345abc678ghj901klm234nop567qrs890tuv123wxy456zab789cde901l',
		state: 'pending',
	},
	{
		tbtc: 0.9,
		tx: '0x345abc678def012ghj901klm234nop567qrs890tuv123wxy456zab789cde234m',
		state: 'minted',
	},
];

export const transactionsMint: Transaction[] = [
	{
		tbtc: 0.001,
		address: '0x91D9588F07d468A925d1103b89C18d4F1Ae1CF1F',
		date: new Date(new Date().getTime() - 10 * 60000), // hace 10 minutos
	},
	{
		tbtc: 0.002,
		address: '0x83A441F1D22A8E6B1234567890CDEFAB12345678',
		date: new Date(new Date().getTime() - 20 * 60000), // hace 20 minutos
	},
	{
		tbtc: 0.003,
		address: '0x72C3D45B4561234567890ABCDEF1234567890ABC',
		date: new Date(new Date().getTime() - 30 * 60000), // hace 30 minutos
	},
];

export const transactionExplorer: Array<Transaction> = [
	{
		tbtc: 0.001,
		address: '0x91D9588F07d468A925d1103b89C18d4F1Ae1CF1F',
		date: new Date(new Date().getTime() - 10 * 60000), // hace 10 minutos
		tx: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
	},
	{
		tbtc: 0.002,
		address: '0x83A441F1D22A8E6B1234567890CDEFAB12345678',
		date: new Date(new Date().getTime() - 20 * 60000), // hace 20 minutos
		tx: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
	},
	{
		tbtc: 0.003,
		address: '0x72C3D45B4561234567890ABCDEF1234567890ABC',
		date: new Date(new Date().getTime() - 30 * 60000), // hace 30 minutos
		tx: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
	},
	{
		tbtc: 0.004,
		address: '0xA1B2C3D4E5F67890ABCDEF1234567890ABCDEF12',
		date: new Date(new Date().getTime() - 40 * 60000), // hace 40 minutos
		tx: '0xabcdef7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
	},
	{
		tbtc: 0.005,
		address: '0xB2C3D4E5F67890ABCDEF1234567890ABCDEF1234',
		date: new Date(new Date().getTime() - 50 * 60000), // hace 50 minutos
		tx: '0x1234abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
	},
	{
		tbtc: 0.006,
		address: '0xC3D4E5F67890ABCDEF1234567890ABCDEF123456',
		date: new Date(new Date().getTime() - 60 * 60000), // hace 60 minutos
		tx: '0xabcdefabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
	},
	{
		tbtc: 0.007,
		address: '0xD4E5F67890ABCDEF1234567890ABCDEF12345678',
		date: new Date(new Date().getTime() - 70 * 60000), // hace 70 minutos
		tx: '0x7890abcdefabcdef1234567890abcdef1234567890abcdef1234567890abcdef',
	},
	{
		tbtc: 0.008,
		address: '0xE5F67890ABCDEF1234567890ABCDEF1234567890',
		date: new Date(new Date().getTime() - 80 * 60000), // hace 80 minutos
		tx: '0xabcdef7890abcdefabcdef1234567890abcdef1234567890abcdef1234567890',
	},
	{
		tbtc: 0.009,
		address: '0xF67890ABCDEF1234567890ABCDEF1234567890AB',
		date: new Date(new Date().getTime() - 90 * 60000), // hace 90 minutos
		tx: '0x1234567890abcdefabcdef1234567890abcdef1234567890abcdefabcdef1234',
	},
	{
		tbtc: 0.01,
		address: '0x67890ABCDEF1234567890ABCDEF1234567890ABC',
		date: new Date(new Date().getTime() - 100 * 60000), // hace 100 minutos
		tx: '0x7890abcdef1234567890abcdefabcdef1234567890abcdefabcdef1234567890',
	},
	{
		tbtc: 0.011,
		address: '0x7890ABCDEF1234567890ABCDEF1234567890ABCD',
		date: new Date(new Date().getTime() - 110 * 60000), // hace 110 minutos
		tx: '0xabcdef1234567890abcdefabcdef1234567890abcdefabcdef1234567890abcd',
	},
	{
		tbtc: 0.012,
		address: '0x890ABCDEF1234567890ABCDEF1234567890ABCDE',
		date: new Date(new Date().getTime() - 120 * 60000), // hace 120 minutos
		tx: '0x1234567890abcdefabcdefabcdef1234567890abcdefabcdef1234567890abcd',
	},
	{
		tbtc: 0.013,
		address: '0x90ABCDEF1234567890ABCDEF1234567890ABCDEF',
		date: new Date(new Date().getTime() - 130 * 60000), // hace 130 minutos
		tx: '0x7890abcdef1234567890abcdefabcdefabcdef1234567890abcdefabcdef1234',
	},
	{
		tbtc: 0.014,
		address: '0x0ABCDEF1234567890ABCDEF1234567890ABCDEF1',
		date: new Date(new Date().getTime() - 140 * 60000), // hace 140 minutos
		tx: '0xabcdef1234567890abcdef1234567890abcdefabcdefabcdef1234567890abcd',
	},
	{
		tbtc: 0.015,
		address: '0xABCDEF1234567890ABCDEF1234567890ABCDEF12',
		date: new Date(new Date().getTime() - 150 * 60000), // hace 150 minutos
		tx: '0x1234567890abcdefabcdef1234567890abcdef1234567890abcdefabcdefabcd',
	},
	{
		tbtc: 0.016,
		address: '0xBCDEF1234567890ABCDEF1234567890ABCDEF123',
		date: new Date(new Date().getTime() - 160 * 60000), // hace 160 minutos
		tx: '0x7890abcdefabcdef1234567890abcdefabcdef1234567890abcdefabcdefabcd',
	},
	{
		tbtc: 0.017,
		address: '0xCDEF1234567890ABCDEF1234567890ABCDEF1234',
		date: new Date(new Date().getTime() - 170 * 60000), // hace 170 minutos
		tx: '0xabcdef1234567890abcdefabcdefabcdef1234567890abcdefabcdef12345678',
	},
	{
		tbtc: 0.018,
		address: '0xDEF1234567890ABCDEF1234567890ABCDEF12345',
		date: new Date(new Date().getTime() - 180 * 60000), // hace 180 minutos
		tx: '0x1234567890abcdefabcdefabcdef1234567890abcdefabcdefabcdef12345678',
	},
	{
		tbtc: 0.019,
		address: '0xEF1234567890ABCDEF1234567890ABCDEF123456',
		date: new Date(new Date().getTime() - 190 * 60000), // hace 190 minutos
		tx: '0x7890abcdefabcdefabcdef1234567890abcdefabcdefabcdef1234567890abcd',
	},
	{
		tbtc: 0.02,
		address: '0xF1234567890ABCDEF1234567890ABCDEF1234567',
		date: new Date(new Date().getTime() - 200 * 60000), // hace 200 minutos
		tx: '0xabcdef1234567890abcdefabcdefabcdef1234567890abcdefabcdefabcdefabcd',
	},
];

export const socialMedia = {
	youtube: 'https://www.youtube.com/channel/UCMEW6scsXJFigeeLhSCPF5Q',
	x: 'https://x.com/TheTNetwork',
	discord: 'https://discord.com/invite/Threshold',
	github: 'https://github.com/threshold-network',
	forum: 'https://forum.threshold.network/',
};
