import {
	Box,
	Flex,
	Text,
	useColorMode,
	useColorModeValue,
	useTheme,
} from '@chakra-ui/react';
import { HiMoon } from 'react-icons/hi';
import { HiOutlineSun } from 'react-icons/hi';
import ConnectButton from './ConnectButton';

type Props = {
	isOpen: boolean;
};

const HeaderComponentDesktop = (props: Props) => {
	const theme = useTheme();
	const { colorMode, toggleColorMode } = useColorMode();
	const borderColor = theme.colors.brand.purple[940];
	const bgColor = useColorModeValue('white', 'dark.primaryGray');
	// const { isOpen } = useDisclosure();

	return (
		<Box
			position='fixed'
			top={0}
			right={0}
			w={
				props.isOpen === false
					? 'calc(100% - 37px)'
					: 'calc(100% - 135px)'
			}
			transition='width 0.2s'
			p='10px 60px 10px 60px'
			borderBottom={`1px solid ${borderColor}`}
			borderRadius='0px 0px 10px 10px'
			bg={bgColor}
			zIndex={10}
		>
			<Flex justifyContent='space-between'>
				<Text
					fontSize='24px'
					fontWeight={600}
					lineHeight='36px'
					variant='gray'
				>
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
					<ConnectButton />
				</Flex>
			</Flex>
		</Box>
	);
};

export default HeaderComponentDesktop;
