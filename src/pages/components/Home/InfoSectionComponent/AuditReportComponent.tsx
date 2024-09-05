import { CustomBox } from '../../../../components/CustomBox';
import { Stack, Text } from '@chakra-ui/react';
import DocumentBoxComponent from './DocumentBoxComponent';

const reports = [
	{
		id: 1,
		name: 'Least Authority Report',
		description: 'tBTC Bridge v2 Security',
		link: 'https://leastauthority.com/blog/audits/audit-of-keep-network-tbtc-bridge-v2/',
	},
];

const AuditReportComponent = () => {
	return (
		<CustomBox w='100%' as={Stack} justifyContent='space-between' p='25px'>
			<Text fontSize='24px' fontWeight={700}>
				Audit Report
			</Text>

			<Stack gap='8px' mt='10px'>
				{reports.map(report => {
					return (
						<DocumentBoxComponent key={report.id} report={report} />
					);
				})}
			</Stack>
		</CustomBox>
	);
};

export default AuditReportComponent;
