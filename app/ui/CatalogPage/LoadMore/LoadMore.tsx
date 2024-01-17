'use client'

import { Button, Center } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Arrow from '../../svg/Arrow'

const LoadMore = ({
	children,
	total,
	hasProducts,
}: {
	children: React.ReactNode
	total: string
	hasProducts: boolean
}) => {
	const searchParams = useSearchParams()
	const { replace } = useRouter()
	const pathname = usePathname()
	const page = searchParams.get('page') || '1'
	const limit = 8

	const params = new URLSearchParams(searchParams)

	const hasNext = limit * (parseInt(page) - 1) + limit < parseInt(total)

	const handleChangePage = () => {
		params.set('page', (parseInt(page) + 1).toString())

		replace(`${pathname}?${params}`)
	}

	return (
		hasProducts && (
			<Center>
				<Button
					variant="arrow"
					onClick={handleChangePage}
					rightIcon={<Arrow />}
					isDisabled={!hasNext}
				>
					{children}
				</Button>
			</Center>
		)
	)
}

export default LoadMore
