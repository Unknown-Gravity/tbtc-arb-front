import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

type Props = {
	header: string;
	info1: string;
	purpleInfo: string;
	info2: string;
};

const InfoWelcomeModalComponent = ({
	header,
	info1,
	purpleInfo,
	info2,
}: Props) => {
	return (
		<Stack>
			<Text
				fontWeight={600}
				fontSize='16px'
				lineHeight='16px'
				letterSpacing='1.05px'
			>
				{header}
			</Text>
			<Flex maxW='384px' alignItems='center' gap='12px'>
				<Icon
					as={BsFillArrowRightCircleFill}
					color='brand.purple.900'
				/>
				<Text fontSize='14px' lineHeight='20px'>
					{info1}{' '}
					<Text as='span' variant='purple'>
						{purpleInfo}
					</Text>{' '}
					{info2}
				</Text>
			</Flex>
		</Stack>
	);
};

export default InfoWelcomeModalComponent;
