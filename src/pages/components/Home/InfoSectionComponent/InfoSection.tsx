import { Flex, Stack, Text } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

type Props = {
	title: string;
	content: string;
	highlight: string;
	postContent: string;
};

/**
 * @name InfoSection
 *
 * @description This component is a reusable component that displays the information of the home page.
 *
 * @param { string } title - The title of the information.
 * @param { string } content - The content of the information.
 * @param { string } highlight - The highlight of the information.
 * @param { string } postContent - The post content of the information.
 *
 * @returns { JSX.Element }
 */

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
