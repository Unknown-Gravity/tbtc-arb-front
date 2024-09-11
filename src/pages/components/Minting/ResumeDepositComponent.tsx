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

/**
 * @name ResumeDepositComponent
 *
 * @description This component displays the resume deposit component.
 *
 * @param {Dispatch<SetStateAction<number>>} setTabSelected The function to set the selected tab.
 * @param {Dispatch<SetStateAction<number>>} setStep The function to set the step.
 *
 * @returns {JSX.Element}
 */

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
