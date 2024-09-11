import { Flex, FlexProps, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	title: string;
	children?: ReactNode;
	flexDir?: FlexProps['flexDirection'];
};

/**
 * @name InfoTextTemplateComponent
 *
 * @description This component is a reusable component that displays the information of the text template.
 *
 * @param { string } title - The title of the information.
 * @param { ReactNode } children - The children of the component.
 * @param { FlexProps['flexDirection'] } flexDir - The flex direction of the component.
 *
 * @returns { JSX.Element }
 */

const InfoTextTemplateComponent = ({ title, children, flexDir }: Props) => {
	return (
		<Stack gap='15px'>
			<Text fontSize='24px' fontWeight={700}>
				{title}
			</Text>
			<Flex
				color={'brand.purple.900'}
				alignItems='center'
				gap={2}
				flexDir={flexDir}
			>
				{children}
			</Flex>
		</Stack>
	);
};

export default InfoTextTemplateComponent;
