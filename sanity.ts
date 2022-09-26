import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

type configType = {
  dataset: string;
  projectId: string;
  apiVersion: string;
  useCdn: boolean;
};

export const config: configType = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  apiVersion: "2022-09-26",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
