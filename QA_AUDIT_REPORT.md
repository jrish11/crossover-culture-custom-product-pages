# QA Audit Report

Date: 2026-06-24

## Scope

Audited the local Shopify theme source for:

- All custom product templates and mounted sections
- Liquid-glass styling coverage
- Color wheel / HEX controls where the product flow supports free color selection
- Size totals and cart quantity synchronization hooks
- Vector upload fields and validation where that product flow includes an upload
- Add-to-cart line item properties
- Storefront shell routing, mobile drawer links, footer links, and product recommendations
- Implementation docs and Shopify copy checklist

## Local Checks Completed

- Every `templates/product.custom*.json` file parses as JSON.
- Every custom product template mounts an existing section.
- Every custom product section posts to `{{ routes.cart_add_url }}`.
- Upload-enabled custom product sections validate vector artwork files.
- Every custom product JS asset passes `node --check`.
- Every custom product section includes customer-facing line item properties for colors, sizes/roster, totals, and notes where applicable.
- No custom product section renders recommended color swatches.
- Liquid-glass styling is present through the shared apparel/uniform glass layers and product-specific glass overrides.
- Storefront shell header, mobile drawer, footer, collection pages, homepage routes, and standard product recommendations include the expanded custom route set.

## Fixes Applied

- Corrected upload QA scope so only upload-enabled product flows require artwork files.
- Normalized Origin/Elevate fleece cart property names to match the apparel system.
- Added the unisex/fleece/shorts/sock custom routes to homepage route cards, standard product recommendations, collection routing, mobile nav, and footer.
- Updated README and Atlas guardrails to include Origin/Elevate fleece templates.
- Added `SHOPIFY_IMPLEMENTATION_CHECKLIST.md`.

## Live Shopify Checks Still Required

This workspace does not include a Shopify store URL, theme link, `.env`, `shopify.theme.toml`, or Shopify CLI connection. After the files are copied to a live or duplicate Shopify theme, complete the browser QA in `SHOPIFY_IMPLEMENTATION_CHECKLIST.md`:

- Add each custom product to cart with valid data.
- Confirm cart, checkout, and Shopify Admin display line item properties and upload links where that product flow includes an upload.
- Confirm mobile layouts in the actual Shopify theme.
