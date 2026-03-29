import { storefrontQuery } from './storefront';
import {
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS,
  GET_PRODUCT_RECOMMENDATIONS,
  SEARCH_PRODUCTS,
} from './queries/products';
import {
  GET_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
} from './queries/collections';
import {
  CREATE_CART,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_LINES,
  REMOVE_FROM_CART,
} from './queries/cart';
import {
  GET_PAGE_BY_HANDLE,
  GET_BLOG_ARTICLES,
  GET_ARTICLE_BY_HANDLE,
} from './queries/metafields';
import type {
  Product,
  Collection,
  Cart,
  ShopifyPage,
  Article,
  SortKey,
} from './types';

/* ============================================
   Products
   ============================================ */

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await storefrontQuery<{ product: Product | null }>(
    GET_PRODUCT_BY_HANDLE,
    { handle },
    'force-cache',
    3600
  );
  return data.product;
}

export async function getProducts(options: {
  first?: number;
  after?: string;
  sortKey?: SortKey;
  reverse?: boolean;
  query?: string;
} = {}): Promise<{ products: Product[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }> {
  const data = await storefrontQuery<{
    products: {
      edges: Array<{ node: Product }>;
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(GET_PRODUCTS, {
    first: options.first || 20,
    after: options.after,
    sortKey: options.sortKey || 'RELEVANCE',
    reverse: options.reverse || false,
    query: options.query,
  }, 'force-cache', 60);

  return {
    products: data.products.edges.map((edge) => edge.node),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const data = await storefrontQuery<{ productRecommendations: Product[] }>(
    GET_PRODUCT_RECOMMENDATIONS,
    { productId },
    'force-cache',
    3600
  );
  return data.productRecommendations || [];
}

export async function searchProducts(query: string, first = 20) {
  const data = await storefrontQuery<{
    search: {
      edges: Array<{ node: Product }>;
      totalCount: number;
    };
  }>(SEARCH_PRODUCTS, { query, first }, 'no-store');

  return {
    products: data.search.edges.map((edge) => edge.node),
    totalCount: data.search.totalCount,
  };
}

/* ============================================
   Collections
   ============================================ */

export async function getCollections(first = 20): Promise<Collection[]> {
  const data = await storefrontQuery<{
    collections: { edges: Array<{ node: Collection }> };
  }>(GET_COLLECTIONS, { first }, 'force-cache', 3600);

  return data.collections.edges.map((edge) => edge.node);
}

export async function getCollectionByHandle(
  handle: string,
  options: {
    first?: number;
    after?: string;
    sortKey?: string;
    reverse?: boolean;
    filters?: unknown[];
  } = {}
): Promise<Collection | null> {
  const data = await storefrontQuery<{ collection: Collection | null }>(
    GET_COLLECTION_BY_HANDLE,
    {
      handle,
      first: options.first || 20,
      after: options.after,
      sortKey: options.sortKey || 'COLLECTION_DEFAULT',
      reverse: options.reverse || false,
      filters: options.filters,
    },
    'force-cache',
    60
  );
  return data.collection;
}

/* ============================================
   Cart
   ============================================ */

export async function createCart(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart> {
  const data = await storefrontQuery<{
    cartCreate: { cart: Cart; userErrors: Array<{ field: string; message: string }> };
  }>(CREATE_CART, { lines }, 'no-store');

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(', '));
  }
  return data.cartCreate.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await storefrontQuery<{ cart: Cart | null }>(
    GET_CART,
    { cartId },
    'no-store'
  );
  return data.cart;
}

export async function addToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<Cart> {
  const data = await storefrontQuery<{
    cartLinesAdd: { cart: Cart; userErrors: Array<{ field: string; message: string }> };
  }>(ADD_TO_CART, { cartId, lines }, 'no-store');

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join(', '));
  }
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<Cart> {
  const data = await storefrontQuery<{
    cartLinesUpdate: { cart: Cart; userErrors: Array<{ field: string; message: string }> };
  }>(UPDATE_CART_LINES, { cartId, lines }, 'no-store');

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join(', '));
  }
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart> {
  const data = await storefrontQuery<{
    cartLinesRemove: { cart: Cart; userErrors: Array<{ field: string; message: string }> };
  }>(REMOVE_FROM_CART, { cartId, lineIds }, 'no-store');

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join(', '));
  }
  return data.cartLinesRemove.cart;
}

/* ============================================
   Pages & Blog
   ============================================ */

export async function getPageByHandle(handle: string): Promise<ShopifyPage | null> {
  const data = await storefrontQuery<{ page: ShopifyPage | null }>(
    GET_PAGE_BY_HANDLE,
    { handle },
    'force-cache',
    3600
  );
  return data.page;
}

export async function getBlogArticles(blogHandle: string, first = 20) {
  const data = await storefrontQuery<{
    blog: {
      title: string;
      articles: {
        edges: Array<{ node: Article }>;
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    };
  }>(GET_BLOG_ARTICLES, { blogHandle, first }, 'force-cache', 300);

  return {
    title: data.blog.title,
    articles: data.blog.articles.edges.map((edge) => edge.node),
    pageInfo: data.blog.articles.pageInfo,
  };
}

export async function getArticleByHandle(blogHandle: string, articleHandle: string) {
  const data = await storefrontQuery<{
    blog: { articleByHandle: Article | null };
  }>(GET_ARTICLE_BY_HANDLE, { blogHandle, articleHandle }, 'force-cache', 300);
  return data.blog?.articleByHandle || null;
}
