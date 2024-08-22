import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Text,
  Collapse,
  useBreakpointValue,
  GridItem,
  Flex,
  Spinner,
  Link,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { fetchIPFSData, fetchLoyaltyProgramCIDs, formatAddress, generateIdenticon } from '../../../utils/utils';
import EventRow from './EventRow';
import Pagination from '../Pagination';

interface Reward {
  provider: string;
  weighted_avg_liquidity: string;
}

type Token = {
  amount: string;
  symbol: string;
  decimals: number;
}

interface Event {
  provider: string;
  event: string;
  token1: Token
  token2: Token
  transactionHash: string;
  timestamp: number;
}

interface LeaderboardRowProps {
  index: number;
  totalPoints: number;
  events: Event[];
  reward: Reward;
  isSmallScreen: boolean;
  expandedRow: number | null;
  onExpand: () => void;
  isExpanded: boolean;
}

interface LeaderboardComponentProps {
  searchQuery: string;
}

const ITEMS_PER_PAGE = 20;
const arbscanBaseUrl = 'https://arbiscan.io';

const LeaderboardHeader: React.FC<{ isSmallScreen: boolean }> = ({ isSmallScreen }) => (
  <Grid
    templateColumns={isSmallScreen ? 'repeat(5, 1fr)' : 'repeat(7, 1fr)'}
    alignItems='center'
    pl={{ sm: 12, md: 16 }}
    py={4}
    textTransform='uppercase'
  >
    <Text fontSize='12px' fontWeight={500}>Rank</Text>
    <GridItem colSpan={2}>
      <Text fontSize='12px' fontWeight={500}>Address</Text>
    </GridItem>
    <GridItem colSpan={2}>
      <Text fontSize='12px' fontWeight={500}>Points</Text>
    </GridItem>
    {!isSmallScreen && (
      <>
        <Text fontSize='12px' fontWeight={500}>Share</Text>
        <Text fontSize='12px' fontWeight={500}></Text>
      </>
    )}
  </Grid>
);

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  index,
  totalPoints,
  events,
  reward,
  isSmallScreen,
  expandedRow,
  onExpand,
  isExpanded,
}) => {
  const points = parseFloat(reward.weighted_avg_liquidity);
  const sharePercentage = ((points / totalPoints) * 100).toFixed(2);

  const sortedEvents = events
    .filter(event => event.provider.toLowerCase() === reward.provider.toLowerCase() && 
    !(Number(event.token1.amount) === 0 && Number(event.token2.amount) === 0))
    .sort((a, b) => b.timestamp - a.timestamp);

  const { colorMode } = useColorMode();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = sortedEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box key={index}>
      <Grid
        templateColumns={isSmallScreen ? 'repeat(5, 1fr)' : 'repeat(7, 1fr)'}
        alignItems='center'
        cursor='pointer'
        bg={
          index % 2 === 0 
            ? colorMode === 'light' 
              ? 'gray.100' 
              : "dark.focusGray" 
            : "transparent"}
        rounded='md'
        onClick={onExpand}
        pl={{ sm: 12, md: 16 }}
        py={5}
      >
        <Text fontSize='12px' variant='gray'>{index + 1}</Text>
        <GridItem colSpan={2}>
          <Tooltip label={reward.provider} fontSize="xs">
            <Link href={`${arbscanBaseUrl}/address/${reward.provider}`} isExternal>
              <Flex alignItems='center' gap={2}>
                {!isSmallScreen && 
                  <img
                    src={generateIdenticon(reward.provider)}
                    alt="Identicon"
                    width={16}
                    height={16}
                    style={{ marginRight: '6px' }}
                  />
                }
                <Text fontSize='12px' variant='gray'>{formatAddress(reward.provider)}</Text>
                {!isSmallScreen && 
                  <ExternalLinkIcon 
                    mx="2px" 
                    boxSize={3.5} 
                    color={
                      colorMode === 'light' 
                        ? 'light.gray' 
                        : "dark.coolGray"
                    } 
                  />
                }
              </Flex>
            </Link>
          </Tooltip>
        </GridItem>
        <GridItem colSpan={2}>
          <Tooltip label={points} fontSize="xs">
            <Text fontSize='12px' variant='gray'>{points.toFixed(2)}</Text>
          </Tooltip>
        </GridItem>
        {!isSmallScreen && (
          <>
            <Text fontSize='12px' variant='gray'>~{sharePercentage}%</Text>
            <Flex justifyContent='center'>
              {isExpanded ? <ChevronUpIcon boxSize={6} /> : <ChevronDownIcon boxSize={6} />}
            </Flex>
          </>
        )}
      </Grid>
      <Collapse in={isExpanded} animateOpacity>
        <Box mt={1} pb={3} bg={
          index % 2 === 0 
          ? colorMode === 'light' 
            ? 'gray.100' 
            : "dark.focusGray"
          : "transparent"}>
          <Grid 
            templateColumns={isSmallScreen ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)'}
            gap={4} 
            textTransform='uppercase'
            pl={{ sm: 8, lg: 24 }}
            py={4}
          >
            <Text fontSize='11px' fontWeight={500}>Event</Text>
            <GridItem colSpan={isSmallScreen ? 1 : 2}>
              <Text fontSize='11px' fontWeight={500}>Amounts</Text>
            </GridItem>
            {!isSmallScreen && 
              <Text fontSize='11px' fontWeight={500}>Tx. Hash</Text>
            }
            <Text fontSize='11px' fontWeight={500}>Timestamp</Text>
          </Grid>
          {paginatedEvents.map((event, eventIndex) => (
            <EventRow key={eventIndex} event={event} isSmallScreen={isSmallScreen ?? false} />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Collapse>
    </Box>
  )
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ searchQuery }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rewardsData, setRewardsData] = useState<Reward[]>([]);
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cids = await fetchLoyaltyProgramCIDs();
        const [rewards, events] = await Promise.all([
          fetchIPFSData(cids.rewards_cid),
          fetchIPFSData(cids.events_cid),
        ]);
        setRewardsData(rewards.rewards);
        setEventsData(events.events);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="480px">
        <Spinner size="lg" />
      </Box>
    );
  }

  const totalPoints = rewardsData.reduce((sum, reward) => sum + parseFloat(reward.weighted_avg_liquidity), 0);
  const sortedRewards = rewardsData.sort((a, b) => parseFloat(b.weighted_avg_liquidity) - parseFloat(a.weighted_avg_liquidity));
  const filteredRewards = sortedRewards.filter(reward =>
    reward.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRewards.length / ITEMS_PER_PAGE);
  const paginatedRewards = filteredRewards.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Box p='10px' w='100%' borderRadius='5px'>
      <LeaderboardHeader isSmallScreen={isSmallScreen ?? false} />
      {paginatedRewards.map((reward, index) => (
          <LeaderboardRow
            key={filteredRewards.indexOf(reward)}
            totalPoints={totalPoints}
            events={eventsData}
            index={sortedRewards.indexOf(reward)}
            reward={reward}
            isSmallScreen={isSmallScreen ?? false}
            expandedRow={expandedRow}
            onExpand={() => handleExpand(index)}
            isExpanded={expandedRow === index}
          />
        )
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Text fontSize='12px' variant='gray'>
        {`Showing ${currentPage * ITEMS_PER_PAGE > filteredRewards.length ? filteredRewards.length : currentPage * ITEMS_PER_PAGE} of ${filteredRewards.length} entries`}
      </Text>
    </Box>
  );
};
  
export default LeaderboardComponent;
