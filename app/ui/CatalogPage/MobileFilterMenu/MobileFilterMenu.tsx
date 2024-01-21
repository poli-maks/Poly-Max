'use client'

import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { ICategory } from '@/app/lib/interfaces'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'

import MenuArrowClosed from '../../svg/MenuArrowClosed'
import MenuArrowOpen from '../../svg/MenuArrowOpen'
import Category from '../CategoryList/Category/Category'
import MenuCategory from '../CategoryList/MenuCategory/MenuCategory'

interface IMobileFilterMenu {
	categories: ICategory[]
	dictionary: {
		all_category: string
		filter: string
	}
}

const MobileFilterMenu = ({ categories, dictionary }: IMobileFilterMenu) => {
	const { searchParams, createString, resetSearchParams } = useCategorySearchString()

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const [choosedCategory, choosedSubCategory] = useMemo(() => {
		const category = categories.find(
			({ attributes: category }) => category.uid.toString() === searchParams.get('category')
		)

		const subCategory = categories
			.map(({ attributes: category }) =>
				category.sub_categories.data.find(
					({ attributes: sub }) => sub.uid.toString() === searchParams.get('sub')
				)
			)
			.find((subCategory) => subCategory !== undefined)

		return [category, subCategory]
	}, [categories, searchParams])

	return (
		<Box display={{ base: 'block', lg: 'none' }}>
			<Menu isLazy onOpen={() => setIsMenuOpen(true)} onClose={() => setIsMenuOpen(false)}>
				<Flex justifyContent={'space-between'} mb={'15px'} alignItems={'center'}>
					<MenuButton
						as={Button}
						variant={'ghost'}
						p={0}
						fontSize={'20px'}
						alignItems={'center'}
						fontWeight={'600'}
						_hover={{ bgColor: 'transparent' }}
						_active={{ bgColor: 'transparent' }}
						rightIcon={!isMenuOpen ? <MenuArrowClosed /> : <MenuArrowOpen />}
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
					<MenuItem as={'li'} px={0} _hover={{ bgColor: 'transparent' }} bgColor="transparent">
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
									<MenuCategory
										category={category}
										subs={subs}
										key={category.uid}
										onClick={createString}
										variant="accordion"
									/>
								) : (
									<MenuItem
										as={'div'}
										px={0}
										_hover={{ bgColor: 'transparent' }}
										bgColor="transparent"
									>
										<Category category={category} onClick={createString} />
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
