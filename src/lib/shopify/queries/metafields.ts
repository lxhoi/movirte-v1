export const GET_METAFIELDS = `
  query GetMetafields($namespace: String!, $keys: [String!]!) {
    shop {
      metafields(identifiers: [{ namespace: $namespace, key: $keys }]) {
        namespace
        key
        value
        type
      }
    }
  }
`;

export const GET_PAGE_BY_HANDLE = `
  query GetPageByHandle($handle: String!) {
    page(handle: $handle) {
      id
      handle
      title
      body
      bodySummary
      seo { title description }
    }
  }
`;

export const GET_BLOG_ARTICLES = `
  query GetBlogArticles($blogHandle: String!, $first: Int = 20, $after: String) {
    blog(handle: $blogHandle) {
      title
      articles(first: $first, after: $after, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            contentHtml
            excerpt
            publishedAt
            image { url altText width height }
            author { name }
            blog { handle }
            seo { title description }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_HANDLE = `
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        handle
        title
        contentHtml
        excerpt
        publishedAt
        image { url altText width height }
        author { name }
        seo { title description }
      }
    }
  }
`;
