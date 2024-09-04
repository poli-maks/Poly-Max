'use client'

import {
	IDictionaryModal,
	IProductDictionary,
	IProductProps,
	TitleLevel,
	TitleSize,
} from '@/app/lib/interfaces'
import boxIcon from '@/public/img/boxIcon.svg'
import {
	Box,
	Button,
	Flex,
	Heading,
	ListItem,
	Text,
	UnorderedList,
	useDisclosure,
} from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

import ModalForm from '../../modalForm/ModalForm'
import ModalWindow from '../../ModalWindow/ModalWindow'
import { ProductTable } from '../productTable/ProductTable'

interface IProps {
	product: IProductProps[]
	dictionary: IProductDictionary
	dictionaryModal: IDictionaryModal
}

export const ProductContent = ({ product, dictionary, dictionaryModal }: IProps) => {
	const tableRows = product[0].attributes.tableRow
	const markdown = product[0].attributes.markDawn
	const title = product[0].attributes.title
	const description = product[0].attributes.descShort

	const titleSize: TitleSize = ['xl', 'lg', 'md', 'sm']
	const titleLevel: TitleLevel = ['h1', 'h2', 'h3', 'h4']

	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Flex flex="1" flexDirection="column" pl={{ base: 0, lg: '20px' }}>
				<Box>
					{title && (
						<Heading
							fontSize={{ base: '24px', lg: '40px' }}
							marginBottom={{ base: '20px', lg: '40px' }}
						>
							{title}
						</Heading>
					)}
					{description && (
						<Text fontSize={{ base: '12px', lg: '18px' }} mb={{ base: '30px', lg: '40px' }}>
							{description}
						</Text>
					)}
				</Box>
				<Box mb={{ base: '48px', lg: '120px' }}>
					<Button variant={'accentAlt'} mb="20px" onClick={onOpen}>
						{dictionary.btnOrder}
					</Button>
					<Flex display="flex" alignItems="center" gap="10px">
						<Image
							src={boxIcon}
							alt="delivery icon"
							width="24"
							height="24"
							style={{
								objectFit: 'cover',
								width: 24,
								height: 24,
								display: 'block',
							}}
						/>
						<Text fontSize={{ base: '12px', lg: '14px' }} maxW={{ lg: '371px' }}>
							{dictionary.announcement}
						</Text>
					</Flex>
				</Box>

				<ProductTable tableRows={tableRows} dictionary={dictionary} />

				<Box>
					{markdown?.length > 0 &&
						markdown.map((item, index) => {
							let text = ''

							if (item.type === 'heading' || item.type === 'paragraph') {
								text = item.children[0].text
							}

							return (
								<Box key={index}>
									{item.type === 'heading' && text.length > 0 && (
										<Heading
											as={titleLevel[item.level - 1]}
											size={titleSize[item.level - 1]}
											marginBottom={{ base: '30px', lg: '40px' }}
										>
											{text}
										</Heading>
									)}
									{item.type === 'paragraph' && text.length > 0 && (
										<Text marginBottom={{ base: '20px', lg: '30px' }}>{text}</Text>
									)}
									{item.type === 'list' && item.children.length > 0 && (
										<UnorderedList
											mt={{ base: '20px', lg: '30px' }}
											mb={{ base: '20px', lg: '30px' }}
											pl="20px"
										>
											{item.children.map((el, index) => (
												<ListItem key={index}>{el.children[0].text}</ListItem>
											))}
										</UnorderedList>
									)}
								</Box>
							)
						})}
				</Box>
				<Box>
					<Heading as="h3" size="md" marginBottom={{ base: '30px', lg: '40px' }}>
						{dictionary.delivery.title}
					</Heading>
					<Box
						dangerouslySetInnerHTML={{ __html: dictionary.delivery.body }}
						marginBottom={{ base: '20px', lg: '30px' }}
					/>
					<Heading as="h3" size="md" marginBottom={{ base: '30px', lg: '40px' }}>
						{dictionary.company.title}
					</Heading>
					<Box
						dangerouslySetInnerHTML={{ __html: dictionary.company.body }}
						marginBottom={{ base: '20px', lg: '30px' }}
					/>
					<Heading as="h3" size="md" marginBottom={{ base: '30px', lg: '40px' }}>
						{dictionary.contactUs.title}
					</Heading>
					<Box
						dangerouslySetInnerHTML={{ __html: dictionary.contactUs.body }}
						marginBottom={{ base: '20px', lg: '30px' }}
					/>
				</Box>
			</Flex>
			<ModalWindow isOpen={isOpen} onClose={onClose}>
				<ModalForm nameProduct={title} dictionaryModal={dictionaryModal} />
			</ModalWindow>
		</>
	)
}
