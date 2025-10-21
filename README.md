# Shopify Mobile App (Expo React Native)

This project bootstraps a cross-platform mobile app (Android, iOS, and web) for an existing Shopify store using the Storefront GraphQL API. The app is built with [Expo](https://expo.dev/) and React Native so you can iterate quickly and deploy to both stores from a single code base.

## Features

- Fetches products from your Shopify Storefront API and renders them in an infinite-scroll friendly list
- Pull-to-refresh and retry flows for network resilience
- Modular architecture (API client, hooks, presentation components) to extend with navigation, cart, and authentication
- Environment-based configuration so secrets never live in source control

## Getting started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure environment variables

1. Duplicate `.env.example` and rename it to `.env`.
2. Fill in your Shopify store information:
   - `SHOPIFY_DOMAIN`: the full domain of your storefront (e.g., `your-store.myshopify.com`).
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Storefront API access token created from Shopify admin (`Apps > Develop apps`). Ensure the token has the Storefront API scopes for reading products and collections.

Expo automatically loads variables from `.env` through `dotenv/config` in `app.config.js`.

### 3. Run the development server

```bash
npm run start
```

Then follow the on-screen instructions to open the project in the Expo Go app on Android or iOS, or run it in an emulator/simulator. Use `npm run android` or `npm run ios` for platform-specific commands.

### 4. Customize the app

- **Product UI**: Update `src/components/ProductCard.js` with additional product metadata, add a carousel, or integrate buy buttons.
- **Data fetching**: Extend `src/api/shopify.js` for collections, product variants, cart, or customer logins.
- **Navigation**: Install `@react-navigation/native` to create multi-screen flows (product detail, cart, profile, etc.).
- **Branding**: Adjust colors and spacing in `src/styles/theme.js` and create real icons/splash screens by adding assets and referencing them in `app.config.js`.

## Shopify notes

- The Storefront API limits queries to 250 products per request; pagination can be implemented by modifying `fetchProducts` to accept cursors.
- For authenticated customer features, generate customer access tokens via Shopify's customer API and store them securely (e.g., Expo Secure Store).
- If you enable checkout, consider using Shopify's web checkout or an embedded checkout SDK.

## Linting

This project includes a lightweight ESLint setup compatible with Expo. Run `npm run lint` to analyze your code.

## Deploying builds

Expo Application Services (EAS) provide build and submit pipelines for both app stores. Follow the [EAS Build documentation](https://docs.expo.dev/build/introduction/) to configure credentials, then run:

```bash
npx expo install expo-doctor
npx expo prebuild
npx expo build:android
npx expo build:ios
```

Refer to Expo docs for detailed release workflows and publishing updates with EAS Update.
