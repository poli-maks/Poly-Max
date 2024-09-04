import { notFound } from 'next/navigation';
import { getProductByUid, getProductByName } from '@/app/lib/api/services'; // Ensure paths are correct
import { IParams } from '@/app/lib/interfaces';

interface ProductPageProps {
  params: IParams['params'];
}

// Server component
export default async function ProductPage({ params }: ProductPageProps) {
  const { lang, id } = params;

  let product = null;

  // Check if `id` is a number, then fetch by UID; otherwise, fetch by name (slug)
  if (id) {
    if (isNaN(Number(id))) {
      product = await getProductByName(lang, id);
    } else {
      product = await getProductByUid(lang, Number(id));
    }
  }

  if (!product) {
    return notFound();
  }

  return (
    // Replace with your actual component rendering logic
    <div>
      <h1>{product.title}</h1>
      {/* Render other product details */}
    </div>
  );
}
