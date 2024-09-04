import { IProduct } from '@/app/lib/interfaces';
import { Box, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const ProductItem = ({ product: { attributes }, lang }: { product: IProduct; lang: string }) => {
	return (
		<Box
			as={'li'}
			key={attributes.uid}
			position={'relative'}
			css={{
				'&:hover .product_card': {
					transform: 'scale(1.05)',
					transition: 'all 300ms ease-in-out',
				},
			}}
		>
			<Link href={`/${lang}/catalog/${attributes.uid}`}>
				<article>
					<Box
						position="relative"
						z-index="2"
						width="100%"
						height="300px"
						overflow={'hidden'}
						_hover={{
							cursor: 'pointer',
						}}
						backgroundImage={
							attributes.img.data
								? `url('${
										attributes.img && attributes.img?.data[0].attributes.formats?.thumbnail.url
									}')`
								: '/img/blurPlaceholder.png'
						}
						backgroundPosition={'center'}
						backgroundRepeat={'no-repeat'}
						backgroundSize={'cover'}
					>
						<Image
							className="product_card"
							src={
								(attributes.img.data && attributes.img?.data[0].attributes.url) ||
								'/img/productPlaceholder.jpg'
							}
							alt={attributes.title + '' + attributes.descShort || 'product image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 33vw"
							style={{ objectFit: 'cover', transition: 'all 300ms ease-in-out' }}
							placeholder="blur"
							blurDataURL="/img/blurPlaceholder.png"
							loading="lazy"
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
	);
};

export default ProductItem;
