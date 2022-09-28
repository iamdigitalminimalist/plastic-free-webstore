interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface ImageType {
  _key: string;
  _type: "image";
  asset: {
    url: string;
  };
}

interface CategoryType extends SanityBody {
  _type: "category";
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}

interface ProductType extends SanityBody {
  _type: "product";
  title: string;
  price: number;
  slug: {
    _type: "slug";
    current: string;
  };
  description: string;
  category: {
    _type: "reference";
    _ref: string;
  };
  image: ImageType[];
}

export interface StripeProduct {
  id: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  object: string;
  quantity: number;
  price: {
    unit_amount: number;
  };
}
