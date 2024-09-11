/* eslint-disable react/display-name */
import { memo } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesNotFound from './RoutesNotFound';
import { PublicRoutes } from './Routes';
import AppLayout from '../Layout/AppLayout';
import Home from '../pages/Home';
import Minting from '../pages/TbtcComponent';
import Explore from '../pages/Explore';
import Loyalty from '../pages/Loyalty';

/**
 * @name AppRoutes
 *
 * @description This component contains the routes for the application.
 *
 */

const AppRoutes = memo(() => {
	return (
		<RoutesNotFound>
			<Route path='*' element={<Navigate to={PublicRoutes.Home} />} />

			<Route
				path={PublicRoutes.Home}
				element={<AppLayout component={<Home />} />}
			/>
			<Route
				path={PublicRoutes.Minting}
				element={
					<AppLayout
						component={<Minting />}
						headerTitle='tBTC | Minting'
					/>
				}
			/>
			<Route
				path={PublicRoutes.Explore}
				element={<AppLayout component={<Explore />} />}
			/>
			<Route
				path={PublicRoutes.Loyalty}
				element={
					<AppLayout
						component={<Loyalty />}
						headerTitle='Loyalty Program'
					/>
				}
			/>
		</RoutesNotFound>
	);
});

export default AppRoutes;
