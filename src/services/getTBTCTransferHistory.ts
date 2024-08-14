import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { TBTC } from '@keep-network/tbtc-v2.ts';

export async function getTBTCTransferHistory(
	provider: Web3Provider,
	account: string,
	tbtcContract: Contract,
) {
	const transferEvents = await tbtcContract.queryFilter(
		tbtcContract.filters.Transfer(account, null),
		0,
		'latest',
	);

	const transfers = transferEvents.map(event => ({
		from: event.args?.from,
		to: event.args?.to,
		value: event.args?.value.toString(),
		transactionHash: event.transactionHash,
	}));

	return transfers;
}
