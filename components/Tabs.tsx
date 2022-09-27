import { Tab } from "@headlessui/react";
import { Product } from "./Product";

type TabsProps = {
  categories: Category[];
  products: Product[];
};

export const Tabs = ({ categories, products }: TabsProps) => {
  const showProducts = (category: number) =>
    products
      .filter(
        (product: Product) => product.category._ref === categories[category]._id
      )
      .map((product: Product) => (
        <Product key={product._id} product={product} />
      ));
  return (
    <Tab.Group>
      <Tab.List className="mx-auto flex justify-center overflow-x-scroll">
        {categories.map((category) => (
          <Tab
            key={category._id}
            id={category._id}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? "borderGradient bg-[#35383C] text-white"
                  : "border-b-2 border-[#35383C] text-[#747474]"
              }`
            }
          >
            {category.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
        <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(4)}</Tab.Panel>
        <Tab.Panel className="tabPanel">{showProducts(5)}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};
