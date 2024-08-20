import React, { useMemo } from 'react';
import { ethers } from 'ethers';
import {
  Grid,
  Text,
  GridItem,
  Flex,
  Link,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { formatAddress, truncateToDecimals } from '../../../utils/utils';
import { formatDate, getRelativeTime } from '../../../utils/date';

interface Token {
  amount: string;
  symbol: string;
  decimals: number;
}

interface Event {
  provider: string;
  event: string;
  token1: Token;
  token2: Token;
  transactionHash: string;
  timestamp: number;
}

interface EventRowProps {
  event: Event;
  isSmallScreen: boolean;
}

const arbscanBaseUrl = 'https://arbiscan.io';

const EventRow: React.FC<EventRowProps> = ({ event, isSmallScreen }) => {
  const { colorMode } = useColorMode();
  const { token1, token2, transactionHash, timestamp } = event;

  const token1Amount = useMemo(() => truncateToDecimals(ethers.formatUnits(token1.amount, token1.decimals), 4), [token1.amount, token1.decimals]);
  const token2Amount = useMemo(() => truncateToDecimals(ethers.formatUnits(token2.amount, token2.decimals), 4), [token2.amount, token2.decimals]);

  const renderToken = (amount: string, token: Token) => {
    return Number(token.amount) > 0 ? (
      <Tooltip label={`${parseFloat(ethers.formatUnits(token.amount, token.decimals))} ${token.symbol}`} fontSize="xs">
        {`${amount} ${token.symbol}`}
      </Tooltip>
    ) : null;
  };

  return (
    <Grid 
      templateColumns={isSmallScreen ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'}
      gap={4} 
      alignItems='center' 
      mt={2}
      pl={{ sm: 8, lg: 24 }}
      py={2.5}
    >
      <Text fontSize='12px' variant='gray' textTransform='uppercase'>{event.event}</Text>
      <GridItem colSpan={isSmallScreen ? 1 : 2}>
        <Text fontSize='12px' variant='gray'>
          {renderToken(token1Amount, token1)}
          {(parseFloat(token1Amount) > 0 && parseFloat(token2Amount) > 0) && " and "}
          {renderToken(token2Amount, token2)}
        </Text>
      </GridItem>
      {!isSmallScreen && 
        <Tooltip label={transactionHash} fontSize="xs">
          <Link href={`${arbscanBaseUrl}/tx/${transactionHash}`} isExternal>
            <Flex alignItems='center' gap={1.5}>
              <Text fontSize='12px' variant='gray'>{formatAddress(transactionHash)}</Text>
              <ExternalLinkIcon 
                mx="2px" 
                boxSize={3.5} 
                color={colorMode === 'light' ? 'light.gray' : "dark.coolGray"}
              />
            </Flex>
          </Link>
        </Tooltip>
      }
      <Tooltip label={formatDate(timestamp)} fontSize="xs">
        <Text fontSize='12px' variant='gray'>{getRelativeTime(timestamp)}</Text>
      </Tooltip>
    </Grid>
  );
};

export default EventRow;
