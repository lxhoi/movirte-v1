export const GET_COLLECTIONS = `
  query GetCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image { url altText width height }
          seo { title description }
          updatedAt
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle(
    $handle: String!
    $first: Int = 20
    $after: String
    $sortKey: ProductCollectionSortKeys = COLLECTION_DEFAULT
    $reverse: Boolean = false
    $filters: [ProductFilter!]
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      image { url altText width height }
      seo { title description }
      updatedAt
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        edges {
          node {
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
            options { name values }
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
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
      }
    }
  }
`;
