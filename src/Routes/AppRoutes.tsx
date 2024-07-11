/* eslint-disable react/display-name */
import { memo } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesNotFound from "./RoutesNotFound";
import { PrivateRoutes } from "./Routes";
import AuthGuard from "./guard/AuthGuard";
import AppLayout from "../Layout/AppLayout";
import Home from "../pages/Home";

// import AppLayout from '../layouts/AppLayout';

const AppRoutes = memo(() => {
	return (
		<RoutesNotFound>
			<Route path="*" element={<Navigate to={PrivateRoutes.Home} />} />

			{/* Public Routes */}
			{/* EJEMPLO:
			<Route path={`/${PublicRoutes.Login}`} element={<Login />} />
			<Route
				path={`/${PublicRoutes.ResetPassword}`}
				element={<ResetPassword />}
			/>
			
			*/}

			{/* Private Routes */}
			<Route element={<AuthGuard />}>
				{/* EJEMPLO: 
				<Route
					path={PrivateRoutes.Home}
					element={<AppLayout component={<Home />} />}
				/>
				<Route
					path={PrivateRoutes.Users}
					element={<AppLayout component={<Users />} />}
				/>
				*/}
			</Route>
			<Route path={PrivateRoutes.Home} element={<AppLayout component={<Home />} />} />
		</RoutesNotFound>
	);
});

export default AppRoutes;
