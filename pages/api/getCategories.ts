import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { groq } from "next-sanity";
import { CategoryType } from "../../typings";

type Data = {
  categories: CategoryType[];
};

const query = groq`*[_type == "category"] {
_id,
...
}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories: CategoryType[] = await sanityClient.fetch(query);
  res.status(200).json({ categories });
}
