'use client'

import { Box, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import SectionWrapper from '../../sectionWrapper/SectionWrapper'
import CloseIcon from '../../svg/CloseIcon'

const Search = ({
	placeholder,
	isQuery,
	isSearch,
}: {
	placeholder: string
	isQuery: boolean
	isSearch: boolean
}) => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const ref = useRef<HTMLFormElement | null>(null)
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(isSearch)

	const handleSearch = useDebouncedCallback((e) => {
		const params = new URLSearchParams(searchParams)

		params.set('page', '1')

		if (e.target.value) {
			e.target.value.length > 0 && params.set('query', e.target.value)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params}`)
	}, 300)

	const clearSearch = () => {
		ref?.current?.reset()
		const params = new URLSearchParams(searchParams)
		params.delete('query')
		replace(`${pathname}?${params}`)
	}

	useEffect(() => {
		const closeSearch = () => {
			ref?.current?.reset()
			setIsSearchOpen(false)
			const params = new URLSearchParams(searchParams)
			params.delete('query')
			params.delete('search')
			replace(`${pathname}?${params}`)
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeSearch()
			}
		}

		document.addEventListener('click', handleClickOutside)

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [pathname, replace, searchParams])

	if (isSearchOpen)
		return (
			<AnimatePresence>
				<Box
					as={motion.div}
					initial={{
						y: -20,
						opacity: 0,
					}}
					animate={{ opacity: 1, y: 0 }}
					exit={{
						y: -20,
						opacity: 0,
					}}
					overflow={'hidden'}
					transition={'all easeOut 3000ms'}
					p={0}
					pos={'absolute'}
					top={'110px'}
					w={'100%'}
				>
					<Box>
						<SectionWrapper bg="base" py={{ base: '35px', lg: '40px', xl: '40px' }}>
							<InputGroup
								as={'form'}
								ref={ref}
								size="md"
								onSubmit={(e) => {
									e.preventDefault()
								}}
							>
								<Input
									p={0}
									pl={0}
									fontSize={'20px'}
									fontWeight={600}
									lineHeight={1}
									type="text"
									placeholder={placeholder}
									border={'none'}
									bgColor={'base'}
									onChange={handleSearch}
									color={'hText'}
									_placeholder={{ color: 'hText' }}
									_active={{ outlineColor: 'transparent' }}
									_focus={{
										outlineColor: 'transparent',
									}}
									_focusVisible={{
										borderColor: 'transparent',
										boxShadow: 'none',
									}}
								/>
								{isQuery && (
									<InputRightElement width="4.5rem">
										<IconButton
											isRound={true}
											variant="solid"
											colorScheme="ghost"
											aria-label="clear search"
											icon={<CloseIcon />}
											_hover={{ color: 'accent' }}
											onClick={clearSearch}
										/>
									</InputRightElement>
								)}
							</InputGroup>
						</SectionWrapper>
					</Box>
				</Box>
			</AnimatePresence>
		)
}

export default Search
