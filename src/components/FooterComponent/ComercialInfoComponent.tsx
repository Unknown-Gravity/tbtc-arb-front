import { Flex, Stack, Text, useColorMode } from '@chakra-ui/react';
import ThresholdIcon from '../../assets/icons/ThresholdIcon';
import { BitcoinFilledIcon } from '../../assets/icons/BitcoinFilledIcon';
import { BsDiscord, BsTwitterX, BsYoutube } from 'react-icons/bs';
import FooterIcon from './FooterIcon';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { ExternalRoutes } from '../../Routes/Routes';
import { FC } from 'react';

const ComercialInfoComponent: FC = () => {
	const { colorMode } = useColorMode();

	return (
		<Stack spacing={0}>
			<Flex gap={2} justifyContent='flex-start' alignItems='center'>
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
					fill='white'
				/>
			</Flex>
			<Text
				fontSize='13.9px'
				lineHeight='21px'
				w='207px'
				fontWeight={400}
				mt='23px'
			>
				Curated by Threshold DAO Developed by Uknown Gravity
			</Text>
			<Flex gap='12px' mt='20px' justifyContent='center'>
				<FooterIcon link={ExternalRoutes.Youtube} icon={BsYoutube} />
				<FooterIcon link={ExternalRoutes.X} icon={BsTwitterX} />
				<FooterIcon link={ExternalRoutes.Discord} icon={BsDiscord} />
				<FooterIcon
					link={ExternalRoutes.Github}
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
