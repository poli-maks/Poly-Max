import { GetServerSideProps } from 'next';
import { getProductByName, getProductByUid } from '@/app/lib/api/services';
import { IProduct } from '@/app/lib/interfaces';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  product: IProduct;
  lang: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  if (!product) return notFound();
  
  return (
    <div>
      {/* Render your product details */}
      <h1>{product.attributes.title}</h1>
      {/* Add more fields as needed */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { lang, id } = params as { lang: string; id: string };

  let product: IProduct | null = null;

  // Try fetching by slug (new URL)
  if (isNaN(Number(id))) {
    product = await getProductByName(lang, id);
  } else {
    // Try fetching by ID (old URL)
    const products = await getProductByUid(lang, Number(id));
    product = products ? products[0] : null; // Assume it returns an array, take the first item
  }

  if (!product) return { notFound: true };

  return {
    props: { product, lang },
  };
};

export default ProductPage;
