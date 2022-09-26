interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Category extends SanityBody {
  _type: "category";
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
}
