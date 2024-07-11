import { RootState } from "../types/RootState";
import RoutesNotFound from "./RoutesNotFound";
import { useSelector } from "react-redux";

const PrivateStacks = () => {
	const { isSuccess } = useSelector((store: RootState) => store.auth);

	return <RoutesNotFound>{"Not found"}</RoutesNotFound>;
};

export default PrivateStacks;
