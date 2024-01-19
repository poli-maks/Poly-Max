import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import { SEARCH_PARAMS } from '../interfaces'

const useCategorySearchString = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const createString = useCallback(
		(queries: { [key: string]: string | number }) => {
			const params = new URLSearchParams(searchParams.toString())

			params.forEach((value, key) => {
				if (key === SEARCH_PARAMS.SEARCH || key === SEARCH_PARAMS.QUERY) {
					params.delete(key)
				}
				key === SEARCH_PARAMS.PAGE && params.set('page', '1')
				key === SEARCH_PARAMS.TOTAL && params.set('total', value)
			})

			if (!queries.sub) {
				params.delete(SEARCH_PARAMS.SUB_CATEGORY)
			}

			const queriesEntries = Object.entries(queries).map(([key, value]) => `${key}=${value}`)

			queriesEntries.forEach((param) => {
				const [paramKey, paramValue] = param.split('=')
				params.set(paramKey, paramValue)
			})

			router.replace(pathname + '?' + params.toString())
		},
		[pathname, router, searchParams]
	)

	const resetSearchParams = useCallback(() => {
		const params = new URLSearchParams(searchParams.toString())

		params.forEach((_, key) => {
			if (key === SEARCH_PARAMS.PAGE) {
				return
			}
			params.delete(key)
		})
		router.replace(pathname + '?' + params.toString())
	}, [pathname, router, searchParams])

	return { searchParams, createString, resetSearchParams }
}

export default useCategorySearchString
