# Style Vibe E-Commerce

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Home/landing page with hero banner and navigation to categories
- Men's Collection page: Shirts, Pants, Panjabi, Pajamas, T-shirts, Belts, Shoes
- Women's Collection page: Sarees, Three-piece Suits, Burqas & Abayas, Tops & Tunics, and trending items
- Cosmetics page: Skincare, Makeup, Beauty products
- Product card component: product image, strikethrough regular price, highlighted offer price, "Order Now" CTA
- Order/Checkout page with delivery charge banner (red), form fields (Name, Mobile, District dropdown, Thana, Full Address), and auto-calculated order summary (subtotal + delivery = grand total)
- Delivery logic: Dhaka district = 70 BDT, outside Dhaka = 130 BDT
- Floating customer support button
- Backend: store orders with all form fields and product info

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Products actor (get products by category), Orders actor (place order with delivery calculation)
2. Frontend: App router with pages - Home, Men, Women, Cosmetics, Order form
3. Product cards with discount pricing display
4. Order form with district-based delivery charge logic
5. Floating support chat button
6. Sample product data for all categories
