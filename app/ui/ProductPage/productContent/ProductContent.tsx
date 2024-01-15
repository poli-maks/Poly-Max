'use client'

import { IProductProps } from '@/app/lib/interfaces'
import { Box, Flex, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import React from 'react'

import { ProductTable } from '../productTable/ProductTable'

export const ProductContent = ({ product }: { product: IProductProps[] }) => {
	const tableRows = product[0].attributes.tableRow
	const markdown = product[0].attributes.markDawn
	const title = product[0].attributes.title
	const description = product[0].attributes.descShort

	return (
		<Flex flexDirection="column">
			<Box>
				{title && <Heading as="h1">{title}</Heading>}
				{description && <Text>{description}</Text>}
			</Box>
			<Box>
				<ProductTable tableRows={tableRows} />
			</Box>
			<Box>
				{markdown?.length > 0 &&
					markdown.map((item) => {
						let text = ''

						if (item.type === 'heading' || item.type === 'paragraph') {
							text = item.children[0].text
						}

						return (
							<Box key={nanoid()}>
								{item.type === 'heading' && text.length > 0 && <Heading>{text}</Heading>}
								{item.type === 'paragraph' && text.length > 0 && <Text>{text}</Text>}
								{item.type === 'list' && item.children.length > 0 && (
									<UnorderedList mt="20px" mb="20px" listStyleImage="">
										{item.children.map((el) => (
											<ListItem key={nanoid()}>{el.children[0].text}</ListItem>
										))}
									</UnorderedList>
								)}
							</Box>
						)
					})}
			</Box>
		</Flex>
	)
}
