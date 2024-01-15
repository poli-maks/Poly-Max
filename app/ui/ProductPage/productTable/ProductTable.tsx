'use client'
import { ITableRow } from '@/app/lib/interfaces'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export const ProductTable = ({ tableRows }: { tableRows: ITableRow[] }) => {
	return (
		<>
			{tableRows?.length > 0 && (
				<TableContainer>
					<Table variant="striped" colorScheme="teal">
						<Thead>
							<Tr>
								<Th>Article</Th>
								<Th>Diameter (mm)</Th>
								<Th>Length (mm)</Th>
								<Th>Weight (kg)</Th>
							</Tr>
						</Thead>
						<Tbody>
							{tableRows.map((row) => (
								<Tr key={row.id}>
									<Td>{row.article}</Td>
									<Td>{row.diameter}</Td>
									<Td>{row.length}</Td>
									<Td>{row.weight}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}
