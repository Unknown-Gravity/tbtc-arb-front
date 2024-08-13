import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import { formatAddress } from '../../../../../../utils/utils';
import { TbCopy } from 'react-icons/tb';
type Props = {
	label: string;
	address: string;
	explorerLink: string;
	onCopy: () => void;
	iconColor: string;
	colorMode: string;
};

const AddressDisplayStep2Mintingcomponent = ({
	label,
	address,
	explorerLink,
	onCopy,
	iconColor,
	colorMode,
}: Props) => {
	return (
		<Flex justifyContent='space-between'>
			<Box
				bg={
					colorMode === 'light'
						? 'brand.purple.100'
						: 'dark.focusGray'
				}
				padding='4px 8px'
				borderRadius='4px'
			>
				<Text
					variant='darkPurpleGradient'
					fontSize='14px'
					lineHeight='20px'
				>
					{label}
				</Text>
			</Box>
			<Flex gap='9px'>
				<Link variant='grayPurple' href={explorerLink} isExternal>
					{formatAddress(address)}
				</Link>
				<Icon
					as={TbCopy}
					boxSize='24px'
					color={iconColor}
					transition='transform 0.1s'
					_hover={{ transform: 'scale(1.1)' }}
					_active={{ transform: 'scale(1)' }}
					cursor='pointer'
					onClick={onCopy}
				/>
			</Flex>
		</Flex>
	);
};

export default AddressDisplayStep2Mintingcomponent;
