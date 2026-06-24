# Shopify Implementation Checklist

Use this when updating the live or duplicate Shopify theme.

## 1. Copy Theme Files

In Shopify Admin, open `Online Store -> Themes -> ... -> Edit code`, then create or replace these files.

### Product Order Sections

- `sections/team-order-form.liquid`
- `sections/custom-shooting-shirt.liquid`
- `sections/custom-travel-gear.liquid`
- `sections/custom-unisex-travel-gear.liquid`
- `sections/custom-polo.liquid`
- `sections/custom-practice-shorts.liquid`
- `sections/custom-origin-fleece.liquid`
- `sections/custom-elevate-fleece.liquid`
- `sections/custom-varsity-sock.liquid`

### Storefront Sections And Snippets

- `sections/cc-homepage-shell.liquid`
- `sections/cc-collection-shell.liquid`
- `sections/cc-product-shell.liquid`
- `snippets/cc-store-header.liquid`
- `snippets/cc-store-footer.liquid`
- `snippets/cc-collection-card.liquid`
- `snippets/team-feature-icons.liquid`
- `snippets/team-size-guide.liquid`

### Templates

- `templates/index.json`
- `templates/collection.json`
- `templates/product.json`
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

### Assets

- `assets/crossover-culture-storefront.css`
- `assets/crossover-culture-storefront.js`
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

## 2. Assign Product Templates

- Custom team uniform products: `product.custom-team-uniform`
- Custom shooting shirt products: `product.custom-shooting-shirt`
- Enlisted 1/4 Zip and Enlisted Crew: `product.custom-travel-gear`
- Unisex custom gear products: `product.custom-unisex-travel-gear`
- Enlisted Polo: `product.custom-polo`
- Practice shorts: `product.custom-practice-shorts`
- Origin Fleece Hoodie: `product.custom-origin-fleece-hoodie`
- Origin Fleece Jogger: `product.custom-origin-fleece-jogger`
- Elevate Fleece Hoodie: `product.custom-elevate-fleece-hoodie`
- Elevate Fleece Jogger: `product.custom-elevate-fleece-jogger`
- Varsity socks: `product.custom-varsity-sock`

## 3. Product Page QA

Run this on desktop and mobile for every custom product template.

- Confirm the liquid-glass panels, controls, color areas, summary blocks, and CTAs match the socks/fleece style.
- Confirm the gallery thumbnails swap the main image.
- Confirm color wheel and HEX input update visible summaries and hidden line-item properties.
- Confirm reset color returns to the default colors.
- Confirm size inputs update total pieces or pairs.
- Confirm size breakdown text is saved in the order summary.
- Try submitting empty; required fields should block submission.
- Upload `.jpg` or another invalid file; the page should reject it.
- Upload `.svg`, `.ai`, or `.eps`; filename should show in the form summary.
- Add to cart after valid entries.

## 4. Cart, Checkout, Admin QA

After each valid add-to-cart test, confirm the cart line item displays the customer-facing properties:

- Product style or garment type
- Colors
- Size breakdown or roster
- Total pieces, total pairs, or player count
- Calculated order total
- Order notes, when entered
- Uploaded artwork/logo file link

Continue into checkout and confirm the line-item properties remain visible. In Shopify Admin, open the draft/test order or abandoned checkout record and confirm the same properties are present.

## 5. Storefront Shell QA

- Homepage hero image renders without dark/blank/blurred failure states.
- Hero CTA routes to the custom uniform product.
- Collection cards route to configured collections or override URLs.
- Header desktop nav exposes Uniforms, Shooting, Travel, Apparel, Accessories, Process, and About.
- Mobile drawer opens, closes, and lists all custom order routes.
- Footer links include every custom order route.
- Collection pages route to the right custom order path for shooting, travel, fleece, practice shorts, accessories/socks, and uniforms.
- Standard product pages recommend the right custom route based on product title.

## 6. Final Prelaunch Checks

- Shopify variants for flat-price templates match the expected configured unit price.
- Cart theme renders `item.properties` and uploaded file links.
- No custom order template has recommended color swatches; color selection is wheel/HEX or the varsity sock color-code selector.
- Every custom order template requires one vector upload.
- No text overlaps on mobile widths.
