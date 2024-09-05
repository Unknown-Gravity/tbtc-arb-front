import { FC } from 'react';
import HeaderInfoComponent from './InfoSectionComponent/HeaderInfoComponent';
import Section1InfoComponent from './InfoSectionComponent/Section1InfoComponent';
import Section2InfoComponent from './InfoSectionComponent/Section2InfoComponent';
import { Flex, Stack } from '@chakra-ui/react';
import MintinTimelineComponent from './InfoSectionComponent/MintinTimelineComponent';
import ContractsSectionComponent from './InfoSectionComponent/ContractsSectionComponent';
import JsonFileComponent from './InfoSectionComponent/JsonFileComponent';
import AuditReportComponent from './InfoSectionComponent/AuditReportComponent';

const InfoSectionComponent: FC = () => {
	return (
		<Stack gap={4} maxW={{ base: '100%', xl: '1134px' }} mx='auto'>
			<HeaderInfoComponent />
			<Section1InfoComponent />
			<Section2InfoComponent />
			<Flex
				justifyContent='center'
				alignContent='center'
				minW={{ xl: '1134px' }}
				mx='auto'
				gap={4}
				flexDirection={{ base: 'column', xl: 'row' }}
			>
				<Stack
					alignItems='center'
					w={{ base: '100%', xl: '50%' }}
					gap={4}
				>
					<MintinTimelineComponent />
				</Stack>
				<Stack
					alignItems='center'
					w={{ base: '100%', xl: '50%' }}
					gap={4}
				>
					<JsonFileComponent />
					<AuditReportComponent />
					<ContractsSectionComponent />
				</Stack>
			</Flex>
		</Stack>
	);
};

export default InfoSectionComponent;
