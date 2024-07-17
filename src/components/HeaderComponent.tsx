import {
	Box,
	Button,
	Flex,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import { HiMoon } from 'react-icons/hi';
import { HiOutlineSun } from 'react-icons/hi';

type Props = {
	isOpen: boolean;
};

const HeaderComponent = (props: Props) => {
	const theme = useTheme();
	const { colorMode, toggleColorMode } = useColorMode();
	const borderColor = theme.colors.brand.purple[900];
	return (
		<Box
			position='fixed'
			top={0}
			right={0}
			w={
				props.isOpen === false
					? 'calc(100% - 57px)'
					: 'calc(100% - 155px)'
			}
			transition='width 0.2s'
			p='10px 40px 10px 40px'
			borderBottom={`1px solid ${borderColor}`}
		>
			<Flex justifyContent='space-between'>
				<Text fontSize='24px' fontWeight={600} lineHeight='36px'>
					tBTC | Minting
				</Text>
				<Flex alignItems='center' gap='10px'>
					{colorMode === 'light' ? (
						<HiMoon
							size='19px'
							onClick={toggleColorMode}
							cursor='pointer'
						/>
					) : (
						<HiOutlineSun
							size='19px'
							onClick={toggleColorMode}
							cursor='pointer'
						/>
					)}
					<Button variant='purple'>Connect Wallet</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default HeaderComponent;
