# Crossover Culture Team Order System

## Project overview

This repository contains a Shopify theme implementation for a custom team uniform ordering flow for Crossover Culture. It replaces the standard retail product template on selected products with a denser, product-page-style team order experience designed for coaches, team managers, and program directors.

The current build focuses on a shorter, cleaner order flow:

- team name
- main uniform color
- number color
- alt or accent color
- home or away style
- progressive roster entry with five starter rows
- collapsed size guide
- number and name font selection
- optional sample size
- one required vector logo upload used for both jersey and shorts placements

The section submits the order through Shopify's AJAX cart endpoint using `fetch` plus `FormData`, which allows text line item properties and the vector logo upload to be added without redirecting the customer away from the product page.

## File structure

```text
crossover-culture-team-order-system/
├── README.md
├── assets/
│   ├── team-order-form.css
│   └── team-order-form.js
├── sections/
│   └── team-order-form.liquid
├── snippets/
│   ├── team-feature-icons.liquid
│   └── team-size-guide.liquid
└── templates/
    └── product.team-uniform.json
```

## What each file does

- `sections/team-order-form.liquid`
  Renders the full product layout, including the utility bar, gallery, streamlined order form, collapsed size guide, collapsed font reference, shared logo upload, and schema settings.
- `templates/product.team-uniform.json`
  Creates the alternate product template that renders the custom team order section.
- `assets/team-order-form.css`
  Provides fully scoped styles under `.team-order-section` so the layout stays isolated from the rest of the theme.
- `assets/team-order-form.js`
  Handles gallery swapping, team name counting, color targeting, roster row management, vector upload checks, and AJAX add-to-cart submission.
- `snippets/team-size-guide.liquid`
  Renders the size guide content used inside the collapsed dropdown.
- `snippets/team-feature-icons.liquid`
  Legacy feature snippet retained in the repo but not used by the current streamlined layout.

## Shopify installation instructions

1. In Shopify Admin, go to `Online Store -> Themes`.
2. On the theme you want to edit, click `... -> Edit code`.
3. Create or replace the following files using the contents from this repository:
   - `sections/team-order-form.liquid`
   - `templates/product.team-uniform.json`
   - `assets/team-order-form.css`
   - `assets/team-order-form.js`
   - `snippets/team-size-guide.liquid`
   - `snippets/team-feature-icons.liquid`
4. Save each file after pasting the contents.

## How to assign the template to uniform products

1. In Shopify Admin, go to `Products`.
2. Open the uniform product that should use this order flow.
3. In the `Theme template` selector, choose `team-uniform`.
4. Save the product.
5. Repeat for every uniform product that should use this experience.

## How to configure the section in the theme editor

1. Open `Online Store -> Themes`.
2. Click `Customize` on the target theme.
3. Navigate to a product that already uses the `team-uniform` template.
4. Open the `Team Order Form` section settings.
5. Configure:
   - `Delivery Time`
   - `Minimum Order Text`
   - `Contact Page URL`
   - `Minimum Players`

The code enforces a floor of six players even if a lower number is entered in the editor, which keeps the order logic aligned with the business rule.

## Customer flow

1. The buyer lands on a uniform product assigned to `team-uniform`.
2. They browse the product gallery.
3. They enter the team name.
4. They choose:
   - main color for jersey and shorts body
   - number color for front and back numbers
   - alt color for trim, piping, and accent areas
5. They choose `Home` or `Away`.
6. They choose a number and name font.
7. They complete the roster, starting from five visible rows and adding more as needed.
8. They optionally open `View size & fit guide`.
9. They optionally choose a sample size.
10. They upload one vector logo file that will be used for both placements:
   - top right on jersey
   - bottom left on shorts
11. They submit the team order without leaving the page.

## Cart property format

The script posts the section form to Shopify using `FormData`. Text-based selections are stored as line item properties, and the vector logo is attached using a line item property file input.

Expected text properties:

```text
Team Name: Panthers
Main Color: #FFFFFF (White)
Number Color: #111111 (Black)
Alt Color: #003DA5 (Royal Blue)
Style: Home
Player Count: 8
Roster: 1. WILLIAMS #30 Men's L | 2. JOHNSON #23 Men's XL | 3. DAVIS #10 Youth YL
Number & Name Font: Athletic
Sample Size: Men's L
```

Expected file property:

```text
Team Logo Upload: [uploaded vector file]
```

## Vector upload rule

The current implementation treats the shared logo upload as required and only accepts vector files:

- `.svg`
- `.ai`
- `.eps`

If the file is missing or uses a different extension, the form blocks add-to-cart and displays an error.

## Important theme note for carts

This section sends the order data into Shopify correctly, but your cart template must display line item properties if you want the customer to see the details there. Many themes already do this, but some custom themes do not.

If your cart currently hides line item properties or uploaded file links, update the cart template to loop through `item.properties`.

## How to modify or extend

- To change the color application copy, edit the `DEFAULT_COLORS` object in `assets/team-order-form.js`.
- To change the preset colors, update the preset list in `sections/team-order-form.liquid` and the `PRESET_COLORS` array in `assets/team-order-form.js`.
- To change the available fonts, update the `font_options` list in `sections/team-order-form.liquid`.
- To make the logo upload optional instead of required, update the validation logic in `assets/team-order-form.js` and remove the `required` attribute on the file input in `sections/team-order-form.liquid`.
- To increase or reduce the initial visible roster rows, update the hardcoded table rows in `sections/team-order-form.liquid` and `INITIAL_ROWS` in `assets/team-order-form.js`.
- To restyle the page, keep selectors inside `.team-order-section` so the build remains isolated from the rest of the theme.

## Recommended QA after installation

1. Open a product using the `team-uniform` template.
2. Confirm the gallery, utility bar, compact two-column layout, dropdown size guide, dropdown font reference, and single logo upload field render cleanly.
3. Test each color group:
   - main color
   - number color
   - alt color
4. Confirm the `Main`, `Number`, and `Alt` buttons update the active color target and summary values.
5. Try a validation failure by leaving a player incomplete or omitting the vector logo file.
6. Upload a valid vector file, choose a font, and submit a complete order.
7. Open the cart and verify the line item properties and uploaded file link appear correctly.
8. Check the page on desktop, tablet, and mobile widths.
