import { Flex } from '@chakra-ui/react';
import { CustomBox } from '../../../../components/CustomBox';
import InfoSection from './InfoSection';

/**
 *
 * @name Section1InfoComponent
 *
 * @description This component contains the information of the home page. It is the first section of the InfoComponent.
 *
 * @returns { JSX.Element }
 */

const Section1InfoComponent = () => {
	return (
		<CustomBox
			minW={{ base: '100%', xl: '1134px' }}
			mx='auto'
			p='30px 40px 30px 40px'
		>
			<Flex
				flexDir={{ base: 'column', md: 'row' }}
				gap={{ base: 5 }}
				justifyContent='space-between'
			>
				<InfoSection
					title='Bridging Duration'
					content='Your tBTC token will arrive in'
					highlight='~ 1 to 3 hours'
					postContent='after you Initiate Minting, depending on your deposited amount.'
				/>
				<InfoSection
					title='Minimum Deposit'
					content='The minimum deposit is'
					highlight='0.01 BTC.'
					postContent='Depositing less than the minimum can mean losing access to your funds.'
				/>
			</Flex>
		</CustomBox>
	);
};

export default Section1InfoComponent;
