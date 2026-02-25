/**
 * Shopify Storefront API types
 */

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice: MoneyV2 | null;
  selectedOptions: SelectedOption[];
  image: ShopifyImage | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: MoneyV2;
    maxVariantPrice: MoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: MoneyV2;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ProductVariant }>;
  };
  seo: {
    title: string | null;
    description: string | null;
  };
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  seo: {
    title: string | null;
    description: string | null;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: MoneyV2;
    image: ShopifyImage | null;
    product: {
      title: string;
      handle: string;
    };
  };
  attributes: Array<{ key: string; value: string }>;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
  };
  lines: {
    edges: Array<{ node: CartLine }>;
  };
}

export interface Page {
  id: string;
  handle: string;
  title: string;
  body: string;
  bodySummary: string;
  seo: {
    title: string | null;
    description: string | null;
  };
}

/** Helper: unwrap Shopify edges */
export function flattenEdges<T>(connection: { edges: Array<{ node: T }> }): T[] {
  return connection.edges.map((edge) => edge.node);
}
