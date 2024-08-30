import axios from 'axios';

const fetchExploreHistory = () => {
	const apikey = process.env.REACT_APP_API_KEY || '';
	let history = null;
	axios
		.get('https://api.dune.com/api/v1/query/3965425/results?limit=20', {
			headers: { 'X-Dune-API-Key': apikey },
		})
		.then(res => {
			history = res.data.result.rows;
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});

	return history;
};

const fetchHeaderExploreData = async () => {
	const apikey = process.env.REACT_APP_API_KEY;
	const urls = [
		'https://api.dune.com/api/v1/query/1964092/results?limit=1',
		'https://api.dune.com/api/v1/query/2610107/results?limit=1',
		'https://api.dune.com/api/v1/query/3965411/results?limit=1',
		'https://api.dune.com/api/v1/query/1964103/results?limit=1',
	];

	try {
		const [supply, tbtc, mints, addresses] = await Promise.all(
			urls.map(url =>
				axios.get(url, {
					headers: { 'X-Dune-API-Key': apikey },
				}),
			),
		);

		const headerData = {
			supply: supply.data.result.rows[0].tvl,
			minting: mints.data.result.rows[0].total_mint,
			tbtc: tbtc.data.result.rows[0]._col0,
			addresses: addresses.data.result.rows[0].Holders,
		};

		console.log('🚀 ~ fetchHeaderExploreData ~ headerData:', headerData);
		return headerData;
	} catch (error) {
		console.error('Error fetching header data:', error);
		return null; // Return null or some default values if the request fails
	}
};

export { fetchExploreHistory, fetchHeaderExploreData };
