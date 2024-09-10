import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';
import { LogoAloneIcon } from '../../assets/icons/LogoAlone';
import LogoIcon from '../../assets/icons/LogoIcon';

type Props = { isOpen: boolean };

const MotionBox = motion(
	forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
		<Box ref={ref} {...props} />
	)),
);

const SideBarLogo = ({ isOpen }: Props) => {
	const [hasAnimated, setHasAnimated] = useState(false);
	const logoColor = useColorModeValue('brand.purple.900', 'white');

	useEffect(() => {
		if (!hasAnimated) {
			setHasAnimated(true);
		}
	}, [hasAnimated]);
	return (
		<>
			{!isOpen && !hasAnimated && (
				<MotionBox
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5, delay: 1 } as any}
				>
					<LogoAloneIcon color={logoColor} boxSize='37px' ml='10px' />
				</MotionBox>
			)}
			{!isOpen && hasAnimated && (
				<Box>
					<LogoAloneIcon color={logoColor} boxSize='37px' ml='10px' />
				</Box>
			)}
			{isOpen && !hasAnimated && (
				<MotionBox
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, delay: 0.2 } as any}
					mx='auto'
				>
					<LogoIcon color={logoColor} boxSize='121px' h='37px' />
				</MotionBox>
			)}
			{isOpen && hasAnimated && (
				<MotionBox
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, delay: 0.1 } as any}
					mx='auto'
				>
					<LogoIcon color={logoColor} boxSize='121px' h='37px' />
				</MotionBox>
			)}
		</>
	);
};

export default SideBarLogo;
