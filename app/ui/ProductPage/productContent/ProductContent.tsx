'use client'

import { IProductProps, TitleLevel, TitleSize } from '@/app/lib/interfaces'
import { Box, Button, Flex, Heading, List, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import React from 'react'

import BoxIcon from '../../svg/Box'
import { ProductTable } from '../productTable/ProductTable'

export const ProductContent = ({ product }: { product: IProductProps[] }) => {
	const tableRows = product[0].attributes.tableRow
	const markdown = product[0].attributes.markDawn
	const title = product[0].attributes.title
	const description = product[0].attributes.descShort

	const titleSize: TitleSize = ['xl', 'lg', 'md', 'sm']
	const titleLevel: TitleLevel = ['h1', 'h2', 'h3', 'h4']

	return (
		<Flex flex="1" flexDirection="column" pl={{ base: 0, lg: '20px' }}>
			<Box>
				{title && (
					<Heading size="lg" marginBottom="40px">
						{title}
					</Heading>
				)}
				{description && <Text mb="40px">{description}</Text>}
			</Box>
			<Box>
				<Button variant={'accentAlt'} mb="20px">
					Eine Bestellung aufgeben
				</Button>
				<List display="flex" alignItems="center" gap="10px">
					<ListItem>
						<BoxIcon />
					</ListItem>
					<ListItem>
						Um für unsere Kunden bequemer zu machen, liefern wir zu DDP-Lieferbedingungen.
					</ListItem>
				</List>
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
								{item.type === 'heading' && text.length > 0 && (
									<Heading
										as={titleLevel[item.level - 1]}
										size={titleSize[item.level - 1]}
										marginBottom="40px"
									>
										{text}
									</Heading>
								)}
								{item.type === 'paragraph' && text.length > 0 && (
									<Text marginBottom="30px">{text}</Text>
								)}
								{item.type === 'list' && item.children.length > 0 && (
									<UnorderedList mt="20px" mb="20px" pl="20px" listStyleImage="">
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
