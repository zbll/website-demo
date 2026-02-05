export type ProductItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: ProductItem;
  count: number;
};

export type ShopCategory = {
  id: string;
  label: string;
};

export type ShopSection = {
  categoryId: string;
  items: ProductItem[];
};

export type ProductSection = {
  categoryId: string;
  categoryLabel: string;
  items: ProductItem[];
};
