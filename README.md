# Crossover Culture Custom Product Pages

## Atlas-Ready Storefront Shell Package

This repo now also includes a safe premium storefront shell package for Shopify implementation.

If ChatGPT agent mode in Atlas is being used for theme work, start here:

- `ATLAS_IMPLEMENTATION.md`
- `ATLAS_AGENT_PROMPT.md`
- `SHOPIFY_IMPLEMENTATION_CHECKLIST.md`
- `QA_AUDIT_REPORT.md`
- `references/crossover-culture-homepage-concept.png`

These files are intended to help Atlas implement the premium storefront shell without modifying the protected custom-order systems.

### Product template style standard

All new or updated custom product templates should keep the liquid-glass visual language now used across the product system. Match the socks and fleece hoodie look: translucent white panels, saturated blur, soft highlight sheens, rounded glass controls, subtle inner highlights, and low shadow depth. Use the shared apparel glass layer in `assets/custom-shooting-shirt.css` for apparel-style templates and the matching uniform glass layer in `assets/team-order-form.css` for team uniform templates.

### Safe storefront shell files

- `assets/crossover-culture-storefront.css`
- `assets/crossover-culture-storefront.js`
- `sections/cc-homepage-shell.liquid`
- `sections/cc-collection-shell.liquid`
- `sections/cc-product-shell.liquid`
- `snippets/cc-store-header.liquid`
- `snippets/cc-store-footer.liquid`
- `snippets/cc-collection-card.liquid`
- `templates/index.json`
- `templates/collection.json`
- `templates/product.json`

### Protected files that must remain untouched

- `templates/product.custom-team-uniform.json`
- `templates/product.custom-shooting-shirt.json`
- `templates/product.custom-travel-gear.json`
- `templates/product.custom-unisex-travel-gear.json`
- `templates/product.custom-polo.json`
- `templates/product.custom-practice-shorts.json`
- `templates/product.custom-origin-fleece-hoodie.json`
- `templates/product.custom-origin-fleece-jogger.json`
- `templates/product.custom-elevate-fleece-hoodie.json`
- `templates/product.custom-elevate-fleece-jogger.json`
- `templates/product.custom-varsity-sock.json`
- `sections/team-order-form.liquid`
- `sections/custom-shooting-shirt.liquid`
- `sections/custom-travel-gear.liquid`
- `sections/custom-unisex-travel-gear.liquid`
- `sections/custom-polo.liquid`
- `sections/custom-practice-shorts.liquid`
- `sections/custom-origin-fleece.liquid`
- `sections/custom-elevate-fleece.liquid`
- `sections/custom-varsity-sock.liquid`
- `assets/team-order-form.css`
- `assets/team-order-form.js`
- `assets/custom-shooting-shirt.css`
- `assets/custom-shooting-shirt.js`
- `assets/custom-travel-gear.css`
- `assets/custom-travel-gear.js`
- `assets/custom-polo.css`
- `assets/custom-polo.js`
- `assets/custom-practice-shorts.css`
- `assets/custom-practice-shorts.js`
- `assets/custom-origin-fleece.css`
- `assets/custom-origin-fleece.js`
- `assets/custom-elevate-fleece.css`
- `assets/custom-elevate-fleece.js`
- `assets/custom-varsity-sock.css`
- `assets/custom-varsity-sock.js`
- `snippets/team-feature-icons.liquid`
- `snippets/team-size-guide.liquid`

## Overview

This repo contains Shopify theme files for nine custom product-ordering flows:

- `team-order-form`
  Custom team uniform ordering
- `custom-shooting-shirt`
  Custom shooting shirt ordering
- `custom-travel-gear`
  Custom travel gear ordering for:
  - Enlisted 1/4 Zip
  - Enlisted Crew
- `custom-unisex-travel-gear`
  Custom unisex travel gear ordering with wheel-based garment/logo colors and one unisex adult size run.
- `custom-polo`
  Custom polo ordering for:
  - Enlisted Polo
- `custom-practice-shorts`
  Custom practice shorts ordering
- `custom-origin-fleece`
  Custom Origin fleece hoodie/jogger ordering
- `custom-elevate-fleece`
  Custom Elevate fleece hoodie/jogger ordering
- `custom-varsity-sock`
  Custom varsity sock ordering

These templates use native Shopify product form submission to `{{ routes.cart_add_url }}`. They do not use AJAX add-to-cart.

There is no `package.json` in this repo. There is no install, dev server, build, lint, or test command here. Implementation is done by copying these theme files into a Shopify theme.

## Repo Structure

