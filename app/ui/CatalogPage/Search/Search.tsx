'use client'

import {
	Drawer,
	DrawerBody,
	DrawerContent,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useRef } from 'react'
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

	const closeSearch = () => {
		ref?.current?.reset()
		const params = new URLSearchParams(searchParams)
		params.delete('query')
		params.delete('search')
		replace(`${pathname}?${params}`)
	}

	const searchAnimation = {
		hidden: {
			y: -20,
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				delay: 0.2,
				ease: 'easeOut',
				duration: 0.3,
			},
		},
	}

	return (
		<Drawer placement={'top'} onClose={() => {}} isOpen={isSearch} onOverlayClick={closeSearch}>
			<DrawerContent style={{ top: '110px', backgroundColor: 'transparent' }} boxShadow={'none'}>
				<DrawerBody
					as={motion.div}
					initial="hidden"
					whileInView="visible"
					viewport={{ amount: 0.3, once: true }}
					variants={searchAnimation}
					p={0}
				>
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
								fontSize={'20px'}
								fontWeight={600}
								lineHeight={1}
								type="text"
								placeholder={placeholder}
								pl={8}
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
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export default Search
