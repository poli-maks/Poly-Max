'use client'
import { ITableRow } from '@/app/lib/interfaces'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

const TableTh = ({ children }: { children: ReactNode }): React.JSX.Element => {
	return (
		<Th fontSize="14px" fontWeight="500" textTransform="none" textAlign="center" color="hText">
			{children}
		</Th>
	)
}

const TableTd = ({ children }: { children: ReactNode }): React.JSX.Element => {
	return (
		<Td py="14px" textAlign="center">
			{children}
		</Td>
	)
}

export const ProductTable = ({ tableRows }: { tableRows: ITableRow[] }) => {
	return (
		<>
			{tableRows?.length > 0 && (
				<TableContainer mt={{ base: '48px', lg: '120px' }} mb={{ base: '41px', lg: '121px' }}>
					<Table>
						<Thead bg="tableRow">
							<Tr>
								<TableTh>Artikel</TableTh>
								<TableTh>Diameter (mm)</TableTh>
								<TableTh>Length (mm)</TableTh>
								<TableTh>Weight (kg)</TableTh>
							</Tr>
						</Thead>
						<Tbody>
							{tableRows.map((row, index) => (
								<Tr key={row.id} bg={index % 2 !== 0 ? 'tableRow' : 'transparent'}>
									<TableTd>{row.article}</TableTd>
									<TableTd>{row.diameter}</TableTd>
									<TableTd>{row.length}</TableTd>
									<TableTd>{row.weight}</TableTd>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}
