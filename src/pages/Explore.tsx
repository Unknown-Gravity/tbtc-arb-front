import HeaderExploreComponent from './components/Explore/HeaderExploreComponent';
import { CustomBox } from '../components/CustomBox';
import { DuneClient } from '@duneanalytics/client-sdk';
import { Image, Stack, useColorModeValue } from '@chakra-ui/react';
import HistoryExploreComponent from './components/Explore/HistoryExploreComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {};

const Explore = (props: Props) => {
	return (
		<Stack
			mt='64px'
			w={{ xl: '1120px' }}
			mx='auto'
			position='relative'
			spacing='16px'
		>
			<CustomBox w='100%' p='0'>
				<HeaderExploreComponent />
			</CustomBox>
			<CustomBox p='25px'>
				<HistoryExploreComponent />
			</CustomBox>
		</Stack>
	);
};

export default Explore;
