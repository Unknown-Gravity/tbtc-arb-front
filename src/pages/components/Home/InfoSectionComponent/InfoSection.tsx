import { Flex, Stack, Text } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

type Props = {
	title: string;
	content: string;
	highlight: string;
	postContent: string;
};

const InfoSection = ({ title, content, highlight, postContent }: Props) => {
	return (
		<Stack gap='15px' maxW='463px'>
			<Text fontSize='24px' fontWeight={700}>
				{title}
			</Text>
			<Flex color='brand.purple.900' alignItems='center' gap={2}>
				<BsFillArrowRightCircleFill style={{ minWidth: '16px' }} />
				<Text fontSize='16px'>
					{content}{' '}
					<Text as='span' variant='purpleDarkGradient'>
						{highlight}
					</Text>{' '}
					{postContent}
				</Text>
			</Flex>
		</Stack>
	);
};

export default InfoSection;
