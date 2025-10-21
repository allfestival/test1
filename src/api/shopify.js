import Constants from 'expo-constants';

const EXTRA = Constants?.expoConfig?.extra ?? Constants?.manifest?.extra ?? {};
const DOMAIN = EXTRA.shopifyDomain;
const STOREFRONT_ACCESS_TOKEN = EXTRA.storefrontAccessToken;

if (!DOMAIN) {
  console.warn(
    'Shopify domain is not configured. Add SHOPIFY_DOMAIN to your environment variables.'
  );
}

if (!STOREFRONT_ACCESS_TOKEN) {
  console.warn(
    'Shopify Storefront access token is not configured. Add SHOPIFY_STOREFRONT_ACCESS_TOKEN to your environment variables.'
  );
}

const API_URL = DOMAIN ? `https://${DOMAIN}/api/2023-07/graphql.json` : undefined;

const baseHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN
});

export async function fetchProducts({ first = 10 } = {}) {
  if (!API_URL) {
    throw new Error('Shopify API URL is not configured.');
  }

  const query = `
    query Products($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            description
            handle
            featuredImage {
              altText
              url
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: baseHeaders(),
    body: JSON.stringify({ query, variables: { first } })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} ${errorText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((error) => error.message).join('\n'));
  }

  return data?.products?.edges?.map((edge) => edge.node) ?? [];
}

export async function fetchProduct(handle) {
  if (!API_URL) {
    throw new Error('Shopify API URL is not configured.');
  }

  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        featuredImage {
          altText
          url
        }
        images(first: 8) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: baseHeaders(),
    body: JSON.stringify({ query, variables: { handle } })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} ${errorText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((error) => error.message).join('\n'));
  }

  return data?.productByHandle ?? null;
}
