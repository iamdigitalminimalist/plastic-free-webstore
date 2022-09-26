import React from "react";
import Image from "next/image";
import { Button } from "./Button";

type HeroProps = {};

export const Hero: React.FC = (props: HeroProps) => {
  return (
    <section className="sticky top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-between px-8">
      <div className="space-y-8">
        <h1 className="text-5xl font-semibold lg:text-6xl xl:space-y-3 xl:text-7xl">
          <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Powered
          </span>
          <span className="block">By Intellect</span>
          <span className="block">Driven by Values</span>
        </h1>

        <div className="space-x-8">
          <Button title="Buy Now" />
          <a className="link">Learn More</a>
        </div>
      </div>
      <div className="relative hidden h-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1601546101063-0e0b2e0d11f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          alt=""
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};
