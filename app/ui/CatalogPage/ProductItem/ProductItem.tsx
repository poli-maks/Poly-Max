'use client'

import { IProduct } from '@/app/lib/interfaces'
import { Box, Heading, useMediaQuery } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

const ProductItem = ({ product: { attributes }, lang }: { product: IProduct; lang: string }) => {
	const [isModileScreen] = useMediaQuery('(max-width: 1024px)')

	return (
		<Box
			as={'li'}
			key={attributes.uid}
			position={'relative'}
			overflow="hidden"
			css={
				{
					// '&:hover .product_card': {
					// 	transform: 'scale(1.03)',
					// 	transition: 'all 500ms, filter 500ms ease-in-out',
					// 	filter: 'brightness(100%)',
					// },
				}
			}
		>
			<Link href={`/${lang}/catalog/${attributes.uid}`}>
				<article>
					<Box
						className="product_card"
						filter={isModileScreen ? 'brightness(100%)' : 'brightness(80%)'}
						position="relative"
						z-index="2"
						width="100%"
						height="360px"
						transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
						bgRepeat={'no-repeat'}
						bgPos={'center'}
						bgSize={'cover'}
						_hover={{
							cursor: 'pointer',
						}}
					>
						<Box
							bg="linear-gradient(0deg,rgba(0, 0, 0, 0.7) 15%, rgba(252, 176, 69, 0) 50%)"
							position={'absolute'}
							top="0"
							zIndex={'2'}
							width={'100%'}
							height={'100%'}
							display={'flex'}
							justifyContent={'flex-end'}
							flexDir={'column'}
							pt={'16px'}
							gap={4}
						></Box>
						<Image
							src={
								(attributes.img.data && attributes.img?.data[0].attributes.url) ||
								'/img/productPlaceholder.jpg'
							}
							alt={attributes.title + '' + attributes.descShort || 'product image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
						/>
					</Box>

					<Heading
						color={'#000'}
						fontFamily={'inherit'}
						fontSize={'14'}
						mt={'10px'}
						fontWeight={'500'}
					>
						{attributes?.title || ''}
					</Heading>
				</article>
			</Link>
		</Box>
	)
}

export default ProductItem
