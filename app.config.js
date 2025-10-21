import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  name: 'ShopifyMobileApp',
  slug: 'shopify-mobile-app',
  version: '1.0.0',
  orientation: 'portrait',
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff'
    }
  },
  web: {
    bundler: 'metro'
  },
  extra: {
    shopifyDomain: process.env.SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
  }
});
