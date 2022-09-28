import { CategoryType } from "../typings";

export const fetchCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`
  );
  const data = await res.json();
  const categories: CategoryType[] = data.categories;

  return categories;
};
