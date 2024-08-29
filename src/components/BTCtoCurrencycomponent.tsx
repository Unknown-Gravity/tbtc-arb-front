import React, { FC, useEffect, useState } from 'react';
import { Spinner, Text } from '@chakra-ui/react';
import { convertBTCToCurrency, Currency } from '../utils/utils';

const BTCtoCurrencyComponent: FC<{
	btcAmount: number;
	currency: Currency;
	variant?: string;
}> = ({ btcAmount, currency, variant }) => {
	const [convertedAmount, setConvertedAmount] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchConversion = async () => {
			try {
				const result = await convertBTCToCurrency(btcAmount, currency);
				setConvertedAmount(result);
			} catch (error) {
				setError('Error fetching Bitcoin price');
			} finally {
				setLoading(false);
			}
		};

		fetchConversion();
	}, [btcAmount, currency]);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Text>{error}</Text>;
	}

	return (
		<Text fontSize={variant === 'gray' ? '14px' : '16px'} variant={variant}>
			{convertedAmount}
		</Text>
	);
};

export default BTCtoCurrencyComponent;
