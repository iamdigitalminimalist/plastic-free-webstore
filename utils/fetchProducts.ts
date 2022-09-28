import { ProductType } from "../typings";

export const fetchProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getProducts`
  );
  const data = await res.json();
  const products: ProductType[] = data.products;

  return products;
};
