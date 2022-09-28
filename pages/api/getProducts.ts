import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";
import { ProductType } from "../../typings";

type Data = {
  products: ProductType[];
};

const query = groq`*[_type == "product"] {
  _id,
  ...
} | order(_createdAt asc)`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products: ProductType[] = await sanityClient.fetch(query);
  res.status(200).json({ products });
}
