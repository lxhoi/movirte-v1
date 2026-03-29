/* ============================================
   Shopify Storefront API Types
   ============================================ */

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type SEO = {
  title: string | null;
  description: string | null;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image: Image | null;
  sku: string | null;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
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
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  compareAtPriceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  options: ProductOption[];
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  featuredImage: Image | null;
  seo: SEO;
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
    type: string;
  }> | null;
  createdAt: string;
  updatedAt: string;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  image: Image | null;
  seo: SEO;
  products: {
    edges: Array<{
      node: Product;
    }>;
    pageInfo: PageInfo;
    filters: CollectionFilter[];
  };
  updatedAt: string;
};

export type CollectionFilter = {
  id: string;
  label: string;
  type: string;
  values: Array<{
    id: string;
    label: string;
    count: number;
    input: string;
  }>;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
  endCursor: string | null;
};

/* ============================================
   Cart Types
   ============================================ */

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image | null;
    };
    price: Money;
    compareAtPrice: Money | null;
  };
  cost: {
    totalAmount: Money;
    amountPerQuantity: Money;
    compareAtAmountPerQuantity: Money | null;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
};

/* ============================================
   Customer Types
   ============================================ */

export type Customer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress: Address | null;
  addresses: {
    edges: Array<{
      node: Address;
    }>;
  };
  orders: {
    edges: Array<{
      node: Order;
    }>;
    pageInfo: PageInfo;
  };
  metafields: Array<{
    namespace: string;
    key: string;
    value: string;
    type: string;
  }> | null;
};

export type Address = {
  id: string;
  address1: string | null;
  address2: string | null;
  city: string | null;
  company: string | null;
  country: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  province: string | null;
  zip: string | null;
};

export type Order = {
  id: string;
  orderNumber: number;
  name: string;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: Money;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        variant: {
          image: Image | null;
          price: Money;
          title: string;
          product: {
            handle: string;
          };
        } | null;
      };
    }>;
  };
};

/* ============================================
   Page & Blog Types
   ============================================ */

export type ShopifyPage = {
  id: string;
  handle: string;
  title: string;
  body: string;
  bodySummary: string;
  seo: SEO;
};

export type Article = {
  id: string;
  handle: string;
  title: string;
  contentHtml: string;
  excerpt: string;
  publishedAt: string;
  image: Image | null;
  author: {
    name: string;
  };
  blog: {
    handle: string;
  };
  seo: SEO;
};

/* ============================================
   Search Types
   ============================================ */

export type PredictiveSearchResult = {
  products: Product[];
  collections: Collection[];
  pages: ShopifyPage[];
  queries: Array<{
    text: string;
    styledText: string;
  }>;
};

/* ============================================
   Helper Types
   ============================================ */

export type SortKey = 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED' | 'RELEVANCE';

export type ProductsQueryVariables = {
  first?: number;
  after?: string;
  sortKey?: SortKey;
  reverse?: boolean;
  query?: string;
};

export type CollectionProductsQueryVariables = {
  handle: string;
  first?: number;
  after?: string;
  sortKey?: SortKey;
  reverse?: boolean;
  filters?: Array<{
    productVendor?: string;
    productType?: string;
    variantOption?: {
      name: string;
      value: string;
    };
    price?: {
      min?: number;
      max?: number;
    };
    available?: boolean;
  }>;
};
