# SARTO — Antigravity uchun UI/UX dizaynni yaxshilash bo‘yicha texnik topshiriq

> **Loyiha:** SARTO — erkaklar kiyimlari uchun premium e-commerce do‘koni  
> **Hujjat turi:** Faqat UI/UX (frontend presentation layer)  
> **Maqsad:** Mavjud sayt dizaynini professional, tushunarli, qulay, universal va barcha ekranlarga mos holatga keltirish.

---

## ANTIGRAVITY UCHUN ASOSIY PROMPT

```text
You are a Senior Product Designer, UI/UX Specialist, and Frontend UI Engineer.
Your task is to audit and improve the EXISTING SARTO website interface.

PROJECT CONTEXT
SARTO is a premium menswear e-commerce brand for the Uzbekistan market.
The store sells modern men's clothing such as T-shirts, shirts, trousers,
jackets, knitwear, and footwear.
The brand should feel premium, elegant, trustworthy, modern, and welcoming.
However, usability must always be more important than decorative luxury.
The interface must be understandable for people of different adult age groups,
including users who are not experienced with online shopping or technology.

STRICT SCOPE — UI/UX ONLY
This task is exclusively about user interface and user experience.
You may inspect the repository and edit presentation-layer code such as:
- page layouts and visual composition;
- reusable UI components;
- navigation and menus;
- typography, colors, spacing, sizing, and visual hierarchy;
- buttons, links, forms, inputs, selectors, cards, dialogs, and feedback states;
- responsive behavior for mobile, tablet, laptop, and desktop;
- CSS, Tailwind classes, visual assets, and UI-specific animations;
- accessibility and interaction details.

DO NOT:
- implement or modify backend functionality;
- change database schema, migrations, Supabase configuration, RLS policies,
  authentication logic, API routes, server actions, payment integrations,
  order processing, inventory logic, or business rules;
- replace real data with invented production data;
- remove existing working features or routes;
- rewrite the application architecture or change the technology stack;
- install new dependencies unless absolutely required for a visual-only task;
- expose, modify, or create secrets and environment variables;
- claim that a control works when the existing application has no working logic for it.

Preserve all existing application behavior. Connect redesigned controls to the
existing handlers and state where they already exist. If a visual control has no
implemented behavior, keep it clearly non-functional or report it as a UI dependency;
do not fabricate a backend implementation.

WORK PROCESS
1. Inspect the existing project structure and identify the current framework,
   styling approach, routes, shared components, and existing UI behavior.
2. Review every existing customer-facing page and the admin interface, if present.
3. Identify UI/UX problems: inconsistent spacing, weak hierarchy, hard-to-read text,
   confusing navigation, poor mobile layouts, unclear buttons, inaccessible controls,
   inconsistent components, excessive decoration, and missing interface states.
4. Before editing, write a short UI audit with the highest-priority issues.
5. Create a consistent SARTO design system and apply it across the existing pages.
6. Improve the interfaces in small, coherent steps. Reuse components and avoid
   unnecessary duplication.
7. Test the visual result at the viewport widths listed below.
8. Check that existing interactions and routes have not regressed.
9. Finish with a concise report of the UI files changed, improvements made,
   responsive checks, accessibility checks, and any items that require backend work.

Do not stop after producing recommendations or mockups. Implement the approved
UI/UX improvements in the existing project, while respecting the strict UI-only scope.

BRAND AND VISUAL DIRECTION
Brand: SARTO
Positioning: Premium modern menswear
Market: Uzbekistan
Interface language: Uzbek (Latin script)
Currency display: Uzbek so‘mi (UZS), using readable local formatting

Visual personality:
- refined and minimal;
- premium but approachable;
- confident, masculine, contemporary;
- editorial fashion photography;
- clear product information and easy shopping flows;
- spacious layouts without wasting screen space.

Color palette:
- Primary black: #111111
- Charcoal: #292929
- Ivory background: #EAE6DF
- Taupe accent: #B8A995
- White: #FFFFFF
- Supporting gray tones may be introduced for borders, muted text, and surfaces.

Use the palette consistently. Do not use low-contrast gray text on gray backgrounds.
Reserve accent colors for meaningful emphasis. Avoid excessive gradients, glow effects,
large decorative shadows, glassmorphism, and distracting animations.

Typography:
- Use a refined serif for selected editorial headlines only.
- Use a highly readable sans-serif for navigation, body text, forms, prices,
  product details, and all functional UI.
- Keep body text comfortably readable; use approximately 16px as the default
  desktop/mobile body size where practical.
- Establish clear heading levels, line heights, weights, and text lengths.
- Avoid tiny labels and long all-uppercase paragraphs.

DESIGN SYSTEM REQUIREMENTS
Create or standardize reusable tokens for:
- brand colors and semantic colors;
- typography scale and line heights;
- spacing scale;
- page/container widths;
- grid and column gaps;
- border radii and border colors;
- shadows and elevation (use sparingly);
- buttons and interactive states;
- form controls;
- breakpoints and responsive behavior.

Create consistent reusable components where suitable:
- announcement bar;
- desktop header and mobile navigation;
- logo area and navigation links;
- search field and search overlay/page;
- product card and product grid;
- category tile;
- price display and sale label;
- size and color selectors;
- quantity selector;
- filter panel and sort control;
- breadcrumbs;
- primary, secondary, and text buttons;
- input, select, checkbox, radio, and textarea;
- modal, drawer, toast, tooltip, and confirmation dialog;
- empty, loading, error, and success states;
- footer and newsletter form.

Do not create a different visual style for every page. All pages must look like
parts of one coherent SARTO product.

UNIVERSAL USABILITY AND ACCESSIBILITY
Design for a broad adult audience, not only young fashion enthusiasts.
The user must be able to understand the interface without instructions.

Apply WCAG 2.2 AA principles where applicable:
- maintain at least 4.5:1 contrast for normal text and 3:1 for large text;
- provide visible keyboard focus indicators;
- ensure keyboard navigation for menus, dialogs, forms, and controls;
- use semantic headings, landmarks, labels, and buttons;
- provide accessible names for icon-only controls;
- do not communicate status using color alone;
- associate form errors with their fields and explain how to fix them;
- respect reduced-motion preferences;
- use meaningful alt text for informative images and empty alt for decorative images;
- ensure touch targets are preferably at least 44x44 CSS pixels;
- do not rely on hover alone to reveal important actions;
- keep content usable when text is zoomed and on narrow screens.

Use clear Uzbek labels. Prefer familiar wording such as:
- “Katalog”
- “Qidirish”
- “Sevimlilar”
- “Savatcha”
- “Sotib olish”
- “Savatchaga qo‘shish”
- “Buyurtmani rasmiylashtirish”
- “Yetkazib berish”
- “Buyurtmalarim”
- “Profilim”

Avoid vague labels such as “OK”, “Go”, or icon-only actions where a clear label is needed.

RESPONSIVE DESIGN REQUIREMENTS
Use a mobile-first approach. The interface must work without horizontal scrolling
at these viewport widths:
- 320px and 360px mobile;
- 390px and 430px mobile;
- 768px tablet;
- 1024px small laptop/tablet landscape;
- 1280px desktop;
- 1440px and wider desktop.

Responsive behavior:
- use a compact, clear mobile header;
- provide an easy-to-open mobile navigation menu;
- keep key actions reachable on mobile;
- convert multi-column product grids appropriately;
- make filter controls usable on small screens, for example with a filter drawer;
- ensure product images and product information remain readable;
- stack checkout forms and summaries logically on mobile;
- avoid tiny buttons, clipped text, overlapping elements, and horizontal overflow;
- keep desktop content centered with a sensible maximum width.

PAGE-BY-PAGE UI/UX REQUIREMENTS
Improve all existing pages in the repository. If one of these routes already exists,
refine it rather than creating a duplicate. Do not implement backend-dependent routes
or business logic as part of this task.

1. HOMEPAGE
- Create a clear announcement bar with concise Uzbek information.
- Build a consistent header with SARTO logo, catalog navigation, search, account,
  wishlist, and cart access.
- Design an editorial hero with a strong menswear image, short headline,
  supporting text, and one clear primary CTA.
- Avoid putting too much text on top of the hero image.
- Show New Arrivals, category navigation, featured collection, and best sellers.
- Use consistent product cards with image, product name, price, and relevant actions.
- Add a concise brand-story section and a clean footer.
- Prioritize product discovery and a clear path to shopping.

2. SHOP / PRODUCT LISTING
- Show page title, breadcrumbs, product count if available, filters, and sorting.
- Provide understandable filters for category, size, color, and price when supported.
- On mobile, show filters in a drawer or full-screen panel with clear Apply and Reset actions.
- Make active filters visible and easy to remove.
- Keep product cards consistent and make the entire shopping grid responsive.
- Provide clear empty-results and loading states.

3. CATEGORY PAGE
- Clearly identify the selected category.
- Use an appropriate category introduction or banner without pushing products too far down.
- Reuse the same filters, sorting, and product-card components as the Shop page.

4. PRODUCT DETAILS
- Use a high-quality image gallery with understandable thumbnails and mobile behavior.
- Make product name, price, availability, color, and size easy to scan.
- Display size selection as clear selectable controls, not tiny text links.
- Make the size guide easy to find and usable with keyboard and touch.
- Make quantity and primary add-to-cart action visually clear.
- Show delivery/returns information, product description, and related products
  in a structured hierarchy.
- Provide visible selected, unavailable, loading, success, and error states
  where the existing application supports them.
- Do not hide essential product information behind unnecessary interactions.

5. SEARCH
- Make search easy to find in desktop and mobile navigation.
- Provide a clear input label, search action, and understandable empty state.
- Keep result cards consistent with Shop.
- Do not invent live search behavior if it does not exist in the current application.

6. WISHLIST
- Display saved products in a clean, consistent grid.
- Provide clear remove and product-view actions where existing handlers are available.
- Design a helpful empty state with a CTA back to the catalog.

7. CART
- Make product thumbnail, name, selected size/color, quantity, price, and remove action clear.
- Provide a readable order subtotal and next-step CTA.
- Keep the summary visible and logically placed on desktop; stack it on mobile.
- Design empty-cart, updating, and error states where relevant.

8. CHECKOUT
- Use a calm, step-by-step layout that reduces cognitive load.
- Group fields logically: customer details, delivery address, delivery method,
  payment selection, and order summary.
- Use clear Uzbek field labels, examples, required indicators, and inline validation.
- Ensure mobile forms are easy to fill and do not require horizontal scrolling.
- Make the final order action clear without using misleading labels.
- Do not add or modify payment processing or order-submission backend logic.

9. LOGIN / REGISTRATION
- Use simple, readable forms with clear labels and input focus states.
- Show password visibility control accessibly if already supported.
- Provide clear validation and error presentation.
- Do not change authentication implementation.

10. CUSTOMER ACCOUNT
- Organize profile, addresses, and order history into clear navigation sections.
- Use readable order status labels and consistent status indicators.
- Make account navigation usable on mobile.

11. ABOUT / CONTACT / FAQ
- Use editorial storytelling for About while keeping text readable.
- Present contact information and forms with clear labels.
- Organize FAQ content so users can scan and understand answers quickly.
- Do not invent contact details, policies, or business claims.

12. ADMIN INTERFACE (IF ALREADY PRESENT)
- Use a functional, information-first dashboard visual hierarchy.
- Make tables readable, responsive, and easy to scan.
- Use clear filters, search, pagination, status labels, and action menus where existing
  functionality supports them.
- On small screens, avoid squeezing desktop tables; use responsive alternatives
  such as stacked rows or controlled horizontal scrolling where appropriate.
- Keep the admin visual language consistent with SARTO while prioritizing efficiency.
- Do not change permissions, roles, data access, or admin business logic.

INTERACTION AND FEEDBACK STATES
For every existing interactive component, review and improve:
- default;
- hover (where relevant);
- focus-visible;
- active/pressed;
- selected;
- disabled;
- loading;
- success;
- error;
- empty state.

Use restrained transitions. Animations should clarify state changes and provide
polish, not slow down shopping. Respect prefers-reduced-motion. Avoid scroll-jacking,
autoplaying distracting motion, and unnecessary parallax.

CONTENT AND IMAGERY
- All visible interface text must be natural Uzbek Latin.
- Keep wording concise and consistent across pages.
- Use realistic, premium men's fashion imagery with a consistent photographic direction.
- Product images should have consistent aspect ratios and predictable cropping.
- Do not stretch images or use unrelated placeholder images as final product photography.
- If actual product assets are missing, use clearly identifiable temporary placeholders
  and report them; do not invent actual products, prices, stock, or customer reviews.

QUALITY CHECKLIST / ACCEPTANCE CRITERIA
The task is complete only when:
1. Existing routes remain available and no existing feature has been intentionally removed.
2. The interface uses one consistent SARTO design system.
3. Homepage, listing, product, cart, checkout, account, content, and admin interfaces
   (where present) follow a coherent visual hierarchy.
4. All visible UI copy is Uzbek Latin and understandable.
5. No horizontal overflow occurs at the required viewport widths.
6. Text, controls, and forms are readable and usable on mobile and desktop.
7. Keyboard focus is visible and interactive controls have accessible names.
8. Color contrast and touch-target sizing follow the accessibility requirements above.
9. Empty, loading, error, and success states are designed wherever applicable.
10. Existing interactions still work; no backend or business logic has been modified.
11. No console errors or obvious visual regressions are introduced by the UI changes.
12. The final result feels premium, trustworthy, simple, and welcoming.

FINAL DELIVERABLES
At completion, provide:
- a short audit summary of the main UI/UX issues found;
- a list of pages and components visually improved;
- a list of design-system tokens/components created or standardized;
- responsive viewport checks performed;
- accessibility checks performed;
- any visual states or assets still missing;
- any requested improvements that were blocked because they require backend work.

Do not report backend work as completed. Clearly separate UI improvements from
backend dependencies.

Begin by inspecting the existing project. Then perform the UI audit and implement
the improvements without changing backend functionality.
```

---

## Antigravity'da ishlatish bo‘yicha ko‘rsatma

1. SARTO loyihasining mavjud kodini Antigravity'da och.
2. Agar Stitch AI dizayni mavjud bo‘lsa, uni reference sifatida biriktir.
3. Yuqoridagi promptni Antigravity'ga yubor.
4. Agent avval mavjud sahifalarni tekshirsin va UI audit tayyorlasin.
5. Keyin faqat UI qatlamidagi o‘zgarishlarni bosqichma-bosqich amalga oshirsin.
6. Yakunda barcha asosiy sahifalarni desktop va mobile o‘lchamlarida tekshirtir.

## Scope nazorati

Ushbu topshiriq doirasida backend, database, authentication, API, payment, order logic,
inventory va business logic o‘zgartirilmasligi shart. UI yaxshilanishi mavjud funksiyalarni
buzmasligi kerak. Backend talab qiladigan muammo aniqlansa, uni mustaqil ravishda
implement qilmasdan, alohida dependency sifatida hisobotga yozish kerak.
