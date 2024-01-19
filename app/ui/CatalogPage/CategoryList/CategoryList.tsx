'use client'

import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { ICategory, SEARCH_PARAMS } from '@/app/lib/interfaces'
import { Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'

import MenuArrowClosed from '../../svg/MenuArrowClosed'
import MenuArrowOpen from '../../svg/MenuArrowOpen'

interface ICategoryList {
	categories: ICategory[]
	dictionary: string
}

const CategoryList = ({ categories, dictionary }: ICategoryList) => {
	const { searchParams, createString, resetSearchParams } = useCategorySearchString()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const choosedCategory = searchParams.get('category')

	return (
		<>
			<Flex
				as={'ul'}
				display={{ base: 'none', lg: 'flex' }}
				gap={'45px'}
				borderBottom={'1px #E0E0E0 solid'}
				mb={'20px'}
			>
				<Box as={'li'} position={'relative'} pb={'20px'}>
					<Button variant={'ghost'} onClick={() => resetSearchParams()}>
						{dictionary}
					</Button>
					{!choosedCategory && (
						<Box
							position={'absolute'}
							top={'100%'}
							left={0}
							w={'100%'}
							h={'3px'}
							bgColor={'#000'}
						></Box>
					)}
				</Box>
				{categories.map(({ attributes: category }) => {
					const {
						sub_categories: { data: subs },
					} = category

					return (
						<Box as={'li'} position={'relative'} pb={'20px'} key={category.uid}>
							{subs.length !== 0 ? (
								<Menu
									key={category.uid}
									onOpen={() => setIsMenuOpen(true)}
									onClose={() => setIsMenuOpen(false)}
								>
									<MenuButton
										position={'relative'}
										as={Button}
										variant={'ghost'}
										alignItems={'center'}
										rightIcon={!isMenuOpen ? <MenuArrowClosed /> : <MenuArrowOpen />}
									>
										{category.title}
									</MenuButton>
									{choosedCategory && choosedCategory === category.uid.toString() && (
										<Box
											position={'absolute'}
											top={'100%'}
											left={0}
											w={'100%'}
											h={'3px'}
											bgColor={'#000'}
										></Box>
									)}
									<MenuList>
										{subs.map(({ attributes: sub }) => (
											<MenuItem
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
									</MenuList>
								</Menu>
							) : (
								<>
									<Button
										onClick={() => createString({ [SEARCH_PARAMS.CATEGORY]: category.uid })}
										variant={'ghost'}
									>
										{category.title}
									</Button>
									{choosedCategory && choosedCategory === category.uid.toString() && (
										<Box
											position={'absolute'}
											top={'100%'}
											left={0}
											w={'100%'}
											h={'3px'}
											bgColor={'#000'}
										></Box>
									)}
								</>
							)}
						</Box>
					)
				})}
			</Flex>
		</>
	)
}

export default CategoryList
