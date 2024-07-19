export interface Transaction {
	tbtc: number;
	address?: string;
	tx?: string;
	state?: 'pending' | 'minted' | 'error';
	date?: Date;
}
