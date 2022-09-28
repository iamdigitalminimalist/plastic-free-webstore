import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Tabs } from "../components/Tabs";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import { Basket } from "./Basket";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { CategoryType, ProductType } from "../typings";

type HomePageProps = {
  categories: CategoryType[];
  products: ProductType[];
  session: Session;
};

const Home = ({ categories, products }: HomePageProps) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Basket />

      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Hero />
      </main>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="space-y-10 py-16">
          <h2 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h2>
          <Tabs categories={categories} products={products} />
        </div>
      </section>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  const session = await getSession(context);
  return {
    props: {
      categories,
      products,
      session,
    },
  };
};
