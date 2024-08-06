import {
	Text,
	CloseButton,
	Stack,
	Link,
	useColorModeValue,
} from '@chakra-ui/react';
import CustomSpinner from '../../../../../../components/CustomSpinner';
import { LogoAloneIcon } from '../../../../../../assets/icons/LogoAlone';

type Props = {
	onClose: () => void;
};

const ConfirmActionModalUnmint = (props: Props) => {
	const logocolor = useColorModeValue('white', 'dark.primaryGray');
	const boxcolor = useColorModeValue('brand.purple.910', 'dark.primaryGray');
	const emptyColorValue = useColorModeValue('white', 'dark.focusGray');

	return (
		<Stack spacing={0}>
			<CloseButton
				onClick={props.onClose}
				position='absolute'
				top='16px'
				right='16px'
			/>
			<Text
				fontSize='24px'
				lineHeight='32px'
				fontWeight={500}
				variant='secondary'
			>
				Confirm Action{' '}
				<Text as='span' fontSize='16px' fontWeight={400}>
					(pending)
				</Text>
			</Text>

			<Stack
				borderRadius='14px'
				bg={boxcolor}
				h='240px'
				placeContent='center'
				placeItems='center'
				gap='23px'
				mt='16px'
				mb='24px'
			>
				<Stack position='relative'>
					<CustomSpinner
						emptyColor={emptyColorValue}
						w='120px'
						h='120px'
					/>
					<Stack
						position='absolute'
						left='60px'
						top='60px'
						transform={'translate(-50%, -50%)'}
						bg='brand.purple.900'
						h={'57.49px'}
						w='57.49px'
						placeContent='center'
						placeItems='center'
						borderRadius='50px'
					>
						<LogoAloneIcon
							boxSize='33.54px'
							color={logocolor}
							transform='translate(1px, 2px)'
						/>
					</Stack>
				</Stack>
				<Text variant='gray2' fontSize='18px' lineHeight='28px'>
					Pending
				</Text>
			</Stack>
			<Text fontSize='14px' lineHeight='20px' textAlign='center'>
				<Link variant='purpleDarkGradient' lineHeight='20px'>
					View transaction
				</Link>{' '}
				on Explorer
			</Text>
		</Stack>
	);
};

export default ConfirmActionModalUnmint;
