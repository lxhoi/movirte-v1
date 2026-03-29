const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    createdAt
    updatedAt
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    options {
      id
      name
      values
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          quantityAvailable
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
          image { url altText width height }
          sku
        }
      }
    }
    images(first: 20) {
      edges {
        node { url altText width height }
      }
    }
    featuredImage { url altText width height }
    seo { title description }
  }
`;

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFragment on Product {
    id
    handle
    title
    vendor
    availableForSale
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    options {
      name
      values
    }
    images(first: 2) {
      edges {
        node { url altText width height }
      }
    }
    featuredImage { url altText width height }
    variants(first: 50) {
      edges {
        node {
          id
          availableForSale
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
`;

export const GET_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int = 20, $after: String, $sortKey: ProductSortKeys = RELEVANCE, $reverse: Boolean = false, $query: String) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges {
        node {
          ...ProductCardFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...ProductCardFragment
    }
  }
`;

export const SEARCH_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query SearchProducts($query: String!, $first: Int = 20) {
    search(query: $query, first: $first, types: [PRODUCT]) {
      edges {
        node {
          ... on Product {
            ...ProductCardFragment
          }
        }
      }
      totalCount
    }
  }
`;
