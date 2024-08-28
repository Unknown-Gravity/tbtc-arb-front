import { BigNumber } from 'ethers';

const normalizeTbtcValue = (value: BigNumber): string => {
	return (value.toNumber() / 100000000).toFixed(2);
};

export { normalizeTbtcValue };
