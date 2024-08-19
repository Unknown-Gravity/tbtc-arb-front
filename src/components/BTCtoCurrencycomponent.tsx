import React, { FC, useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
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
		return <Text>Loading...</Text>;
	}

	if (error) {
		return <Text>{error}</Text>;
	}

	return (
		<Text
			fontSize={variant === 'gray' ? '14px' : '16px'}
			variant={variant}
			lineHeight='10px'
		>
			{convertedAmount}
		</Text>
	);
};

export default BTCtoCurrencyComponent;
