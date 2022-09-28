import Image from "next/image";
import { urlFor } from "../sanity";
import { PlusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToBasket } from "../redux/basketSlice";
import { ProductType } from "../typings";
import toast from "react-hot-toast";

type ProductProps = {
  product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };
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

        <div
          className="relative flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-16 md:w-16"
          onClick={addItemToBasket}
        >
          <ShoppingCartIcon className="absolute h-8 w-8 text-white hover:opacity-0" />
          <PlusIcon className="absolute h-10 w-10 rounded-full from-pink-500 to-violet-500 text-white opacity-0 hover:bg-gradient-to-r hover:opacity-100" />
        </div>
      </div>
    </article>
  );
};
