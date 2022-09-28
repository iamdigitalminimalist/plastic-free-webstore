import Link from "next/link";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

type BasketProps = {};

export const Basket = (props: BasketProps) => {
  const items = useSelector(selectBasketItems);

  return (
    <Link href="/Users/ordruker/IdeaProjects/e-commerce/pages/checkout">
      <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
        {items.length > 0 ? (
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-sm text-white">
            {items.length}
          </span>
        ) : null}
        <ShoppingCartIcon className="headerIcon h-8 w-8" />
      </div>
    </Link>
  );
};
