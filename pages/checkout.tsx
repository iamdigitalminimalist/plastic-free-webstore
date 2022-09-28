import Head from "next/head";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { CheckoutProduct } from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Stripe from "stripe";
import { fetchPostJSON } from "../utils/api-helpers";
import getStripe from "../utils/get-stripejs";
import { Product } from "../typings";

export const Checkout = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: Product[] }
  );
  const [loading, setLoading] = useState(false);

  // Grouping the items into one array
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: Product[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);
    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      "/api/checkout_session",
      {
        items: items,
      }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }
    // Redirect to check out
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#E7ECEE]">
      <Head>
        <title>Bag - Checkout Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          <h2 className="my-4 text-3xl font-semibold lg:text-4xl">
            {items.length > 0 ? "Review your bag" : "Your bag is empty"}
          </h2>
          <p className="my-4">Free delivery and returns</p>

          {items.length === 0 ? (
            <Button
              title="Continue Shopping"
              onClick={() => router.push("/")}
            />
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <CheckoutProduct key={key} items={items} id={key} />
            ))}
            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="CAD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-4 font-semibold">
                  <h4>Total</h4>
                  <span>
                    <Currency quantity={basketTotal} currency="CAD" />
                  </span>
                </div>
              </div>

              {/* Proceed to checkout*/}
              <div className="my-14 space-y-4">
                <div className="flex flex-1 flex-col items-center space-y-4 rounded-xl bg-gray-200 p-8 py-12">
                  <h4 className="mb-4 flex flex-col text-xl font-semibold">
                    Proceed to Checkout
                  </h4>
                  <Button
                    noIcon
                    loading={loading}
                    title="Check Out"
                    width="w-2/3"
                    onClick={createCheckoutSession}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default Checkout;
