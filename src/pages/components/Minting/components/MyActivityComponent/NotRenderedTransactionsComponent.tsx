import { Flex, Image, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import TransactionComponent from '../TransactionComponent';
import {
	DarkMintingActivity,
	LightMintingActivity,
} from '../../../../../assets/images';

type Props = {};

/**
 * @name NotRenderedTransactionsComponent
 *
 * @description This component displays the transactions that have not been rendered yet.
 *
 * @returns {JSX.Element}
 */

const NotRenderedTransactionsComponent = (props: Props) => {
	const image = useColorModeValue(LightMintingActivity, DarkMintingActivity);
	return (
		<Stack mt='40px'>
			<Flex
				justifyContent='space-between'
				w={{ base: '95%', xl: '230px' }}
				mx={'auto'}
			>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='16px'
					fontWeight={600}
				>
					TBTC
				</Text>
				<Text
					variant='gray'
					fontSize='14px'
					lineHeight='16px'
					fontWeight={600}
				>
					STATE
				</Text>
			</Flex>
			<TransactionComponent />
			<TransactionComponent />
			<Image src={image} mt='55px' mx='auto' />
			<Text variant='gray' fontSize='16px' textAlign='center'>
				You have no history yet
			</Text>
		</Stack>
	);
};

export default NotRenderedTransactionsComponent;
