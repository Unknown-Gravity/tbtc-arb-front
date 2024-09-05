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
import { Event } from './LeaderboardComponent';

interface Token {
  amount: string;
  symbol: string;
  decimals: number;
}
interface EventRowProps {
  event: Event;
  isSmallScreen: boolean;
}

const arbscanBaseUrl = 'https://arbiscan.io';

const EventRow: React.FC<EventRowProps> = ({ event, isSmallScreen }) => {
  const { colorMode } = useColorMode();
  const { token0, token1, transactionHash, timestamp } = event;

  const token0Amount = useMemo(() => 
    truncateToDecimals(
      ethers.utils.formatUnits(token0.amount, token0.decimals), 4
    ), [token0?.amount, token0?.decimals]);
    
  const token1Amount = useMemo(() => 
    truncateToDecimals(
      ethers.utils.formatUnits(token1.amount, token1.decimals), 4
    ), [token1?.amount, token1?.decimals]);

  const renderToken = (amount: string, token: Token | undefined) => {
    return token && Number(token.amount) > 0 ? (
      <Tooltip label={`${ethers.utils.formatUnits(token.amount, token.decimals)} ${token.symbol}`} fontSize="xs">
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
      pl={[ 8, 12, 24 ]}
      py={2.5}
    >
      <Text fontSize='12px' variant='gray' textTransform='uppercase'>{event.action}</Text>
      <GridItem colSpan={isSmallScreen ? 1 : 2}>
        <Text fontSize='12px' variant='gray'>
          {renderToken(token0Amount, token0)}
          {ethers.utils.parseUnits(token0.amount, token0.decimals).gt(0) && ethers.utils.parseUnits(token1.amount, token1.decimals).gt(0) && " and "}
          {renderToken(token1Amount, token1)}
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
