import { createIcon } from '@chakra-ui/react';

export const UpRightIcon = createIcon({
	displayName: 'UpRightIcon',
	viewBox: '0 0 13 13',

	path: (
		<>
			<path
				d='M4.11963 9L9.11963 4'
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				fill='none'
			/>
			<path
				d='M4.11963 4H9.11963V9'
				stroke='currentColor'
				stroke-linecap='round'
				stroke-linejoin='round'
				fill='none'
			/>
		</>
	),
	defaultProps: {
		boxSize: '12px',
	},
});
