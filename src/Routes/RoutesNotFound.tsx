import { Route, Routes } from 'react-router-dom';
import { Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

/**
 * @name RoutesNotFound
 *
 * @description This component displays the routes that are not found.
 *
 * @param {ReactNode} children The children of the component.
 *
 * @returns {JSX.Element}
 */

const RoutesNotFound = ({ children }: Props) => {
	return (
		<Routes>
			{children}
			<Route
				path='*'
				element={
					<Stack
						direction={'row'}
						h='100vh'
						w={'100vw'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Text fontSize={'4xl'}>Page not found</Text>
					</Stack>
				}
			/>
		</Routes>
	);
};

export default RoutesNotFound;
