export interface Transaction {
	tbtc: number;
	tx: string;
	state: 'pending' | 'minted' | 'error';
}
