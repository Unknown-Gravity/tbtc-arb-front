import { Route, Routes } from "react-router-dom";

import { RoutesNotFoundProps } from "../interfaces/RoutesNotFoundProps.interface";
import { Stack, Text } from "@chakra-ui/react";

const RoutesNotFound = ({ children }: RoutesNotFoundProps) => {
	return (
		<Routes>
			{children}
			<Route
				path="*"
				element={
					<Stack
						direction={"row"}
						h="100vh"
						w={"100vw"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<Text fontSize={"4xl"}>Page not found</Text>
					</Stack>
				}
			/>
		</Routes>
	);
};

export default RoutesNotFound;
