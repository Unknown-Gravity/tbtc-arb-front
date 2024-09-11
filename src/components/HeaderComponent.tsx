import HeaderComponentDesktop from './HeaderComponentDesktop';
import HeaderComponentMobile from './HeaderComponentMobile';

type Props = {
	title: string | undefined;
	isOpen: boolean;
	onOpen: () => void;
	isMobile: boolean;
};

/**
 *
 * @name HeaderComponent
 *
 * @description This component is a reusable component that displays the header of the application.
 *
 * @param { string | undefined } title - The title of the header.
 * @param { boolean } isOpen - A boolean to determine if the sidebar is open or not.
 * @param { () => void } onOpen - A function to open the sidebar.
 * @param { boolean } isMobile - A boolean to determine if the device is mobile or not.
 *
 * @returns	{ JSX.Element }
 */

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
