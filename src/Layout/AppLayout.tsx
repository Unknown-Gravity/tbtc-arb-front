import { Box, Flex } from "@chakra-ui/react";
import { AppLayoutProps } from "../interfaces/AppLayoutProps";
// import Navigation from '../components/SidebarComponent/Navigation';
// import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const AppLayout = ({ component }: AppLayoutProps) => {
	return (
		<Flex h="100vh">
			{/* <Navigation /> */}
			<Flex flexDirection={"column"} flex={1} ml={48} p={8}>
				{/* <HeaderComponent /> */}
				<Box w="100%" py={4} px={10}>
					{component}
				</Box>
			</Flex>
		</Flex>
	);
};

export default AppLayout;
