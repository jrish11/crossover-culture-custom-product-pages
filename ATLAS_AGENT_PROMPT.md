# Atlas Agent Prompt

Copy and paste this into ChatGPT agent mode in Atlas.

```text
Work only in my duplicate Shopify theme.

Use this GitHub repo as the source of truth:
https://github.com/jrish11/crossover-culture-storefront-shell

Read and follow:
- ATLAS_IMPLEMENTATION.md

Your job:
1. Copy the premium storefront shell files from the repo into the duplicate Shopify theme.
2. Use the homepage concept image from the repo: references/crossover-culture-homepage-concept.png
3. Configure the homepage to use the immersive hero with clickable collection hotspots.
4. Keep all protected custom-order templates, sections, assets, upload behavior, validation, line item properties, roster builders, size breakdowns, font selectors, color selector logic, and special add-to-cart flows untouched.
5. After implementation, test homepage, collection pages, standard product pages, and protected custom product pages.
6. If a collection handle or product URL does not match the repo assumptions, stop and report the mismatch instead of guessing.

Product template style memory:
- Whenever creating or updating a custom product template, match the liquid-glass look used by the varsity sock and fleece hoodie templates.
- Product pages should use translucent white glass panels, saturated blur, soft highlight sheens, rounded glass controls, subtle inner highlights, and low shadow depth.
- Apparel templates should inherit the shared glass layer from assets/custom-shooting-shirt.css. Team uniform templates should keep the matching glass layer from assets/team-order-form.css.

Safe storefront shell files to use:
- assets/crossover-culture-storefront.css
- assets/crossover-culture-storefront.js
- sections/cc-homepage-shell.liquid
- sections/cc-collection-shell.liquid
- sections/cc-product-shell.liquid
- snippets/cc-store-header.liquid
- snippets/cc-store-footer.liquid
- snippets/cc-collection-card.liquid
- templates/index.json
- templates/collection.json
- templates/product.json

Protected files you must not modify:
- templates/product.custom-team-uniform.json
- templates/product.custom-shooting-shirt.json
- templates/product.custom-travel-gear.json
- templates/product.custom-unisex-travel-gear.json
- templates/product.custom-polo.json
- templates/product.custom-practice-shorts.json
- templates/product.custom-origin-fleece-hoodie.json
- templates/product.custom-origin-fleece-jogger.json
- templates/product.custom-elevate-fleece-hoodie.json
- templates/product.custom-elevate-fleece-jogger.json
- templates/product.custom-varsity-sock.json
- sections/team-order-form.liquid
- sections/custom-shooting-shirt.liquid
- sections/custom-travel-gear.liquid
- sections/custom-unisex-travel-gear.liquid
- sections/custom-polo.liquid
- sections/custom-practice-shorts.liquid
- sections/custom-origin-fleece.liquid
- sections/custom-elevate-fleece.liquid
- sections/custom-varsity-sock.liquid
- assets/team-order-form.css
- assets/team-order-form.js
- assets/custom-shooting-shirt.css
- assets/custom-shooting-shirt.js
- assets/custom-travel-gear.css
- assets/custom-travel-gear.js
- assets/custom-polo.css
- assets/custom-polo.js
- assets/custom-practice-shorts.css
- assets/custom-practice-shorts.js
- assets/custom-origin-fleece.css
- assets/custom-origin-fleece.js
- assets/custom-elevate-fleece.css
- assets/custom-elevate-fleece.js
- assets/custom-varsity-sock.css
- assets/custom-varsity-sock.js
- snippets/team-feature-icons.liquid
- snippets/team-size-guide.liquid

Collections that must remain visible and merchandised:
- Reversible Jerseys
- Reversible Basketball Uniforms
- Basketball Uniforms
- Shooting Shirts
- Hoodies & Fleece
- Travel Gear
- Practice Shorts
- Base Layers
- Accessories

Important homepage rule:
If you use the baked concept image from the repo, set “Show headline and hero copy over the scene” to off so the text is not duplicated.

Do not publish the theme. Work only in the duplicate theme and report back when implementation and checks are complete.
```
