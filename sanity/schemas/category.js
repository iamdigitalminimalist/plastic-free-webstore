import { MdOutlineCategory } from "react-icons/all";

export default {
  name: "category",
  title: "Category",
  type: "document",
  icon: MdOutlineCategory,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
