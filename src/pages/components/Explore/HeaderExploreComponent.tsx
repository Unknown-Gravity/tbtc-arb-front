import {
	Button,
	Flex,
	Link,
	Skeleton,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import InfoHeaderExploreComponent from './HeaderExploreComponent/InfoHeaderExploreComponent';
import {
	DarkExploreBackground,
	LightExploreBackground,
} from '../../../assets/images';
import { useEffect, useState } from 'react';
import { currencyFormatter } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { fetchHeaderExploreData } from '../../../services/fetchServices';

const initialValue = {
	supply: 0,
	tbtc: 0,
	minting: 0,
	addresses: 0,
};

const HeaderExploreComponent = () => {
	const [data, setData] = useState(initialValue);
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	const handleClickStartMinting = () => {
		navigate('/minting');
	};
	useEffect(() => {
		const fetchData = async () => {
			const fetchedData = await fetchHeaderExploreData();
			if (fetchedData !== null) {
				setData(fetchedData);
			}
		};
		try {
			fetchData();
		} catch (error) {
			setErrorMsg('No data available now. Please try again later');
			console.error('Error fetching data');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const backgroundImage = useColorModeValue(
		`url(${LightExploreBackground})`,
		`url(${DarkExploreBackground})`,
	);
	return (
		<Stack
			w='100%'
			spacing='0'
			p='25px'
			bg={backgroundImage}
			bgSize='cover'
			bgPos='center'
		>
			<Flex
				justifyContent='space-between'
				w='100%'
				alignItems='center'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Text fontSize='24px' lineHeight='32px' fontWeight={600}>
					tBTC TVL
				</Text>
				<Button
					variant='purple'
					h='48px'
					w='161.6px'
					onClick={handleClickStartMinting}
				>
					Start Minting
				</Button>
			</Flex>

			<Flex
				justifyContent='space-between'
				w='100%'
				alignItems='center'
				mt='68px'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Text
					fontSize={{
						base: '45px',
						xl: errorMsg === '' ? '60px' : '45px',
					}}
					lineHeight='64px'
					fontWeight={700}
					textAlign='center'
				>
					{data.supply !== 0 ? (
						errorMsg === '' ? (
							currencyFormatter(data.supply)
						) : (
							errorMsg
						)
					) : (
						<Skeleton />
					)}
				</Text>

				<Button
					as={Link}
					href={process.env.REACT_APP_DUNE_ANALYTICS_URL}
					h='48px'
					variant='grayOutlined2'
					isExternal
				>
					View On Dune Analytics
				</Button>
			</Flex>
			{errorMsg === '' && (
				<Flex
					mt='48px'
					justifyContent='space-between'
					gap='25px'
					alignItems='center'
					flexDir={{ base: 'column', xl: 'row' }}
				>
					<InfoHeaderExploreComponent
						info={data.tbtc}
						label='tBTC'
						symbol='none'
					/>

					<InfoHeaderExploreComponent
						info={data.minting}
						label='Total mints'
						symbol='none'
					/>
					<InfoHeaderExploreComponent
						info={data.addresses}
						label='tBTC Holding Addresses'
						symbol='none'
					/>
				</Flex>
			)}
		</Stack>
	);
};

export default HeaderExploreComponent;
