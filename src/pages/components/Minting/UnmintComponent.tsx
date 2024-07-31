import {
	Box,
	Flex,
	Stack,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { CustomBox } from '../../../components/CustomBox';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import MintingProcessComponent from './components/MintingProcessComponent';
import DurationComponent from './components/UnmintingProcess/DurationComponent';

type Props = {
	isConnected: boolean;
};

const UnmintComponent = (props: Props) => {
	const [step] = useState(1);
	const { colorMode } = useColorMode();
	const { onOpen } = useDisclosure();
	return (
		<CustomBox h='100%' w='100%'>
			<Flex w='100%' flexDirection={{ base: 'column', xl: 'row' }}>
				<Stack spacing={0}>
					<Flex alignItems='center' gap='9px'>
						{step === 2 && (
							<ArrowBackIcon
								boxSize='24px'
								p='0.5px'
								transition={'transform 0.1s'}
								cursor='pointer'
								_hover={{ transform: 'scale(1.2)' }}
								_active={{ transform: 'scale(1)' }}
								onClick={onOpen}
							/>
						)}
						<HeaderStepsMintingComponent label='tBTC - MINTING PROCESS' />
					</Flex>
					{!props.isConnected && <MintingProcessComponent />}
				</Stack>

				{step < 3 && (
					<Box
						bg={colorMode === 'dark' ? 'white' : 'light.coolGray'}
						alignSelf='start'
						h={{ base: '1px', xl: '584px' }}
						w={{ base: '100%', xl: '1px' }}
						mx='22px'
					></Box>
				)}
				{!props.isConnected && <DurationComponent />}
			</Flex>
		</CustomBox>
	);
};

export default UnmintComponent;
