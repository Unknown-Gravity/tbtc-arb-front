import {
	Skeleton,
	Spinner,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import { currencyFormatter } from '../../../../utils/utils';

type Props = { info: number; label: string; symbol?: string };

const InfoHeaderExploreComponent = ({ info, label, symbol }: Props) => {
	const bgBox = useColorModeValue('white', 'dark.focusGray');
	return (
		<CustomBox w='294px' h='170px' bg={bgBox}>
			<Stack
				spacing='0'
				alignItems='center'
				justifyContent='center'
				h='100%'
			>
				<Text fontSize='36px' lineHeight='40px' fontWeight={600}>
					{info !== 0 ? (
						currencyFormatter(info, 'USD', symbol)
					) : (
						<Skeleton h='40px' />
					)}
				</Text>
				<Text variant='gray' fontSize='16px' lineHeight='24px'>
					{label}
				</Text>
			</Stack>
		</CustomBox>
	);
};

export default InfoHeaderExploreComponent;
