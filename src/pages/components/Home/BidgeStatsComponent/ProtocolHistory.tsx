import { Flex } from '@chakra-ui/react';
import TxInfoComponent from './TxInfoComponent';

type Props = {
	tbtcTransactions: Array<any>;
};

const ProtocolHistory = ({ tbtcTransactions }: Props) => {
	return (
		<Flex w='100%' gap='10px'>
			<Flex w='100%' gap=' 10px' pt='20px' flexDir='column'>
				{tbtcTransactions &&
					tbtcTransactions.slice(0, 4).map((tx, index) => {
						return (
							<TxInfoComponent
								key={index}
								value={tx.value}
								hash={tx.hash}
								timeStamp={tx.timeStamp}
								link={tx.link}
							/>
						);
					})}
			</Flex>
			<Flex w='100%' gap=' 10px' pt='20px' flexDir='column'>
				{tbtcTransactions &&
					tbtcTransactions.slice(4, 8).map((tx, index) => {
						return (
							<TxInfoComponent
								key={index}
								value={tx.value}
								hash={tx.hash}
								timeStamp={tx.timeStamp}
								link={tx.link}
							/>
						);
					})}
			</Flex>
		</Flex>
	);
};

export default ProtocolHistory;
