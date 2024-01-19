'use client'

import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { ICategory, SEARCH_PARAMS } from '@/app/lib/interfaces'
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react'
import React from 'react'

import MenuArrowClosed from '../../svg/MenuArrowClosed'

interface IMobileFilterMenu {
	categories: ICategory[]
	dictionary: {
		all_category: string
		filter: string
	}
}

const MobileFilterMenu = ({ categories, dictionary }: IMobileFilterMenu) => {
	const { searchParams, createString, resetSearchParams } = useCategorySearchString()

	const choosedCategory = categories.find(
		({ attributes: category }) => category.uid.toString() === searchParams.get('category')
	)

	const choosedSubCategory = categories
		.map(({ attributes: category }) =>
			category.sub_categories.data.find(
				({ attributes: sub }) => sub.uid.toString() === searchParams.get('sub')
			)
		)
		.find((subCategory) => subCategory !== undefined)

	return (
		<Box display={{ base: 'block', lg: 'none' }}>
			<Menu isLazy>
				<Flex justifyContent={'space-between'} mb={'15px'} alignItems={'center'}>
					<MenuButton
						as={Button}
						variant={'ghost'}
						p={0}
						fontSize={'20px'}
						fontWeight={'600'}
						_hover={{ bgColor: 'transparent' }}
						_active={{ bgColor: 'transparent' }}
						rightIcon={<MenuArrowClosed />}
					>
						{dictionary.filter}
					</MenuButton>
					<Text fontSize={'16px'}>
						{choosedCategory?.attributes.title || 'Alle'}
						{choosedSubCategory && (
							<>
								<Text as={'span'} mx={'4px'}>
									|
								</Text>
								{choosedSubCategory.attributes.title}
							</>
						)}
					</Text>
				</Flex>
				<MenuList listStyleType={'none'} w={'100vw'} bgColor={'#FAFAFA'} fontWeight={'400'}>
					<MenuItem px={0} _hover={{ bgColor: 'transparent' }} bgColor="transparent">
						<Button
							variant={'ghost'}
							_hover={{ bgColor: 'transparent' }}
							onClick={() => resetSearchParams()}
						>
							{dictionary.all_category}
						</Button>
					</MenuItem>
					{categories.map(({ attributes: category }) => {
						const {
							sub_categories: { data: subs },
						} = category

						return (
							<Box as={'li'} position={'relative'} key={category.uid}>
								{subs.length !== 0 ? (
									<Accordion allowToggle key={category.uid} border={'1px transparent solid'}>
										<AccordionItem>
											<AccordionButton
												position={'relative'}
												as={Button}
												variant={'ghost'}
												alignItems={'center'}
												justifyContent={'start'}
												_hover={{ bgColor: 'transparent' }}
												rightIcon={<MenuArrowClosed />}
											>
												{category.title}
											</AccordionButton>
											<AccordionPanel
												py={0}
												_hover={{ bgColor: 'transparent' }}
												bgColor={'transparent'}
											>
												{subs.map(({ attributes: sub }) => (
													<MenuItem
														_hover={{ bgColor: 'transparent' }}
														bgColor={'transparent'}
														onClick={() => {
															createString({
																[SEARCH_PARAMS.CATEGORY]: category.uid,
																[SEARCH_PARAMS.SUB_CATEGORY]: sub.uid,
															})
														}}
														key={sub.uid}
													>
														{sub.title}
													</MenuItem>
												))}
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
								) : (
									<MenuItem px={0} _hover={{ bgColor: 'transparent' }} bgColor="transparent">
										<Button
											onClick={() => createString({ [SEARCH_PARAMS.CATEGORY]: category.uid })}
											variant={'ghost'}
											_hover={{ bgColor: 'transparent' }}
										>
											{category.title}
										</Button>
									</MenuItem>
								)}
							</Box>
						)
					})}
				</MenuList>
			</Menu>
		</Box>
	)
}

export default MobileFilterMenu
