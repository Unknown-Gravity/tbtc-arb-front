import HeaderComponentDesktop from './HeaderComponentDesktop';
import HeaderComponentMobile from './HeaderComponentMobile';

type Props = {
	title: string | undefined;
	isOpen: boolean;
	onOpen: () => void;
	isMobile: boolean;
};
const HeaderComponent = ({ title, isOpen, onOpen, isMobile }: Props) => {
	return (
		<>
			{isMobile ? (
				<HeaderComponentDesktop isOpen={isOpen} title={title} />
			) : (
				<HeaderComponentMobile isOpen={isOpen} onOpen={onOpen} />
			)}
		</>
	);
};

export default HeaderComponent;
