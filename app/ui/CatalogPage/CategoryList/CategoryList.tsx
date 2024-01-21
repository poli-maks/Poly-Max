'use client'

import useCategorySearchString from '@/app/lib/hooks/useCategorySearchString'
import { ICategory } from '@/app/lib/interfaces'
import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'

import Category from './Category/Category'
import MenuCategory from './MenuCategory/MenuCategory'

interface ICategoryList {
	categories: ICategory[]
	dictionary: string
}

const CategoryList = ({ categories, dictionary }: ICategoryList) => {
	const { searchParams, createString, resetSearchParams } = useCategorySearchString()
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
					<Button
						variant={'ghost'}
						onClick={() => resetSearchParams()}
						_hover={{ backgroundColor: 'transparent', opacity: 0.9 }}
					>
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
								<>
									<MenuCategory
										variant="menu"
										category={category}
										subs={subs}
										onClick={createString}
										choosedCategory={choosedCategory}
									/>
								</>
							) : (
								<>
									<Category
										onClick={createString}
										category={category}
										choosedCategory={choosedCategory}
									/>
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
