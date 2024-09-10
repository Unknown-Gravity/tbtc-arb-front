import {
	Box,
	Flex,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { IoMdLink } from 'react-icons/io';
import { Contract } from '../../../../interfaces/Contract.interface';
import { BiSolidFileBlank } from 'react-icons/bi';
import { UpRightIcon } from '../../../../assets/icons/UpRightIcon';
import { Report } from '../../../../interfaces/Report.interface';

type Props = {
	contract?: Contract;
	report?: Report;
};

/**
 * @name DocumentBoxComponent
 *
 * @description This component is a reusable component that displays the document box used in the InfoSectionComponent.
 *
 * @param { Contract } contract - The contract data.
 * @param { Report } report - The report data.
 *
 * @returns { JSX.Element }
 */

const DocumentBoxComponent = ({ contract, report }: Props) => {
	const boxBg = useColorModeValue('light.lightGray', 'dark.focusGray');
	const filter = useColorModeValue('brightness(0.9)', 'brightness(1.15)');
	const isContract = Boolean(contract);

	const icon = isContract ? (
		<IoMdLink size='26px' color='white' />
	) : (
		<BiSolidFileBlank size='26px' color='white' />
	);

	const name = contract?.name || report?.name;
	const description = report?.description;
	const link = contract?.link || report?.link;

	return (
		<Flex
			bg={boxBg}
			p='16px'
			borderRadius='10px'
			justifyContent='space-between'
			alignItems='center'
			h={{ base: 'auto', xl: isContract ? '80px' : '96px' }}
			flexDir={{ base: 'column', xl: 'row' }}
			as={Link}
			href={link}
			rel={isContract ? 'noopener noreferrer' : undefined}
			isExternal
			transition='filter 0.2s'
			_hover={{
				textDecor: 'none',
				filter,
			}}
		>
			<Flex
				alignItems='center'
				gap='16px'
				flexDir={{ base: 'column', xl: 'row' }}
			>
				<Box
					p='11px'
					bg='brand.purple.900'
					w='fit-content'
					borderRadius='6px'
				>
					{icon}
				</Box>
				<Stack gap='0.5px'>
					<Text
						fontSize='18px'
						fontWeight='400'
						textAlign={{ base: 'center', xl: 'start' }}
					>
						{name}
					</Text>
					{description && (
						<Text
							fontSize='14px'
							fontWeight='400'
							variant='gray'
							textAlign={{ base: 'center', xl: 'start' }}
						>
							{description}
						</Text>
					)}
				</Stack>
			</Flex>
			<Link
				href='https://github.com/keep-network/tbtc-v2/blob/main/docs/rfc/rfc-1.adoc'
				variant='purpleDarkGradient'
				isExternal
			>
				Read More
				<UpRightIcon />
			</Link>
		</Flex>
	);
};

export default DocumentBoxComponent;
