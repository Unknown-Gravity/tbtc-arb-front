import {
	Box,
	Flex,
	Image,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { HiClock } from 'react-icons/hi2';
import { millisecondsToTimeString } from '../../../../../utils/utils';
import { useEffect, useState } from 'react';
import SideInformationComponent from '../../../../../components/SideInformationComponent';
import TransactionCompletedImage from '../../../../../assets/icons/TransactionCompletedImage';

type Props = { isSent: boolean };

const ElapsedTimeComponent = (props: Props) => {
	const bgColor = 'linear-gradient(122.36deg, #B62CFF 0%, #7D00FF 100%)';
	const iconBgcolor = useColorModeValue('white', 'dark.primaryGray');
	const [ellapsedTime, setEllapsedTime] = useState(
		millisecondsToTimeString(Date.now() - 1722517284239),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setEllapsedTime(
				millisecondsToTimeString(Date.now() - 1722517284239),
			);
		}, 60000); // Actualizar cada minuto

		return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
	}, []);

	return (
		<Flex flexDir='column' justifyContent='space-between'>
			<Box>
				<Stack spacing='20px'>
					<Text
						variant='secondary'
						fontSize='14px'
						lineHeight='16px'
						letterSpacing='0.0075em'
						fontWeight={600}
					>
						ELAPSED TIME
					</Text>
					<Flex
						p='4px 8px 4px 8px'
						bg={bgColor}
						borderRadius='20px'
						gap='4px'
						w='fit-content'
					>
						<HiClock color='white' size='12px' />
						<Text
							color='white'
							fontSize='10px'
							lineHeight='12px'
							letterSpacing='0.0075em'
							fontWeight={500}
						>
							{ellapsedTime}
						</Text>
					</Flex>
					<Text
						variant='secondary'
						fontSize='14px'
						lineHeight='16px'
						letterSpacing='0.0075em'
						fontWeight={600}
					>
						TRANSACTION HISTORY
					</Text>
				</Stack>
				<Stack spacing='25px' mt='25px'>
					<Text variant='gray' fontSize='14px' lineHeight='20px'>
						Unwrap{' '}
						<Link variant='purpleDarkGradient'>transaction</Link>
					</Text>
					<Text variant='gray' fontSize='14px' lineHeight='20px'>
						Unwrap{' '}
						<Link variant='purpleDarkGradient'>transaction</Link>
					</Text>
				</Stack>
			</Box>
			{!props.isSent ? (
				<SideInformationComponent
					header='Minters and a secure tBTC'
					body='A phased approach with one main function: Minters'
				/>
			) : (
				<TransactionCompletedImage
					w='191px'
					h='146px'
					color={iconBgcolor}
				/>
			)}
		</Flex>
	);
};

export default ElapsedTimeComponent;
