import { createIcon } from '@chakra-ui/react';

export const SidebarArrow = createIcon({
	displayName: 'SearchIcon',
	viewBox: '0 0 26 25',
	path: (
		<>
			<rect
				width='25'
				height='25'
				rx='12.5'
				transform='matrix(-1 0 0 1 25.5 0)'
				fill='#7D00FF'
			/>
			<path
				d='M9.19198 18.3396L16.808 14.043V10.957L9.19198 6.66037V9.62766L16.056 13.3308V11.6692L9.19198 15.3723V18.3396Z'
				fill='white'
			/>
		</>
	),
});
