import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerFooter,
	Stack,
	Flex,
	Text,
} from '@chakra-ui/react';
import LogoIcon from '../../assets/icons/LogoIcon';
import IconSideBar from './IconSideBar';
import { useState } from 'react';
import { HouseIcon } from '../../assets/icons/HouseIcon';
import { BitcoinIcon } from '../../assets/icons/BitcoinIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { GitHubIcon } from '../../assets/icons/GitHubIcon';
import { DiscorIcon } from '../../assets/icons/DiscordIcon';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	onClick: (tag: number) => void;
};

const DrawerComponent = (props: Props) => {
	const [selectedTag, setSelectedTag] = useState<number | undefined>(1);

	const handleClick = (tag: number) => {
		setSelectedTag(tag);
	};

	return (
		<Drawer isOpen={props.isOpen} placement='left' onClose={props.onClose}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader w='100%' display='flex' justifyContent='center'>
					<LogoIcon
						color='brand.purple.900'
						boxSize='160px'
						h='20px'
					/>
				</DrawerHeader>

				<DrawerBody display='flex' flexDir='column' gap='20px'>
					<IconSideBar
						tag={1}
						icon={HouseIcon}
						isOpen={true}
						selectedTag={selectedTag}
						setSelectedTag={handleClick}
						text='Overview'
					/>
					<IconSideBar
						tag={2}
						icon={BitcoinIcon}
						isOpen={true}
						selectedTag={selectedTag}
						setSelectedTag={handleClick}
						text='Overview'
					/>
					<IconSideBar
						tag={3}
						icon={SearchIcon}
						isOpen={true}
						selectedTag={selectedTag}
						setSelectedTag={handleClick}
						text='Overview'
					/>
				</DrawerBody>
				<DrawerFooter justifyContent='center' flexDir='column'>
					<Flex>
						<IconSideBar
							icon={GitHubIcon}
							isOpen={false}
							text='GitHub'
						/>
						<IconSideBar
							icon={DiscorIcon}
							isOpen={false}
							text='Discord'
						/>
					</Flex>
					<Text fontSize='10px'>© 2024 Threshold Network</Text>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerComponent;