```text
custom product/
├── README.md
├── assets/
│   ├── custom-shooting-shirt.css
│   ├── custom-shooting-shirt.js
│   ├── custom-polo.css
│   ├── custom-polo.js
│   ├── custom-origin-fleece.css
│   ├── custom-origin-fleece.js
│   ├── custom-elevate-fleece.css
│   ├── custom-elevate-fleece.js
│   ├── custom-practice-shorts.css
│   ├── custom-practice-shorts.js
│   ├── custom-travel-gear.css
│   ├── custom-travel-gear.js
│   ├── custom-varsity-sock.css
│   ├── custom-varsity-sock.js
│   ├── team-order-form.css
│   └── team-order-form.js
├── sections/
│   ├── custom-polo.liquid
│   ├── custom-origin-fleece.liquid
│   ├── custom-elevate-fleece.liquid
│   ├── custom-practice-shorts.liquid
│   ├── custom-shooting-shirt.liquid
│   ├── custom-travel-gear.liquid
│   ├── custom-unisex-travel-gear.liquid
│   ├── custom-varsity-sock.liquid
│   └── team-order-form.liquid
├── snippets/
│   ├── team-feature-icons.liquid
│   └── team-size-guide.liquid
└── templates/
    ├── product.custom-polo.json
    ├── product.custom-origin-fleece-hoodie.json
    ├── product.custom-origin-fleece-jogger.json
    ├── product.custom-elevate-fleece-hoodie.json
    ├── product.custom-elevate-fleece-jogger.json
    ├── product.custom-practice-shorts.json
    ├── product.custom-shooting-shirt.json
    ├── product.custom-team-uniform.json
    ├── product.custom-travel-gear.json
    ├── product.custom-unisex-travel-gear.json
    └── product.custom-varsity-sock.json
```

## Files That Matter Most

- `sections/team-order-form.liquid`
  Main team uniform product section.
- `assets/team-order-form.css`
  Scoped uniform styles.
- `assets/team-order-form.js`
  Uniform gallery, roster, color, validation, and submit behavior.
- `sections/custom-shooting-shirt.liquid`
  Main shooting shirt product section.
- `assets/custom-shooting-shirt.css`
  Shared apparel layout and shooting-shirt-specific styles.
- `assets/custom-shooting-shirt.js`
  Shooting shirt color, size, validation, and submit behavior.
- `sections/custom-travel-gear.liquid`
  Main travel gear product section.
- `sections/custom-unisex-travel-gear.liquid`
  Main unisex travel gear product section.
- `assets/custom-travel-gear.css`
  Travel-gear-specific styling on top of the shared apparel layout, including the unisex travel gear sizing override.
- `assets/custom-travel-gear.js`
  Travel gear and unisex travel gear color, size, validation, and submit behavior.
- `sections/custom-polo.liquid`
  Main polo product section.
- `assets/custom-polo.css`
  Polo-specific layout adjustments on top of the shared apparel layout.
- `assets/custom-polo.js`
  Polo gallery, color, size, validation, and submit behavior.
- `sections/custom-practice-shorts.liquid`
  Main practice shorts product section.
- `assets/custom-practice-shorts.css`
  Practice-shorts-specific styling on top of the shared apparel layout.
- `assets/custom-practice-shorts.js`
  Practice shorts color, size, upload, pricing, validation, and submit behavior.
- `sections/custom-origin-fleece.liquid`
  Main Origin fleece product section for hoodie and jogger templates.
- `assets/custom-origin-fleece.css`
  Origin-fleece-specific styling on top of the shared apparel layout.
- `assets/custom-origin-fleece.js`
  Origin fleece color, size, upload, pricing, validation, and submit behavior.
- `sections/custom-elevate-fleece.liquid`
  Main Elevate fleece product section for hoodie and jogger templates.
- `assets/custom-elevate-fleece.css`
  Elevate-fleece-specific styling on top of the shared apparel layout.
- `assets/custom-elevate-fleece.js`
  Elevate fleece color, size, upload, pricing, validation, and submit behavior.
- `sections/custom-varsity-sock.liquid`
  Main varsity sock product section.
- `assets/custom-varsity-sock.css`
  Varsity-sock-specific styling on top of the shared apparel layout.
- `assets/custom-varsity-sock.js`
  Varsity sock color, size, pricing, validation, and submit behavior.
- `templates/product.custom-team-uniform.json`
  Product template that mounts `team-order-form`.
- `templates/product.custom-shooting-shirt.json`
  Product template that mounts `custom-shooting-shirt`.
- `templates/product.custom-travel-gear.json`
  Product template that mounts `custom-travel-gear`.
- `templates/product.custom-unisex-travel-gear.json`
  Product template that mounts `custom-unisex-travel-gear`.
- `templates/product.custom-polo.json`
  Product template that mounts `custom-polo`.
- `templates/product.custom-practice-shorts.json`
  Product template that mounts `custom-practice-shorts`.
- `templates/product.custom-origin-fleece-hoodie.json`
  Product template that mounts `custom-origin-fleece`.
