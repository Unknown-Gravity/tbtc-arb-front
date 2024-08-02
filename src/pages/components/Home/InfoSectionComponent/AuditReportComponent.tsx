import React from 'react';
import { CustomBox } from '../../../../components/CustomBox';
import { Stack, Text } from '@chakra-ui/react';
import { reports } from '../../../../data/mockData';
import DocumentBoxComponent from './DocumentBoxComponent';

const AuditReportComponent = () => {
	return (
		<CustomBox
			h='504px'
			w='100%'
			as={Stack}
			justifyContent='space-between'
			p='25px'
		>
			<Text fontSize='24px' fontWeight={700}>
				AUDIT REPORT
			</Text>

			<Stack gap='8px'>
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
