import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
	header: string;
	body: string;
	icon: IconType;
};

/**
 * @name LittleInfoComponent
 *
 * @description This component is a reusable component that displays the information in the HeaderInfoComponent.
 *
 * @param { string } header - The header of the information.
 * @param { string } body - The body of the information.
 * @param { IconType } icon - The icon of the information.
 *
 * @returns { JSX.Element }
 */

const LittleInfoComponent = ({ header, body, icon }: Props) => {
	return (
		<Stack gap='12px' alignItems='center'>
			<Box
				p={'15px'}
				bg='brand.purple.900'
				w='56px'
				h='56px'
				borderRadius='10px'
			>
				<Icon as={icon} boxSize='26px' color='white' />
			</Box>
			<Text fontSize='17.9px' fontWeight={700}>
				{header}
			</Text>
			<Text fontSize='13.9px' variant='gray' textAlign='center'>
				{body}
			</Text>
		</Stack>
	);
};

export default LittleInfoComponent;
