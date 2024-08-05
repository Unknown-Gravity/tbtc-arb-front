import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Link,
	Stack,
	Text,
} from '@chakra-ui/react';
import { CustomBox } from '../../../components/CustomBox';
import DividerCustom from '../../../components/DividerCustom';
import HeaderStepsMintingComponent from './components/MintingProcess/HeaderStepsMintingComponent';
import DragAndDropComponent from './components/ResumeDepositComponent/DragAndDropComponent';
import ResumeMintingProcess from './components/ResumeDepositComponent/ResumeMintingProcess';
import InfoResumeMinting from './components/ResumeDepositComponent/InfoResumeMinting';

type Props = {};

const ResumeDepositComponent = (props: Props) => {
	return (
		<CustomBox w='100%' p='26px'>
			<Flex flexDir={{ base: 'column', xl: 'row' }}>
				<ResumeMintingProcess />
				<DividerCustom />
				<InfoResumeMinting />
			</Flex>
		</CustomBox>
	);
};

export default ResumeDepositComponent;
