import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { PublicRoutes } from "../Routes";
import { RootState } from "../../types/RootState";

export const AuthGuard = () => {
	const userState = useSelector((store: RootState) => store.auth);

	// TODO: Verificar con email?
	return userState.email.length > 0 ? <Outlet /> : <Navigate replace to={PublicRoutes.Login} />;
};

export default AuthGuard;
