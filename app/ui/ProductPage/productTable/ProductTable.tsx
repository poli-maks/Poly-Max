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

const isTableEmpty = (
	arr: ITableRow[],
	key: 'article' | 'diameter' | 'length' | 'weight'
): boolean => {
	return arr.every((el) => el[key] === null || !el[key].length)
}

const isNotSavedEmpty = (arr: ITableRow[]) => {
	const keys: ['article', 'diameter', 'length', 'weight'] = [
		'article',
		'diameter',
		'length',
		'weight',
	]

	return arr.every((el) => {
		return keys.some((key) => el[key] !== null)
	})
}

export const ProductTable = ({ tableRows, dictionary }: IProps) => {
	return (
		<>
			{tableRows?.length > 0 && isNotSavedEmpty(tableRows) && (
				<TableContainer mb={{ base: '41px', lg: '121px' }}>
					<Table>
						<Thead bg="tableRow">
							<Tr>
								{!isTableEmpty(tableRows, 'article') && (
									<TableTh>{dictionary.tableHeaders.article}</TableTh>
								)}
								{!isTableEmpty(tableRows, 'diameter') && (
									<TableTh>{dictionary.tableHeaders.diameter}</TableTh>
								)}
								{!isTableEmpty(tableRows, 'length') && (
									<TableTh>{dictionary.tableHeaders.length}</TableTh>
								)}
								{!isTableEmpty(tableRows, 'weight') && (
									<TableTh>{dictionary.tableHeaders.weight}</TableTh>
								)}
							</Tr>
						</Thead>
						<Tbody>
							{tableRows.map((row, index) => {
								const { id, article, diameter, length, weight } = row

								return (
									<Tr key={id} bg={index % 2 !== 0 ? 'tableRow' : 'transparent'}>
										{article?.length > 0 && <TableTd>{article}</TableTd>}
										{diameter?.length > 0 && <TableTd>{diameter}</TableTd>}
										{length?.length > 0 && <TableTd>{length}</TableTd>}
										{weight?.length > 0 && <TableTd>{weight}</TableTd>}
									</Tr>
								)
							})}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</>
	)
}
