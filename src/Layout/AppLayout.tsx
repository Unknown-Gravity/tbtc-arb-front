import { Box, Flex } from '@chakra-ui/react';
import { AppLayoutProps } from '../interfaces/AppLayoutProps';
import SideBarComponent from '../components/SideBarComponent';
import { Dispatch, useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
// import Navigation from '../components/SidebarComponent/Navigation';
// import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const AppLayout = ({ component }: AppLayoutProps) => {
	const [isOpen, setIsOpen]: [boolean, Dispatch<boolean>] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Flex minHeight='100vh' position='relative'>
			<SideBarComponent isOpen={isOpen} onClick={handleOpen} />
			<Flex
				flexDirection={'column'}
				flex={1}
				p={8}
				pr={{ base: 3.5, xl: 8 }}
			>
				<HeaderComponent isOpen={isOpen} />
				<Box w='100%' py={4} px={10} pr={{ base: 0, xl: 10 }}>
					{component}
				</Box>
			</Flex>
		</Flex>
	);
};

export default AppLayout;