- `templates/product.custom-origin-fleece-jogger.json`
  Product template that mounts `custom-origin-fleece`.
- `templates/product.custom-elevate-fleece-hoodie.json`
  Product template that mounts `custom-elevate-fleece`.
- `templates/product.custom-elevate-fleece-jogger.json`
  Product template that mounts `custom-elevate-fleece`.
- `templates/product.custom-varsity-sock.json`
  Product template that mounts `custom-varsity-sock`.

## Shopify Installation

1. In Shopify Admin, open `Online Store -> Themes`.
2. On the target theme, click `... -> Edit code`.
3. Create or replace these files:
   - `sections/team-order-form.liquid`
   - `sections/custom-shooting-shirt.liquid`
   - `sections/custom-travel-gear.liquid`
   - `sections/custom-unisex-travel-gear.liquid`
   - `sections/custom-polo.liquid`
   - `sections/custom-practice-shorts.liquid`
   - `sections/custom-origin-fleece.liquid`
   - `sections/custom-elevate-fleece.liquid`
   - `sections/custom-varsity-sock.liquid`
   - `templates/product.custom-team-uniform.json`
   - `templates/product.custom-shooting-shirt.json`
   - `templates/product.custom-travel-gear.json`
   - `templates/product.custom-unisex-travel-gear.json`
   - `templates/product.custom-polo.json`
   - `templates/product.custom-practice-shorts.json`
   - `templates/product.custom-origin-fleece-hoodie.json`
   - `templates/product.custom-origin-fleece-jogger.json`
   - `templates/product.custom-elevate-fleece-hoodie.json`
   - `templates/product.custom-elevate-fleece-jogger.json`
   - `templates/product.custom-varsity-sock.json`
   - `assets/team-order-form.css`
   - `assets/team-order-form.js`
   - `assets/custom-shooting-shirt.css`
   - `assets/custom-shooting-shirt.js`
   - `assets/custom-polo.css`
   - `assets/custom-polo.js`
   - `assets/custom-travel-gear.css`
   - `assets/custom-travel-gear.js`
   - `assets/custom-practice-shorts.css`
   - `assets/custom-practice-shorts.js`
   - `assets/custom-origin-fleece.css`
   - `assets/custom-origin-fleece.js`
   - `assets/custom-elevate-fleece.css`
   - `assets/custom-elevate-fleece.js`
   - `assets/custom-varsity-sock.css`
   - `assets/custom-varsity-sock.js`
   - `snippets/team-size-guide.liquid`
   - `snippets/team-feature-icons.liquid`
4. Save the files.

## Template Assignment

Assign each product to the matching template in the Shopify product admin:

- `custom-team-uniform`
  Use for custom uniform products.
- `custom-shooting-shirt`
  Use for custom shooting shirt products.
- `custom-travel-gear`
  Use only for:
  - Enlisted 1/4 Zip
  - Enlisted Crew
- `custom-unisex-travel-gear`
  Use for unisex travel gear or apparel products that should not collect separate Mens, Womens, or Youth quantities.
- `custom-polo`
  Use for:
  - Enlisted Polo
- `custom-practice-shorts`
  Use for custom practice shorts products.
- `custom-origin-fleece-hoodie`
  Use for Origin Fleece Hoodie products.
- `custom-origin-fleece-jogger`
  Use for Origin Fleece Jogger products.
- `custom-elevate-fleece-hoodie`
  Use for Elevate Fleece Hoodie products.
- `custom-elevate-fleece-jogger`
  Use for Elevate Fleece Jogger products.
- `custom-varsity-sock`
  Use for custom varsity sock products.

Do not assign `custom-travel-gear` to polo products. Polo has its own dedicated template.

## Travel Gear Mapping Rules

`sections/custom-travel-gear.liquid` uses the product title to choose between the two supported catalog setups:

- Titles containing `crew`
  Use the Crew configuration.
- All other supported travel-gear titles
  Use the 1/4 Zip configuration.

For clean implementation, keep the actual product titles explicit:

- `Enlisted 1/4 Zip`
- `Enlisted Crew`

## Theme Editor Settings

### Team Uniform

Configured through `product.custom-team-uniform.json` / `team-order-form`:

- `Minimum Players`

### Shooting Shirt

Configured through `product.custom-shooting-shirt.json` / `custom-shooting-shirt`:

- `Delivery Time`
- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `Intro Copy`

### Travel Gear

Configured through `product.custom-travel-gear.json` / `custom-travel-gear`:

- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `1/4 Zip Intro Copy`
- `Crew Intro Copy`

### Unisex Travel Gear

Configured through `product.custom-unisex-travel-gear.json` / `custom-unisex-travel-gear`:

- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `Product Style`
- `Garment Label`
- `Intro Copy`

### Polo

Configured through `product.custom-polo.json` / `custom-polo`:

- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `Intro Copy`

### Practice Shorts

Configured through `product.custom-practice-shorts.json` / `custom-practice-shorts`:

- `Minimum Pieces`
- `Mens / Womens Unit Price`
- `Youth Unit Price`
- `Intro Copy`

### Origin Fleece

Configured through `product.custom-origin-fleece-hoodie.json` / `custom-origin-fleece` and `product.custom-origin-fleece-jogger.json` / `custom-origin-fleece`:

- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `Hoodie Intro Copy`
- `Jogger Intro Copy`

### Elevate Fleece

Configured through `product.custom-elevate-fleece-hoodie.json` / `custom-elevate-fleece` and `product.custom-elevate-fleece-jogger.json` / `custom-elevate-fleece`:

- `Minimum Order Text`
- `Contact Page URL`
- `Minimum Pieces`
- `Hoodie Intro Copy`
- `Jogger Intro Copy`

### Varsity Sock

Configured through `product.custom-varsity-sock.json` / `custom-varsity-sock`:

- `Unit Price`
- `Minimum Pairs`
- `Intro Copy`

## Runtime Behavior

All nine flows:

- submit through the native Shopify product form
- store custom selections as line item properties
- validate required fields before submit

Upload-enabled flows validate vector artwork files. Accepted upload extensions:

- `.svg`
- `.ai`
- `.eps`

## Expected Cart / Order Data

Examples of saved line item properties:

### Team Uniform

```text
Team Name: Panthers
Main Color: #FFFFFF (White)
Number Color: #111111 (Black)
Alt Color: #003DA5 (Royal Blue)
Style: Home
Player Count: 8
Roster: 1. WILLIAMS #30 Men's L | 2. JOHNSON #23 Men's XL
Number & Name Font: Athletic
Sample Size: Men's L
Team Logo Upload: [uploaded vector file]
```

### Shooting Shirt

```text
Team Wording: Panthers
Wording Font: Athletic
Shirt Color: #FFFFFF (White)
Words + CC Logo Color: #111111 (Black)
Size Breakdown: Mens M x 6 | Youth YL x 2
Total Pieces: 8
Artwork Upload: [uploaded vector file]
```

### Travel Gear

```text
Team Wording: Panthers
Team Font: ATHLETIC
Garment Type: 1/4 Zip
Garment Color: #111111 (Black)
Logo / Artwork Color: #FFFFFF (White)
Size Breakdown: Mens L x 4 | Womens WM x 2 | Youth YM x 1
Total Pieces: 7
Artwork Upload: [uploaded vector file]
```

### Polo

```text
Team Wording: Panthers
Team Font: ATHLETIC
Garment Type: Polo
Garment Color: #111111 (Black)
Logo / Artwork Color: #FFFFFF (White)
Size Breakdown: Mens L x 4 | Womens WM x 2
Total Pieces: 6
```

### Practice Shorts

```text
Short Color: #111111 (Black)
Artwork + Decoration Color: #FFFFFF (White)
Size Breakdown: Mens M x 6 | Youth YL x 2
Total Pieces: 8
Calculated Order Total: $280.00
```

### Varsity Sock

```text
Sock Color: #111111 (Black)
Sock Color Code: A3-3-BLK
Size Breakdown: Medium x 6 | Large x 6
Total Pairs: 12
Calculated Order Total: $144.00
Logo Upload: [uploaded vector file]
```

## Cart Theme Requirement

The theme cart must render line item properties and uploaded file links. If the cart hides `item.properties`, the custom order details will still submit, but the customer and staff will not see them in the cart UI.

## Recommended QA Before Launch

1. Open one product for each template:
   - `custom-team-uniform`
   - `custom-shooting-shirt`
   - `custom-travel-gear`
   - `custom-unisex-travel-gear`
   - `custom-polo`
   - `custom-practice-shorts`
   - `custom-origin-fleece-hoodie`
   - `custom-origin-fleece-jogger`
   - `custom-elevate-fleece-hoodie`
   - `custom-elevate-fleece-jogger`
   - `custom-varsity-sock`
2. Confirm the gallery thumbnails swap the main image.
3. Confirm all required fields block submission when empty.
4. Confirm invalid upload types are rejected.
5. Confirm valid vector uploads submit.
6. Confirm cart line item properties render correctly.
7. Confirm desktop, tablet, and mobile layouts.
8. Confirm the travel-gear template is assigned only to 1/4 Zip and Crew products.
9. Confirm the polo template is assigned only to polo products.
10. Confirm the women’s sizing display matches the actual size inputs for both travel-gear products and the polo product.

## Current Repo Notes

- `team-feature-icons.liquid` is legacy and not required by the current page layouts.
- The font previews in the travel-gear and uniform references use CSS approximations unless the real licensed font files are added to the theme separately.
