'use client'
import { IProductDictionary, ITableRow } from '@/app/lib/interfaces'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type tableHeaders = Pick<IProductDictionary, 'tableHeaders'>

interface IProps {
	tableRows: ITableRow[]
	dictionary: tableHeaders
}

const TableTh = ({ children }: { children: ReactNode }): React.JSX.Element => {
	return (
		<Th
			fontSize={{ base: '12px', lg: '14px' }}
			fontWeight="500"
			textTransform="none"
			textAlign="center"
			color="hText"
		>
			{children}
		</Th>
	)
}

const TableTd = ({ children }: { children: ReactNode }): React.JSX.Element => {
	return (
		<Td fontSize={{ base: '12px', lg: '14px' }} py="14px" textAlign="center">
			{children}
		</Td>
	)
}

export const ProductTable = ({ tableRows, dictionary }: IProps) => {
	return (
		<>
			{tableRows?.length > 0 && (
				<TableContainer mb={{ base: '41px', lg: '121px' }}>
					<Table>
						<Thead bg="tableRow">
							<Tr>
								<TableTh>{dictionary.tableHeaders.article}</TableTh>
								<TableTh>{dictionary.tableHeaders.diameter}</TableTh>
								<TableTh>{dictionary.tableHeaders.length}</TableTh>
								<TableTh>{dictionary.tableHeaders.weight}</TableTh>
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
