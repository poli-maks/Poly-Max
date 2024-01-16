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
			shadow={'dark-lg'}
			position={'relative'}
			borderRadius={'10px'}
			overflow="hidden"
			css={{
				'&:hover .product_card': {
					transform: 'scale(1.03)',
					transition: 'all 500ms, filter 500ms ease-in-out',
					filter: 'brightness(100%)',
				},
			}}
		>
			<Link href={`/${lang}/catalog/${attributes.uid}`}>
				<article>
					<Box
						borderRadius={'10px'}
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
							transition: 'all 500ms ease-in-out',
						}}
					>
						<Image
							src={attributes.img.data[0].attributes.url || '/img/productPlaceholder.jpg'}
							alt={attributes.title + '' + attributes.descShort || 'product image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
						/>
					</Box>
					<Box
						borderRadius={'10px'}
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
					>
						<Heading color={'#fff'} fontSize={'24'} mx={4}>
							{attributes?.title || ''}
						</Heading>

						{/* <Text color={'#fff'} fontSize={'14'} mx={4}>
							{product?.descShort || ''}
						</Text> */}

						{/* <Button
							variant={'solid'}
							bgColor={'#a28445'}
							color={'white'}
							transition={'all 0.3s'}
							_hover={{ bgColor: '#81672e' }}
							borderTopRadius={0}
							aria-label={product?.button || ''}
						>
							{product?.button || ''}
						</Button> */}
					</Box>
				</article>
			</Link>
		</Box>
	)
}

export default ProductItem
