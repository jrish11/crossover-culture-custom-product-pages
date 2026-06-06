# Crossover Culture Team Order System

## Project overview

This repository contains a complete Shopify theme extension for Crossover Culture uniform products. It introduces a dedicated alternate product template that replaces the default retail-oriented product page with a team ordering workflow built for coaches, program directors, and team managers.

The experience focuses on collecting structured roster information and sending that data into the Shopify cart as line item properties. It does not generate a live jersey preview. Instead, it captures the full team order cleanly and keeps the buying flow fast.

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
  Builds the full team ordering section, including the utility bar, gallery, product information, roster form, size guide mount point, cart CTA, and section schema.
- `templates/product.team-uniform.json`
  Creates the alternate Shopify product template that renders the team order form section instead of the default product template.
- `assets/team-order-form.css`
  Provides fully scoped styling under `.team-order-section` so the layout and form styles stay isolated from the rest of the theme.
- `assets/team-order-form.js`
  Handles the product gallery, team name character counter, color selection, style toggle, roster row management, validation, and cart submission to `/cart/add.js`.
- `snippets/team-size-guide.liquid`
  Outputs the always-visible size guide for Youth, Women's, and Men's sizing.
- `snippets/team-feature-icons.liquid`
  Outputs the four inline SVG performance feature blocks shown beneath the main content.

## Shopify installation steps

1. In Shopify Admin, go to `Online Store -> Themes`.
2. On the theme you want to edit, click `... -> Edit code`.
3. Inside the code editor, create or replace the following files with the contents from this repository:
   - `sections/team-order-form.liquid`
   - `templates/product.team-uniform.json`
   - `assets/team-order-form.css`
   - `assets/team-order-form.js`
   - `snippets/team-size-guide.liquid`
   - `snippets/team-feature-icons.liquid`
4. Save each file after pasting the code.

## How to assign the alternate template to products

1. In Shopify Admin, go to `Products`.
2. Open a uniform product that should use the team ordering experience.
3. In the `Theme template` area, select `team-uniform`.
4. Save the product.
5. Repeat for every product that should use the custom team order flow.

## How to configure the section in the theme editor

1. Open `Online Store -> Themes`.
2. Click `Customize` on the theme where the files were installed.
3. Navigate to a product using the `team-uniform` template.
4. Open the `Team Order Form` section settings.
5. Configure the available schema options:
   - `Delivery Time`
   - `Minimum Order Text`
   - `Contact Page URL`
   - `Minimum Players`

The current implementation enforces a minimum of six players even if a lower value is entered, which protects the ordering logic and matches the stated business rules.

## Cart line item property format

The add-to-cart request uses Shopify's AJAX cart endpoint and sends the team order as a single product line item with structured properties.

Example payload:

```json
{
  "items": [
    {
      "id": 1234567890,
      "quantity": 1,
      "properties": {
        "Team Name": "Panthers",
        "Uniform Color": "#003DA5 (Royal Blue)",
        "Style": "Home",
        "Player Count": "8",
        "Roster": "1. WILLIAMS #30 Men's L | 2. JOHNSON #23 Men's XL | 3. DAVIS #10 Youth YL",
        "Sample Size": "Men's L"
      }
    }
  ]
}
```

## Team order behavior included in this build

- Utility bar with editable delivery and minimum-order messaging
- Two-column product page layout with mobile stacking
- Click-to-swap gallery based on `product.images`
- Team name field with live `0/15` counter
- Preset swatches plus live custom HEX color entry
- Home or Away style toggle
- Roster table starting at six players with add and remove controls
- Auto-uppercase last names
- Player number validation for values between `0` and `99`
- Always-visible size guide
- AJAX cart submission with success and error feedback
- Quote CTA linking to `/pages/contact?type=quote`

## How to extend or modify

- To change the hardcoded product feature bullets, edit the product information list in `sections/team-order-form.liquid`.
- To add or remove preset colors, update both the Liquid preset list in `sections/team-order-form.liquid` and the `PRESET_COLORS` array in `assets/team-order-form.js`.
- To change roster validation rules, edit `validateRoster()` in `assets/team-order-form.js`.
- To support more size families or new naming conventions, update the roster size select in the section file, the sample size select, the JavaScript row template, and the size guide snippet together.
- To restyle the interface, keep all selectors inside `.team-order-section` so the component remains isolated from the rest of the theme.

## Recommended QA after installation

1. Open a product using the `team-uniform` template.
2. Confirm the utility bar, gallery, roster table, size guide, and feature icons render correctly.
3. Add exactly six complete players and confirm the line item is added successfully.
4. Open the cart and verify that all line item properties display with the expected values.
5. Test a validation failure by leaving one player row incomplete and confirm the error message appears.
6. Check the page on desktop, tablet, and mobile widths to verify the responsive layout.
