const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const apiVersion = process.env.SHOPIFY_API_VERSION || '2025-01';

const endpoint = `https://${domain}/admin/api/${apiVersion}/graphql.json`;

type ShopifyAdminResponse<T> = {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
  extensions?: {
    cost: {
      requestedQueryCost: number;
      actualQueryCost: number;
      throttleStatus: {
        maximumAvailable: number;
        currentlyAvailable: number;
        restoreRate: number;
      };
    };
  };
};

const RATE_LIMIT_DELAY = 500;
let lastRequestTime = 0;

async function waitForRateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest)
    );
  }
  lastRequestTime = Date.now();
}

export async function adminQuery<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (typeof window !== 'undefined') {
    throw new Error(
      'Admin API must only be called server-side. Never expose admin tokens to the client.'
    );
  }

  await waitForRateLimit();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return adminQuery<T>(query, variables);
      }
      throw new Error(
        `Shopify Admin API error: ${response.status} ${response.statusText}`
      );
    }

    const json: ShopifyAdminResponse<T> = await response.json();

    if (json.errors) {
      const messages = json.errors.map((e) => e.message).join(', ');
      console.error('Shopify Admin GraphQL Errors:', json.errors);
      throw new Error(`Shopify Admin GraphQL error: ${messages}`);
    }

    return json.data;
  } catch (error) {
    console.error('Admin API request failed:', error);
    throw error;
  }
}
