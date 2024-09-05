import { Link, Text } from '@chakra-ui/react';
import { getBlockExplorerUrl } from '../../../../../../../utils/utils';

type Props = {
	isMainnet: boolean;
	txHash: string;
	blockExplorer: string;
};

const TransactionsInfoTransactionHistoryComponent = ({
	isMainnet,
	txHash,
	blockExplorer,
}: Props) => {
	const link = getBlockExplorerUrl(isMainnet, txHash, blockExplorer);
	const header =
		blockExplorer === 'ETHERSCAN'
			? 'Minting Initialized:'
			: blockExplorer === 'ARBISCAN'
			? 'Reveal:'
			: 'BTC confirmation:';
	return (
		<Text variant='gray' fontSize='14px' lineHeight='20px' fontWeight={400}>
			{header}{' '}
			<Link variant='purpleDarkGradient' href={link} isExternal={true}>
				{' '}
				transaction
			</Link>
		</Text>
	);
};

export default TransactionsInfoTransactionHistoryComponent;
