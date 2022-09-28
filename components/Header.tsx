import Image from "next/image";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

type HeaderProps = {};

export const Header = (props: HeaderProps) => {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);
  return (
    <header>
      <nav className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4">
        <div className="item-center flex justify-center md:w-1/5">
          <Link href="/">
            <div className="relative h-12 w-12 cursor-pointer opacity-75 transition hover:opacity-100">
              <Image
                src="/plastic-free-svg-logo.svg"
                alt="Apple Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>
        </div>
        <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
          <Link href="/products">
            <a className="headerLink">Products</a>
          </Link>
          <Link href="/explore">
            <a className="headerLink">Explore</a>
          </Link>
          <Link href="/support">
            <a className="headerLink">Support</a>
          </Link>
          <Link href="/business">
            <a className="headerLink">Business</a>
          </Link>
        </div>
        <div className="flex max-w-md items-center justify-center gap-x-3 md:w-1/5">
          <MagnifyingGlassIcon className="headerIcon" />
          <Link href="/checkout">
            <div className="relative cursor-pointer">
              {items.length > 0 ? (
                <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-xs text-white">
                  {items.length}
                </span>
              ) : null}
              <ShoppingBagIcon className="headerIcon" />
            </div>
          </Link>
          {session ? (
            <Image
              src={session.user?.image || ""}
              alt=""
              className="cursor-pointer rounded-full"
              width={34}
              height={34}
              onClick={() => signOut()}
            />
          ) : (
            <UserIcon className="headerIcon" onClick={() => signIn()} />
          )}
        </div>
      </nav>
    </header>
  );
};
