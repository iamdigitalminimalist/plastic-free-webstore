import Image from "next/image";
import { urlFor } from "../sanity";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type ProductProps = {
  product: Product;
};

export const Product = ({ product }: ProductProps) => {
  return (
    <article className="flex h-fit w-[320px] select-none flex-col space-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image
          src={urlFor(product.image[0]).url()}
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl text-white md:text-2xl">
          <p>{product.title}</p>
          <p>${product.price}</p>
        </div>

        <div className="flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-16 md:w-16">
          <ShoppingCartIcon className="h-8 w-8 text-white" />
        </div>
      </div>
    </article>
  );
};
