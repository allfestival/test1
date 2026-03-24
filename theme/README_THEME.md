# Veda Luxe India (OS 2.0) – Setup & Build Guide

## 1) Folder structure

```text
theme/
  assets/
    base.css
    theme.js
  config/
    settings_schema.json
    settings_data.json
  layout/
    theme.liquid
  locales/
  sections/
    footer.liquid
    header.liquid
    hero-premium.liquid
    main-collection-product-grid.liquid
    main-product.liquid
  snippets/
    card-product.liquid
    product-form.liquid
  templates/
    collection.json
    index.json
    product.json
```

## 2) Local setup

1. Install Shopify CLI.
2. From repository root run: `shopify theme dev --path theme`.
3. Bind the theme to a dev store and open theme editor.
4. Assign menus in Header and Footer settings.

## 3) Performance checklist

- Keep JS to behavior only (drawer, toggles, events).
- Use responsive images (`image_tag` with widths/sizes).
- Prefer CSS for animation and interactions.
- Avoid blocking third-party scripts on first paint.
- Keep above-the-fold hero image/video optimized and intentionally chosen.

## 4) Completion guidelines

- Add modular homepage sections: testimonials, icon strip, before/after, FAQ, featured collections.
- Expand product page with reviews app block and recently viewed (via localStorage).
- Add collection filter drawer with progressive enhancement.
- Build a festival campaign section with schedule-based toggles.
- Add locale JSON files for Hindi and other Indian languages when needed.
- Audit Core Web Vitals on mobile 4G profiles before launch.
