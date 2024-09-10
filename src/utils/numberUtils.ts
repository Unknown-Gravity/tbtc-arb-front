import { BigNumber } from 'ethers';

/**
 * @name normalizeTbtcValue
 * @description Normalizes the TBTC value
 * @param value - The TBTC value
 * @returns The normalized TBTC value
 */

const normalizeTbtcValue = (value: BigNumber): string => {
	return (value.toNumber() / 100000000).toFixed(2);
};

export { normalizeTbtcValue };
