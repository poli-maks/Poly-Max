import { Skeleton, Table, TableContainer, Tbody, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const TableSkeleton = () => {
	return (
		<TableContainer mb={{ base: '41px', lg: '121px' }}>
			<Table>
				<Thead bg="tableRow">
					<Tr>
						<Skeleton height="20px" />
						<Skeleton height="20px" />
						<Skeleton height="20px" />
						<Skeleton height="20px" />
					</Tr>
				</Thead>
				<Tbody>
					<Skeleton height="20px" />
					<Skeleton height="20px" />
					<Skeleton height="20px" />
					<Skeleton height="20px" />
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default TableSkeleton
