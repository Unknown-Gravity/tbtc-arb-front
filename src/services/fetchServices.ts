import axios from 'axios';

const fetchExploreHistory = async () => {
	const apikey = process.env.REACT_APP_API_KEY || '';
	const url = 'https://api.dune.com/api/v1/query/3965425/results?limit=20';
	try {
		const response = await axios.get(url, {
			headers: { 'X-Dune-API-Key': apikey },
		})
		return response.data.result.rows;
	} catch (error) {
		console.error('Error fetching tbtc history:', error);
	}
};

export const fetchTbtcSupply = async () => {
	const apikey = process.env.REACT_APP_API_KEY;
	const url = 'https://api.dune.com/api/v1/query/2610107/results?limit=1000';
	try {
		const response = await axios.get(url, {
			headers: { 'X-Dune-API-Key': apikey },
		});
		return response.data.result.rows[0]._col0;
	} catch (error) {
		console.error('Error fetching tbtc supply:', error);
	}
};

const fetchHeaderExploreData = async () => {
	const apikey = process.env.REACT_APP_API_KEY;
	const urls = [
		'https://api.dune.com/api/v1/query/2610107/results?limit=1',
		'https://api.dune.com/api/v1/query/3965411/results?limit=1',
		'https://api.dune.com/api/v1/query/1964103/results?limit=1',
	];

	try {
		const [tbtc, mints, addresses] = await Promise.all(
			urls.map(url =>
				axios.get(url, {
					headers: { 'X-Dune-API-Key': apikey },
				}),
			),
		);

		const headerData = {
			minting: mints.data.result.rows[0].total_mint,
			tbtc: tbtc.data.result.rows[0]._col0,
			addresses: addresses.data.result.rows[0].Holders,
		};

		return headerData;
	} catch (error) {
		console.error('Error fetching header data:', error);
		return null; // Return null or some default values if the request fails
	}
};

export { fetchExploreHistory, fetchHeaderExploreData };
