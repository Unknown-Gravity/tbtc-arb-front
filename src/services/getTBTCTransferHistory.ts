import { Contract } from 'ethers';

/**
 * @name getTBTCTransferHistory
 *
 * @description This function gets the transfer history of a tBTC account.
 *
 * @param {string} account The account to get the transfer history for.
 * @param {Contract} tbtcContract The tBTC contract.
 */

export async function getTBTCTransferHistory(
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
