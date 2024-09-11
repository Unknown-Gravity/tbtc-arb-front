import { Skeleton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import { currencyFormatter } from '../../../../utils/utils';

type Props = { info: number; label: string; symbol?: string };

/**
 *
 * @name InfoHeaderExploreComponent
 *
 * @description This component is a reusable component that displays the information of the header of the explore page.
 *
 * @param { number } info - The information to display.
 * @param { string } label - The label of the information.
 * @param { string } symbol - The symbol of the information.
 *
 * @returns { JSX.Element }
 */

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
