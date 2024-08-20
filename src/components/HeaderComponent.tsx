import HeaderComponentDesktop from './HeaderComponentDesktop';
import HeaderComponentMobile from './HeaderComponentMobile';

type Props = {
	title: string;
	isOpen: boolean;
	onOpen: () => void;
	isMobile: boolean;
};
const HeaderComponent = (props: Props) => {
	return (
		<>
			{props.isMobile ? (
				<HeaderComponentDesktop isOpen={props.isOpen} title={props.title} />
			) : (
				<HeaderComponentMobile
					isOpen={props.isOpen}
					onOpen={props.onOpen}
				/>
			)}
		</>
	);
};

export default HeaderComponent;
