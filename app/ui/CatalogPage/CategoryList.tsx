'use client'

import { ICategory } from '@/app/lib/interfaces'
import { Box, Button, Flex, Select } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

interface ICategoryList {
	categories: ICategory[]
}

const CategoryList = ({ categories }: ICategoryList) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const createQueryString = useCallback(
		(name: string, value: number) => {
			const params = new URLSearchParams(searchParams.toString())
			params.set(name, value.toString())

			return params.toString()
		},
		[searchParams]
	)

	const choosedCategory = searchParams.get('category')

	return (
		<>
			<Flex as={'ul'} pos={'relative'} gap={'45px'}>
				{categories.map(({ attributes: category }) => {
					if (category.sub_categories.data.length !== 0) {
						return (
							<Select
								key={category.uid}
								placeholder={category.title}
								border={'none'}
								maxW={'max-content'}
							>
								{category.sub_categories.data.map(({ attributes: sub }) => (
									<option
										value={sub.title}
										style={{ fontFamily: '"Manrope", sans-serif' }}
										key={sub.uid}
									>
										{sub.title}
									</option>
								))}
							</Select>
						)
					}

					return (
						<Box as={'li'} key={category.uid}>
							<Button
								onClick={() =>
									router.push(pathname + '?' + createQueryString('category', category.uid))
								}
								variant={'ghost'}
							>
								{category.title}
							</Button>
							{choosedCategory && choosedCategory === category.uid.toString() && <div>Choosed</div>}
						</Box>
					)
				})}
				<Box pos={'absolute'} top={'120%'} left={0} bgColor={'#E0E0E0'} w={'100%'} h={'1px'}></Box>
			</Flex>
		</>
	)
}

export default CategoryList
