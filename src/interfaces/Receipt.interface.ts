export interface Receipt {
	blindingFactor: string;
	depositor: {
		identifierHex: string;
	};
	refundLockTime: string;
	refundPublicKeyHash: string;
	walletPublicKeyHash: string;
}
