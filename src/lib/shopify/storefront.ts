const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2025-01';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
};

export async function storefrontQuery<T>(
  query: string,
  variables: Record<string, unknown> = {},
  cache: RequestCache = 'force-cache',
  revalidate?: number
): Promise<T> {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  };

  if (revalidate !== undefined) {
    (fetchOptions as any).next = { revalidate };
  } else {
    fetchOptions.cache = cache;
  }

  try {
    const response = await fetch(endpoint, fetchOptions);

    if (!response.ok) {
      throw new Error(
        `Shopify Storefront API error: ${response.status} ${response.statusText}`
      );
    }

    const json: ShopifyResponse<T> = await response.json();

    if (json.errors) {
      const messages = json.errors.map((e) => e.message).join(', ');
      console.error('Shopify GraphQL Errors:', json.errors);
      throw new Error(`Shopify GraphQL error: ${messages}`);
    }

    return json.data;
  } catch (error) {
    console.error('Storefront API request failed:', error);
    throw error;
  }
}
