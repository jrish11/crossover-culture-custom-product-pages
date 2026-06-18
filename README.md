# Crossover Culture Team Order System

## Project overview

This repository contains Shopify theme implementations for custom team-order product flows for Crossover Culture. These templates replace the standard retail product template on selected products with denser, product-page-style ordering experiences designed for coaches, team managers, and program directors.

The custom team uniform build focuses on a shorter, cleaner order flow:

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

The repository also contains:

- `custom-shooting-shirt` for Enlisted-style shooting shirts
- `custom-travel-gear` for Enlisted travel gear, with one shared template that adapts to:
  - Enlisted 1/4 Zip
  - Enlisted Polo
  - Enlisted Crew

## File structure

```text
crossover-culture-team-order-system/
├── README.md
├── assets/
│   ├── custom-shooting-shirt.css
│   ├── custom-shooting-shirt.js
│   ├── custom-team-uniform.css
│   ├── custom-team-uniform.js
│   ├── custom-travel-gear.css
│   └── custom-travel-gear.js
├── sections/
│   ├── custom-shooting-shirt.liquid
│   ├── custom-team-uniform.liquid
│   └── custom-travel-gear.liquid
├── snippets/
│   ├── team-feature-icons.liquid
│   └── team-size-guide.liquid
└── templates/
    ├── product.custom-shooting-shirt.json
    ├── product.custom-team-uniform.json
    └── product.custom-travel-gear.json
```

## What each file does

- `sections/custom-team-uniform.liquid`
  Renders the full product layout, including the utility bar, gallery, streamlined order form, collapsed size guide, collapsed font reference, shared logo upload, and schema settings.
- `sections/custom-shooting-shirt.liquid`
  Renders the shooting-shirt order flow with wording, separate shirt and artwork colors, size breakdown, and artwork upload.
- `sections/custom-travel-gear.liquid`
  Renders the travel-gear order flow and automatically swaps the pricing guide, fit ranges, specs, and base-color references for the Enlisted 1/4 Zip, Enlisted Polo, and Enlisted Crew.
- `templates/product.custom-team-uniform.json`
  Creates the alternate product template that renders the custom team order section.
- `templates/product.custom-shooting-shirt.json`
  Creates the alternate product template that renders the shooting-shirt order section.
- `templates/product.custom-travel-gear.json`
  Creates the alternate product template that renders the travel-gear order section.
- `assets/custom-team-uniform.css`
  Provides fully scoped styles under `.team-order-section` so the layout stays isolated from the rest of the theme.
- `assets/custom-team-uniform.js`
  Handles gallery swapping, team name counting, color targeting, roster row management, vector upload checks, and AJAX add-to-cart submission.
- `assets/custom-shooting-shirt.css`
  Provides the shared full-width apparel order layout used by the shooting-shirt flow and reused by the travel-gear flow.
- `assets/custom-shooting-shirt.js`
  Handles the shooting-shirt gallery, color selection, size breakdown, upload validation, and AJAX add-to-cart submission.
- `assets/custom-travel-gear.css`
  Adds travel-gear-specific catalog reference card styles on top of the shared apparel layout.
- `assets/custom-travel-gear.js`
  Handles the travel-gear gallery, decoration tier summary, color selection, size breakdown, upload validation, and AJAX add-to-cart submission.
- `snippets/team-size-guide.liquid`
  Renders the size guide content used inside the collapsed dropdown.
- `snippets/team-feature-icons.liquid`
  Legacy feature snippet retained in the repo but not used by the current streamlined layout.

## Shopify installation instructions

1. In Shopify Admin, go to `Online Store -> Themes`.
2. On the theme you want to edit, click `... -> Edit code`.
3. Create or replace the following files using the contents from this repository:
   - `sections/custom-team-uniform.liquid`
   - `sections/custom-shooting-shirt.liquid`
   - `sections/custom-travel-gear.liquid`
   - `templates/product.custom-team-uniform.json`
   - `templates/product.custom-shooting-shirt.json`
   - `templates/product.custom-travel-gear.json`
   - `assets/custom-team-uniform.css`
   - `assets/custom-team-uniform.js`
   - `assets/custom-shooting-shirt.css`
   - `assets/custom-shooting-shirt.js`
   - `assets/custom-travel-gear.css`
   - `assets/custom-travel-gear.js`
   - `snippets/team-size-guide.liquid`
   - `snippets/team-feature-icons.liquid`
4. Save each file after pasting the contents.

## How to assign the template to uniform products

1. In Shopify Admin, go to `Products`.
2. Open the uniform product that should use this order flow.
3. In the `Theme template` selector, choose the matching template:
   - `custom-team-uniform`
   - `custom-shooting-shirt`
   - `custom-travel-gear`
4. Save the product.
5. Repeat for every uniform product that should use this experience.

For the travel-gear template, the section detects the product title and automatically switches between the Enlisted 1/4 Zip, Enlisted Polo, and Enlisted Crew catalog details. Keep those keywords in the product title so the correct price guide and size ranges appear.

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

1. The buyer lands on a uniform product assigned to `custom-team-uniform`.
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

- To change the color application copy, edit the `DEFAULT_COLORS` object in `assets/custom-team-uniform.js`.
- To change the preset colors, update the preset list in `sections/custom-team-uniform.liquid` and the `PRESET_COLORS` array in `assets/custom-team-uniform.js`.
- To change the available fonts, update the `font_options` list in `sections/custom-team-uniform.liquid`.
- To make the logo upload optional instead of required, update the validation logic in `assets/custom-team-uniform.js` and remove the `required` attribute on the file input in `sections/custom-team-uniform.liquid`.
- To increase or reduce the initial visible roster rows, update the hardcoded table rows in `sections/custom-team-uniform.liquid` and `INITIAL_ROWS` in `assets/custom-team-uniform.js`.
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
