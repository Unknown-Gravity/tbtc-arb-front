import React from 'react';
import { Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

/**
 * @name Pagination
 *
 * @description This component displays the pagination.
 *
 * @param {number} currentPage The current page.
 * @param {number} totalPages The total pages.
 * @param {(page: number) => void} onPageChange The function to be called when the page changes.
 *
 * @returns {JSX.Element}
 */

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	return (
		<Flex justifyContent='center' alignItems='center' mt={8}>
			<IconButton
				aria-label='Previous Page'
				icon={<ChevronLeftIcon />}
				onClick={() => onPageChange(currentPage - 1)}
				isDisabled={currentPage === 1}
				variant='ghost'
				color='gray.500'
				_hover={{ color: 'gray.700' }}
				boxSize={6}
			/>
			<Text fontSize='12px' mx={4}>
				Page {currentPage} of {totalPages}
			</Text>
			<IconButton
				aria-label='Next Page'
				icon={<ChevronRightIcon />}
				onClick={() => onPageChange(currentPage + 1)}
				isDisabled={currentPage === totalPages}
				variant='ghost'
				color='gray.500'
				_hover={{ color: 'gray.700' }}
				boxSize={6}
			/>
		</Flex>
	);
};

export default Pagination;
