# FormaTiles Website - V1 Specification

## 1. Goal

Build a modern, premium, responsive website for **FormaTiles**, a building-material business specializing in:

- Ceramic
- Granite
- Wall Panel
- SPC Flooring

The website should function as a digital product catalog with useful calculators, WhatsApp lead generation, and a simple admin/backend system.

The system should be **free to operate initially**, using free-tier services where practical, while keeping the architecture easy to scale later.

Do not over-engineer V1.

---

## 2. Main Customer Features

### Homepage
- Premium architectural/design-focused appearance
- Company introduction
- Main product categories
- Featured products
- Calculator CTA
- WhatsApp CTA
- Company/contact information

### Product Catalog
Customers can:
- Browse categories
- Search products
- Filter products
- View product details
- View product photos
- See brand, size and relevant specifications
- See an approximate/starting price or price range

Customers should NOT see the exact final selling price.

### Product Detail
Show:
- Product name
- Category
- Brand
- Size
- Photos
- Relevant specifications
- Price range / starting price
- "Ask via WhatsApp" button

The WhatsApp message should automatically include the selected product.

---

## 3. Calculator / Simulation

Create useful calculators for building-material customers.

Initial examples:
- Floor/wall area calculation
- Required tile quantity
- Estimated number of boxes
- Estimated material cost
- SPC flooring calculation

The calculation system should be modular so more calculators can be added later.

Calculations are estimates only and should clearly state that final quantity and pricing should be confirmed with FormaTiles.

---

## 4. WhatsApp

V1 should use a simple **Click-to-WhatsApp** approach.

No paid WhatsApp API is required initially.

Generate useful pre-filled messages such as:

"Hi FormaTiles, I am interested in [Product Name]. I would like to ask about the price and availability."

Calculator results should also be able to generate a WhatsApp inquiry.

The architecture should leave room for a real WhatsApp API/chatbot in the future.

---

## 5. Admin / Backend

Create a protected admin dashboard.

Admins/employees should be able to:

- Add products
- Edit products
- Remove/archive products
- Upload product photos
- Manage categories
- Manage brands
- Update price ranges
- Update product specifications
- Feature/unfeature products
- Manage basic website content
- View customer inquiries/orders/PO records

The public website should automatically reflect backend changes.

No stock management is required for V1.

---

## 6. Product Data / Bulk Import

The system should support importing products from Excel/CSV/Google Sheets where practical.

Do NOT require manually entering thousands of products.

Product codes/SKUs are not mandatory for V1 unless the implementation benefits from having an internal identifier.

Every product should still have a unique database ID internally.

Design the import system so existing product data can be migrated later.

---

## 7. Basic PO / Inquiry

Customers do not need a complicated checkout.

The main flow should be:

Browse Product
→ Calculate/Select Requirement
→ Request Quote
→ WhatsApp

The backend may store inquiries/PO information for internal tracking.

Keep this simple for V1.

---

## 8. Recommended Technology

Use a free-tier-friendly modern stack.

Preferred direction:

- Frontend: Next.js / React
- Database + backend: Supabase
- Hosting: Vercel
- Storage: Supabase Storage
- Authentication: Supabase Auth

The agent may change the stack if there is a clearly better free and maintainable solution.

Priority:

1. $0 initial operating cost
2. Simple maintenance
3. Good performance
4. Good UX
5. Easy future scaling

Avoid unnecessary paid services.

---

## 9. Design

The website should feel like a **modern architectural material showroom**, not a traditional hardware-store website.

Desired characteristics:

- Premium
- Minimal
- Modern
- Clean
- Architectural
- Mobile-friendly
- Strong product photography
- Good typography
- Subtle animations
- Clear WhatsApp CTAs

Use the brand/logo assets provided by FormaTiles.

---

## 10. Future Scalability

Do not build these unless necessary for V1, but keep the architecture capable of adding:

- Inventory/stock management
- Supplier management
- Customer accounts
- Sales management
- Advanced PO system
- Product SKU/code
- WhatsApp API chatbot
- CRM
- Payment integration
- Accounting/ERP modules
- Analytics/dashboard
- Multiple employee permission levels

---

## 11. Important Development Principle

Build a **working V1**, not a theoretical enterprise system.

The implementation should be:
- Clean
- Modular
- Secure
- Easy to understand
- Easy to modify
- Free/low-cost initially
- Scalable when the business grows

The AI agent has freedom to improve the architecture, UI, database structure, and implementation when doing so improves the product while remaining aligned with this specification.

Prioritize working functionality and simplicity over unnecessary features.