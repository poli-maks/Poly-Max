'use client'

import { Button, Center } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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

	useEffect(() => {
		if (total && hasProducts) {
			params.set('total', total)
			replace(`${pathname}?${params}`)
		}
		const loadedPage = localStorage.getItem('page')
		if (loadedPage === page) {
			params.set('page', '1')
			replace(`${pathname}?${params}`)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total])

	const hasNext = limit * (parseInt(page) - 1) + limit < parseInt(total)

	const handleChangePage = () => {
		params.set('page', (parseInt(page) + 1).toString())

		replace(`${pathname}?${params}`)
	}

	return (
		hasProducts && (
			<Center mt={'60px'}>
				<Button
					variant="arrow"
					type="button"
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
