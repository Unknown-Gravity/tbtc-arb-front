import { Flex } from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import DividerCustom from '../../../components/DividerCustom';
import ResumeMintingProcess from './components/ResumeDepositComponent/ResumeMintingProcess';
import InfoResumeMinting from './components/ResumeDepositComponent/InfoResumeMinting';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	setTabSelected: Dispatch<SetStateAction<number>>;
	setStep: Dispatch<SetStateAction<number>>;
};

const ResumeDepositComponent = ({ setTabSelected, setStep }: Props) => {
	return (
		<CustomBox w='100%' p='26px'>
			<Flex flexDir={{ base: 'column', xl: 'row' }}>
				<ResumeMintingProcess
					setTabSelected={setTabSelected}
					setStep={setStep}
				/>
				<DividerCustom />
				<InfoResumeMinting />
			</Flex>
		</CustomBox>
	);
};

export default ResumeDepositComponent;
