import {
	Box,
	Flex,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import ThresholdIcon from '../../assets/icons/ThresholdIcon';
import { BitcoinFilledIcon } from '../../assets/icons/BitcoinFilledIcon';
import { BsDiscord, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';

type Props = {};

const ComercialInfoComponent = (props: Props) => {
	const { colorMode } = useColorMode();
	const theme = useTheme();
	const purple = theme.colors.brand.purple[900];

	return (
		<Stack spacing={0}>
			<Flex gap={2} justifyContent='center' alignItems='center'>
				<Stack gap={0} alignItems='flex-end'>
					<ThresholdIcon
						color={
							colorMode === 'light'
								? 'light.primaryGray'
								: 'white'
						}
						boxSize='127px'
						h='fit-content'
					/>
					<Text variant='gray'>tBTC</Text>
				</Stack>
				<BitcoinFilledIcon color='brand.purple.900' boxSize='56px' />
			</Flex>
			<Text
				fontSize='13.9px'
				lineHeight='21px'
				w='207px'
				fontWeight={400}
				mt='23px'
			>
				Curated by Threshold DAO Developed by Unknown Gravity
			</Text>
			<Flex gap='12px' mt='20px'>
				<Flex
					w='24px'
					aspectRatio={1}
					bg='brand.purple.900'
					placeContent='center'
					borderRadius='50%'
				>
					<BsYoutube size='14px' color='white' />
				</Flex>
				<Flex
					w='24px'
					aspectRatio={1}
					bg='brand.purple.900'
					placeContent='center'
					borderRadius='50%'
				>
					<BsTwitterX size='13.5px' color='white' />
				</Flex>
				<Flex
					w='24px'
					aspectRatio={1}
					bg='brand.purple.900'
					placeContent='center'
					borderRadius='50%'
				>
					<BsDiscord size='14px' color='white' />
				</Flex>
				<Box
					bg='white'
					h='22px'
					w='22px'
					position='relative'
					borderRadius='50%'
					transform='translateY(2px)'
				>
					<GitHubIcon
						borderRadius='50%'
						boxSize='24px'
						color={purple}
						position='absolute'
						bottom={0}
						left='-0.5px'
					/>{' '}
				</Box>
			</Flex>
			<Text
				fontSize='13.9px'
				lineHeight='21px'
				fontWeight={400}
				mt='28px'
			>
				2024 Threshold. All the rights reserved.
			</Text>
		</Stack>
	);
};

export default ComercialInfoComponent;
