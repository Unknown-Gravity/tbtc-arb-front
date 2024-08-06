import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalRoutes } from '../../Routes/Routes';

type Props = {};

const LinksComponent = (props: Props) => {
	return (
		<Flex gap='64px'>
			<Stack gap='20px' w='155px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					THRESHOLD
				</Text>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
				<Link variant='purpleDarkGradient' fontWeight={500}>
					Lorem
				</Link>
			</Stack>
			<Stack gap='20px'>
				<Text lineHeight='27px' fontSize='17.9px' fontWeight={600}>
					CONNECT WITH US
				</Text>
				<Link
					variant='purpleDarkGradient'
					fontWeight={500}
					isExternal={true}
					href={ExternalRoutes.Forum}
				>
					Dao Forum
				</Link>
				<Link
					variant='purpleDarkGradient'
					fontWeight={500}
					isExternal={true}
					href={ExternalRoutes.Github}
				>
					Github
				</Link>
				<Link
					variant='purpleDarkGradient'
					fontWeight={500}
					isExternal={true}
					href={ExternalRoutes.Discord}
				>
					Discord
				</Link>
				<Link
					variant='purpleDarkGradient'
					fontWeight={500}
					isExternal={true}
					href={ExternalRoutes.X}
				>
					X
				</Link>
			</Stack>
		</Flex>
	);
};

export default LinksComponent;
