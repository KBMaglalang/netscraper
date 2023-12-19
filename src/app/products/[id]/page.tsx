import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

// components
import {
  ProductNotificationInput,
  ProductNotificationToggle,
  ProductStatsInfo,
  DeleteProductButton,
  ProductPinned,
} from '@/components/Common';

// context

// constants and functions
import { Product } from '@/types';
import { getProductById } from '@/lib/actions';

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  // get product by id
  const product: Product = await getProductById(id);

  // return to homepage if product is not found
  if (!product) redirect('/');

  return (
    <div className="container mx-auto my-4 px-4">
      <div className="flex flex-col gap-28 ">
        {/* product title page */}
        <div className="flex w-full flex-row">
          <h2 className="text-[28px] font-semibold">{product.title}</h2>
        </div>

        {/* product image and information */}
        <div className="flex h-[50vh] w-full flex-col gap-4 md:flex-row">
          <div className=" flex h-full items-center md:w-1/2">
            <Image
              src={product.image}
              alt={product.title}
              width={580}
              height={400}
              className="mx-auto max-h-[50vh] object-contain"
            />
          </div>

          <div className="flex flex-col space-y-4 py-4 md:w-1/2 md:py-0">
            <div className="flex flex-wrap items-start gap-5">
              <div className="flex w-full flex-row space-x-2">
                <ProductPinned id={id} pinned={product.pinned} />

                <Link
                  data-test="product-visit-button"
                  href={product.url}
                  target="_blank"
                  className="btn btn-primary flex-1"
                >
                  Visit Product
                </Link>

                <DeleteProductButton id={id} />
              </div>

              {/* product data */}
              <ProductStatsInfo product={product} />

              {/* user inputs */}
              <div className="flex w-full flex-col gap-3">
                {/* product watch controls */}
                <div className="flex w-full flex-row gap-3">
                  <ProductNotificationToggle id={id} state={product.notificationEnabled} />
                  <ProductNotificationInput id={id} value={product.notificationPrice} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* graph */}
        {/* <div className="flex min-h-screen items-center justify-center rounded-xl bg-slate-50 shadow-lg">
          graph data
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
