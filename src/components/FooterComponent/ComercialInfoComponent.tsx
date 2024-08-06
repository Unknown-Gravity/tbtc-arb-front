import {
	Box,
	Flex,
	Icon,
	Link,
	Stack,
	Text,
	useColorMode,
	useTheme,
} from '@chakra-ui/react';
import ThresholdIcon from '../../assets/icons/ThresholdIcon';
import { BitcoinFilledIcon } from '../../assets/icons/BitcoinFilledIcon';
import { BsDiscord, BsTwitterX, BsYoutube } from 'react-icons/bs';
import { TbBrandGithubFilled } from 'react-icons/tb';
import FooterIcon from './FooterIcon';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { socialMedia } from '../../data/mockData';

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

				<BitcoinFilledIcon
					color='brand.purple.900'
					boxSize='56px'
					fill={colorMode === 'light' ? 'white' : 'dark.primaryGray'}
				/>
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
				<FooterIcon link={socialMedia.youtube} icon={BsYoutube} />
				<FooterIcon link={socialMedia.x} icon={BsTwitterX} />
				<FooterIcon link={socialMedia.discord} icon={BsDiscord} />
				<FooterIcon
					link={socialMedia.github}
					icon={GitHubIcon}
					solid={true}
				/>
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
