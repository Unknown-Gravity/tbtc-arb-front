import axios from 'axios';

const COINDESK_API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export type Currency = 'USD' | 'EUR' | 'JPY' | 'GBP';

interface PriceResponse {
	bpi: {
		USD: { rate_float: number };
		EUR: { rate_float: number };
		GBP: { rate_float: number };
		[key: string]: { rate_float: number };
	};
}

const currencyLocales: { [key in Currency]: string } = {
	USD: 'en-US',
	EUR: 'de-DE',
	JPY: 'ja-JP',
	GBP: 'en-GB',
};

export const currencyFormatter = (
	money: number,
	currency: 'USD' | 'EUR' | 'JPY' | 'GBP' = 'USD',
	symbol: string = 'symbol',
): string => {
	const locale = currencyLocales[currency] || 'en-US';

	// Si el símbolo es 'none', formateamos solo el número sin símbolo ni código de moneda
	if (symbol === 'none') {
		return new Intl.NumberFormat(locale, {
			maximumFractionDigits: 2,
			minimumFractionDigits: 0,
		}).format(money);
	}

	const currencyDisplay: 'symbol' | 'code' = 'symbol';

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		currencyDisplay,
		maximumFractionDigits: 2,
		minimumFractionDigits: 0,
	});

	return formatter.format(money);
};

export const convertBTCToCurrency = async (
	btcAmount: number,
	currency: Currency = 'USD',
): Promise<string> => {
	try {
		const response = await axios.get<PriceResponse>(COINDESK_API_URL);
		const rate = response.data.bpi[currency].rate_float;

		if (!rate) {
			throw new Error(`Exchange rate for ${currency} not found`);
		}

		const currencyAmount = btcAmount * rate;
		return currencyFormatter(currencyAmount, currency);
	} catch (error) {
		console.error('Error fetching Bitcoin price:', error);
		throw new Error('Could not fetch Bitcoin price');
	}
};

export const getDifferenceInMinutes = (date1: Date, date2: Date) => {
	const diffInMs = date2?.getTime() - date1.getTime();
	const diffInMinutes = Math.floor(diffInMs / 60000);

	if (diffInMinutes < 60) {
		return `${diffInMinutes} minutes ago`;
	}

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} hours ago`;
	}

	const diffInDays = Math.floor(diffInHours / 24);
	return `${diffInDays} days ago`;
};

export const normalizeNetWorkNames = (networkName: string): string => {
	if (!networkName) return '';

	return networkName
		.split('-') // Divide el nombre en partes usando guiones
		.map(
			word => word.charAt(0).toUpperCase() + word.slice(1), // Capitaliza la primera letra de cada palabra
		)
		.join(' ');
};

export const formatAddress = (
	address: `0x${string}` | undefined | string,
): string => {
	return address?.slice(0, 5) + '...' + address?.slice(-4);
};

const millisecondsToTimeString = (milliseconds: number): string => {
	const totalMinutes = milliseconds / 60000; // 1 minuto = 60,000 milisegundos
	const hours = Math.floor(totalMinutes / 60);
	const minutes = Math.floor(totalMinutes % 60);

	if (hours > 0) {
		return `${hours} HOURS ${minutes} MINUTES`;
	} else {
		return `${minutes} MINUTES`;
	}
};

export { millisecondsToTimeString };
