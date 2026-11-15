# SARTO — Project Technical Specification (TZ)

> **Hujjat turi:** Product Requirements Document (PRD) + Software Requirements Specification (SRS) + modulma-modul texnik topshiriq  
> **Loyiha:** SARTO — erkaklar kiyimlari uchun premium e-commerce platforma  
> **Versiya:** 1.0  
> **Holat:** Development uchun boshlang‘ich spetsifikatsiya  
> **Asosiy til:** O‘zbek tili (Latin)  
> **Bozor:** O‘zbekiston  
> **Valyuta:** UZS (so‘m)

---

## Hujjatdan foydalanish tartibi

Ushbu hujjat loyiha uchun yagona talablar manbasi hisoblanadi. UI/UX dizayner, frontend developer, backend developer, database engineer, QA va deployment uchun mas’ul mutaxassislar tegishli bo‘limlarni bajaradi.

- Har bir modul alohida TZ sifatida yozilgan. Modulni mustaqil task yoki development sprint sifatida rejalashtirish mumkin.
- **MUST** — majburiy talab; **SHOULD** — kuchli tavsiya; **MAY** — ixtiyoriy imkoniyat.
- Hujjatda biznes tomonidan hali tasdiqlanmagan joylar **[TASDIQLASH KERAK]** deb belgilangan. Ular kod ichida taxminiy qiymat sifatida qotirib qo‘yilmasin; konfiguratsiya yoki admin boshqaruviga chiqarilsin.
- Barcha pul qiymatlari UZSda, butun son ko‘rinishida saqlanadi. Masalan, `250000` = 250 000 so‘m.
- Bu hujjat dizayn rasmlari yoki to‘lov provayderining maxfiy API ma’lumotlarini almashtirmaydi. Bunday materiallar tegishli bosqichda alohida taqdim etiladi.

## Mundarija

- [1. Loyiha haqida](#1-loyiha-haqida)
- [2. Stakeholderlar, rollar va ruxsatlar](#2-stakeholderlar-rollar-va-ruxsatlar)
- [3. Texnologik yechim va arxitektura](#3-texnologik-yechim-va-arxitektura)
- [4. Sayt xaritasi va routing](#4-sayt-xaritasi-va-routing)
- [5. UI/UX uchun alohida TZ](#5-uiux-uchun-alohida-tz)
- [6. Frontend development uchun alohida TZ](#6-frontend-development-uchun-alohida-tz)
- [7. Backend uchun alohida TZ](#7-backend-uchun-alohida-tz)
- [8. Database uchun alohida TZ](#8-database-uchun-alohida-tz)
- [9. API endpoint spetsifikatsiyasi](#9-api-endpoint-spetsifikatsiyasi)
- [10. Modulma-modul alohida development TZ](#10-modulma-modul-alohida-development-tz)
- [11. Fayl strukturasi](#11-fayl-strukturasi)
- [12. Security va privacy TZ](#12-security-va-privacy-tz)
- [13. Non-functional requirements](#13-non-functional-requirements)
- [14. QA va test uchun alohida TZ](#14-qa-va-test-uchun-alohida-tz)
- [15. Deployment va DevOps uchun alohida TZ](#15-deployment-va-devops-uchun-alohida-tz)
- [16. Project management: bosqichlar va task breakdown](#16-project-management-bosqichlar-va-task-breakdown)
- [17. Definition of Ready va Definition of Done](#17-definition-of-ready-va-definition-of-done)
- [18. Production launch checklist](#18-production-launch-checklist)
- [19. Risklar va kamaytirish choralari](#19-risklar-va-kamaytirish-choralari)
- [20. Ochiq qarorlar](#20-ochiq-qarorlar--loyiha-egasi-tasdiqlashi-kerak)
- [21. Stitch AI UI generation prompt](#21-stitch-ai-uchun-ui-generation-prompt)
- [22. Yakuniy texnik qaror](#22-yakuniy-texnik-qaror)

---

## 1. Loyiha haqida

### 1.1. Loyiha maqsadi

SARTO — O‘zbekiston bozoridagi erkaklar uchun kiyim va aksessuarlarni onlayn namoyish qilish, qidirish, tanlash, savatchaga qo‘shish va buyurtma qilish imkonini beruvchi premium internet-do‘kon.

Platforma faqat vizual katalog bo‘lib qolmasligi kerak. U haqiqiy buyurtma jarayonini, mahsulot qoldig‘ini, mijozlar va buyurtmalar boshqaruvini ham ta’minlashi kerak.

### 1.2. Brend va auditoriya

| Parametr | Talab |
|---|---|
| Brend nomi | SARTO (ishchi nom; trademark va domen tekshiriladi) |
| Yo‘nalish | Premium menswear, modern casual, smart casual |
| Auditoriya | Asosan 18–35 yoshdagi erkaklar |
| Bozor | O‘zbekiston |
| UI tili | O‘zbekcha, Latin yozuvi |
| Valyuta | UZS |
| Vizual kayfiyat | Minimal, editorial, elegant, premium |
| Asosiy va’da | Sifatli mahsulot, sodda xarid, ishonchli yetkazib berish |

### 1.3. Brend dizayn yo‘nalishi

**Ranglar:**

| Token | HEX | Ishlatilishi |
|---|---|---|
| `black` | `#111111` | Asosiy matn, asosiy CTA, header/footer |
| `charcoal` | `#292929` | Ikkinchi darajali dark surface |
| `ivory` | `#EAE6DF` | Fon va editorial bloklar |
| `taupe` | `#B8A995` | Accent, dekorativ elementlar |
| `white` | `#FFFFFF` | Asosiy surface va kontrast |
| `muted` | `#77736D` | Ikkilamchi matn |
| `border` | `#E5E1DA` | Ajratuvchi chiziqlar |

**Tipografiya:**
- Sarlavhalar: `Playfair Display` yoki `Cormorant Garamond`.
- UI va asosiy matn: `Inter` yoki `Manrope`.
- Logo: custom uppercase wordmark; logotip rastr matn bilan almashtirilmasin.
- Yakuniy font tanlovi dizayn bosqichida tasdiqlanadi.

**Vizual qoidalar:**
- Mahsulot va model fotosuratlari katta, sifatli va bir xil art-direction uslubida bo‘lishi kerak.
- Oq/bej bo‘sh joylardan faol foydalanish.
- Yupqa border, kam sonli ikonka, aniq tipografik ierarxiya.
- Haddan tashqari gradient, neon rang, kuchli drop-shadow va marketplace ko‘rinishidan qochish.
- Animatsiyalar mazmunni qo‘llab-quvvatlashi kerak; sahifani sekinlashtirmasligi kerak.

### 1.4. MVP doirasi

**MVP tarkibiga kiradi:**
1. Homepage.
2. Shop / barcha mahsulotlar.
3. Kategoriya sahifasi.
4. Mahsulot tafsilotlari.
5. Qidiruv, filter va sort.
6. Wishlist.
7. Cart.
8. Guest checkout va ro‘yxatdan o‘tgan foydalanuvchi checkout’i.
9. Buyurtmani yaratish va statusini kuzatish.
10. Login / register / account.
11. Admin dashboard.
12. Mahsulot, kategoriya, variant, ombor va buyurtma boshqaruvi.
13. Kontent sahifalari: About, Contact, FAQ, yetkazib berish/qaytarish siyosati.
14. SEO, analytics uchun tayyorgarlik, responsive dizayn.
15. Dastlabki to‘lov usuli sifatida yetkazib berganda naqd/karta (COD) yoki admin tasdiqlaydigan to‘lov usuli.

**Keyingi versiyaga qoldirilishi mumkin:**
- Click/Payme yoki boshqa online payment integratsiyasi — merchant shartnomasi va API hujjatlari olingandan keyin.
- SMS marketing, bonus/loyalty, promo-code kampaniyalarining murakkab qoidalari.
- Ko‘p tillilik (rus/ingliz).
- Mobil ilova.
- Tavsiya algoritmi va AI personalizatsiya.
- Bir nechta ombor yoki marketplace integratsiyasi.

### 1.5. MVP biznes taxminlari — tasdiqlanishi kerak

| Masala | MVP uchun boshlang‘ich qaror | Status |
|---|---|---|
| Checkout | Guest checkout ruxsat etiladi; account ixtiyoriy | [TASDIQLASH KERAK] |
| Mijoz kontakti | Telefon raqami majburiy, email ixtiyoriy | [TASDIQLASH KERAK] |
| Auth | Email/password yoki tasdiqlangan telefon OTP provayderi | [TASDIQLASH KERAK] |
| To‘lov | MVPda COD; online payment keyingi integratsiya | [TASDIQLASH KERAK] |
| Yetkazish | Toshkent va boshqa hududlar uchun admin boshqaradigan tarif | [TASDIQLASH KERAK] |
| Mahsulot razmeri | S, M, L, XL, XXL; har mahsulotda boshqacha bo‘lishi mumkin | Konfiguratsiya |
| Qaytarish | Siyosat matni biznes tomonidan tasdiqlanadi | [TASDIQLASH KERAK] |
| Bepul yetkazish chegarasi | Admin sozlamasida boshqariladi | [TASDIQLASH KERAK] |
| Domen | Masalan, `sarto.uz`; mavjudligi tekshiriladi | [TASDIQLASH KERAK] |

---

## 2. Stakeholderlar, rollar va ruxsatlar

### 2.1. Foydalanuvchi rollari

| Rol | Tavsif | Ruxsatlar |
|---|---|---|
| Guest | Tizimga kirmagan tashrifchi | Katalog ko‘rish, qidirish, filter, guest cart, guest checkout |
| Customer | Ro‘yxatdan o‘tgan mijoz | Guest imkoniyatlari + profil, buyurtmalar tarixi, saqlangan manzillar, wishlist sync |
| Admin | Do‘kon operatori | Mahsulot, variant, qoldiq, kategoriya, buyurtma, mijoz va kontent boshqaruvi |
| Super Admin | Platforma egasi/texnik rahbar | Adminlar, rollar va global sozlamalarni boshqarish |

### 2.2. Ruxsatlar matritsasi

| Amal | Guest | Customer | Admin | Super Admin |
|---|---:|---:|---:|---:|
| Mahsulotlarni ko‘rish | Ha | Ha | Ha | Ha |
| Cart boshqarish | Ha | Ha | Ha | Ha |
| Checkout | Ha | Ha | Ixtiyoriy | Ixtiyoriy |
| O‘z buyurtmalarini ko‘rish | Yo‘q | Ha | Ha | Ha |
| Barcha buyurtmalarni ko‘rish | Yo‘q | Yo‘q | Ha | Ha |
| Mahsulot CRUD | Yo‘q | Yo‘q | Ha | Ha |
| Ombor qoldig‘i | Yo‘q | Yo‘q | Ha | Ha |
| Admin yaratish/rol berish | Yo‘q | Yo‘q | Yo‘q | Ha |
| Global sozlamalar | Yo‘q | Yo‘q | Cheklangan | Ha |

**Xavfsizlik qoidasi:** foydalanuvchi o‘z tokeni, request body yoki frontend orqali `admin` rolini o‘zi bera olmasligi shart. Admin huquqi faqat ishonchli server-side jarayon yoki super admin orqali o‘zgartiriladi.

---

## 3. Texnologik yechim va arxitektura

### 3.1. Tavsiya etilgan stack

| Qatlam | Texnologiya | Vazifasi |
|---|---|---|
| Web framework | Next.js App Router | Routing, SSR/SEO, server components, route handlers |
| Language | TypeScript | Type safety |
| UI | React + Tailwind CSS | Komponentlar va responsive styling |
| Animation | Framer Motion | Zarur micro-interaction va transitions |
| Icons | Lucide React | UI ikonkalari |
| Backend/BaaS | Supabase | PostgreSQL, Auth, Storage, RLS |
| Database | PostgreSQL | Asosiy ma’lumotlar ombori |
| Validation | Zod | Request va form validation |
| Forms | React Hook Form + Zod | Murakkab formalar |
| Data fetching | Server Components + TanStack Query (zarur joyda) | Server data va client cache |
| Testing | Vitest, React Testing Library, Playwright | Unit, component, E2E test |
| Hosting | Vercel yoki mos Node hosting | Production deployment |
| Monitoring | Sentry yoki mos monitoring | Runtime xatolarini kuzatish |

**Arxitektura qarori:** MVP uchun modular monolith. Alohida microservice’lar yaratish shart emas. Barcha biznes qoidalari `features`/`server` qatlamlarida modullarga ajratiladi.

### 3.2. Yuqori darajadagi ma’lumot oqimi

```text
Browser / Mobile Web
        |
        v
Next.js UI (App Router)
        |
        +---- Server Components (read-only data)
        |
        +---- Client Components (interaction/state)
        |
        v
Next.js Server Layer / Route Handlers / Server Actions
        |
        +---- Zod validation
        +---- Authentication & authorization
        +---- Business services
        |
        +---------- Supabase Auth
        +---------- PostgreSQL + RLS
        +---------- Supabase Storage
        +---------- Payment Provider (future/optional)
        +---------- Delivery Provider (future/optional)
```

### 3.3. Arxitektura qoidalari

1. Secret key va service-role key hech qachon browser bundle’ga chiqmasin.
2. Mahsulot katalogining ommaviy o‘qish qismi public read policy bilan ishlashi mumkin; yozish amallari faqat server/admin orqali.
3. Narx, chegirma, shipping va jami summa frontenddan kelgan qiymat sifatida ishonilmasin. Server DB’dagi qiymatlardan qayta hisoblasin.
4. Buyurtma yaratish va inventory kamaytirish atomic transaction/RPC orqali bajarilsin.
5. To‘lov webhook’i imzo tekshiruvi va idempotency bilan ishlasin.
6. Har bir admin endpoint server-side role check’dan o‘tsin.
7. Business logic React komponentlar ichiga yozilmasin.
8. Database query’lari modullar bo‘yicha repository/service qatlamlarida jamlansin.
9. Sana-vaqt DB’da UTC `timestamptz` ko‘rinishida saqlansin; UI’da `Asia/Tashkent` bo‘yicha ko‘rsatilsin.
10. Mahsulot rasmi uchun bir nechta format/size variantlari va optimizatsiya qo‘llansin.

---

## 4. Sayt xaritasi va routing

### 4.1. Public route’lar

| URL | Sahifa | Izoh |
|---|---|---|
| `/` | Home | Landing va featured kolleksiyalar |
| `/shop` | Shop | Barcha mahsulotlar |
| `/category/[slug]` | Category | Kategoriya bo‘yicha katalog |
| `/product/[slug]` | Product details | Mahsulot tafsilotlari |
| `/search` | Search | Qidiruv natijalari |
| `/wishlist` | Wishlist | Sevimli mahsulotlar |
| `/cart` | Cart | Savatcha |
| `/checkout` | Checkout | Buyurtma rasmiylashtirish |
| `/order/success/[orderNumber]` | Order confirmation | Buyurtma qabul qilingan sahifa |
| `/track-order` | Track order | Buyurtmani telefon/raqam bilan kuzatish; siyosatga bog‘liq |
| `/about` | About | Brend haqida |
| `/contact` | Contact | Aloqa formasi va ma’lumotlar |
| `/faq` | FAQ | Ko‘p so‘raladigan savollar |
| `/delivery` | Delivery policy | Yetkazib berish qoidalari |
| `/returns` | Returns policy | Qaytarish/almashtirish qoidalari |
| `/privacy` | Privacy | Maxfiylik siyosati |
| `/terms` | Terms | Foydalanish shartlari |

### 4.2. Auth route’lar

| URL | Sahifa |
|---|---|
| `/login` | Kirish |
| `/register` | Ro‘yxatdan o‘tish |
| `/forgot-password` | Parolni tiklash |
| `/auth/callback` | Auth callback |

### 4.3. Customer account route’lari

| URL | Sahifa |
|---|---|
| `/account` | Account overview |
| `/account/profile` | Profil |
| `/account/orders` | Buyurtmalar tarixi |
| `/account/orders/[id]` | Buyurtma tafsiloti |
| `/account/addresses` | Manzillar |

### 4.4. Admin route’lari

| URL | Sahifa |
|---|---|
| `/admin` | Dashboard |
| `/admin/products` | Mahsulotlar ro‘yxati |
| `/admin/products/new` | Mahsulot yaratish |
| `/admin/products/[id]` | Mahsulotni tahrirlash |
| `/admin/categories` | Kategoriyalar |
| `/admin/inventory` | Ombor/qoldiq |
| `/admin/orders` | Buyurtmalar |
| `/admin/orders/[id]` | Buyurtma tafsiloti |
| `/admin/customers` | Mijozlar |
| `/admin/content` | Homepage/banner/static content |
| `/admin/settings` | Do‘kon sozlamalari |
| `/admin/admin-users` | Adminlar — faqat super admin |

---

## 5. UI/UX uchun alohida TZ

### TZ-UI-01 — Design System va umumiy UI

**Maqsad:** barcha sahifalarda yagona premium vizual til va izchil interaction yaratish.

**Talablar:**
- Rang, typography, spacing, radius, shadow va breakpoint tokenlari belgilanadi.
- Desktop, tablet va mobile variantlari yaratiladi.
- Button, input, select, checkbox, badge, modal, drawer, toast, skeleton, pagination va product card kabi reusable komponentlar bo‘ladi.
- Barcha interaktiv elementlarda `default`, `hover`, `focus`, `active`, `disabled`, `loading` holatlari ko‘rsatiladi.
- WCAG 2.1 AA kontrastiga imkon qadar rioya qilinadi.
- Keyboard navigatsiya va ko‘rinadigan focus ring bo‘lishi kerak.

**Tavsiya etilgan breakpointlar:**

| Nom | Kenglik |
|---|---:|
| Mobile | 360–767 px |
| Tablet | 768–1023 px |
| Desktop | 1024–1439 px |
| Wide desktop | 1440 px va yuqori |

**Qabul mezonlari:**
- Komponentlar barcha breakpointlarda buzilmaydi.
- Bir xil komponent turli sahifalarda bir xil ko‘rinadi.
- Rang va tipografiya tokenlar orqali boshqariladi.
- Form elementlari label va error message’ga ega.

### TZ-UI-02 — Homepage

**Maqsad:** brend identifikatsiyasini namoyish qilish va foydalanuvchini xaridga yo‘naltirish.

**Bo‘limlar:**
1. Announcement bar — chegirma/yetkazib berish xabari; yopish imkoniyati.
2. Header — logo, Shop, kategoriyalar, qidiruv, account, wishlist, cart.
3. Hero — katta editorial foto, qisqa Uzbek headline, CTA (`Kolleksiyani ko‘rish`).
4. New Arrivals — 4–8 ta yangi mahsulot.
5. Category tiles — futbolka, ko‘ylak, shim, ustki kiyim va boshqalar.
6. Featured collection — maxsus kolleksiya.
7. Best Sellers — eng ko‘p sotiladigan mahsulotlar.
8. Brand story — SARTO qadriyatlari.
9. Newsletter — email yig‘ish; rozilik matni bilan.
10. Footer — aloqa, ijtimoiy tarmoq, siyosat linklari.

**UX:**
- Hero CTA birinchi ekranda ko‘rinadi.
- Product card’da rasm, nom, narx, mavjud rang/variant va wishlist tugmasi bo‘ladi.
- Mahsulot rasmi bosilganda Product Details sahifasiga o‘tadi.
- Mobile’da header ixcham, menu drawer ko‘rinishida.

**Qabul mezonlari:** Homepage mahsulotlar yo‘q bo‘lsa ham empty state bilan chiroyli ko‘rinadi; CTA’lar ishlaydi; barcha bo‘limlar admin yoki database kontenti bilan to‘ldiriladi.

### TZ-UI-03 — Shop va Category

**Maqsad:** mahsulotlarni topish, solishtirish va tanlashni osonlashtirish.

**Elementlar:**
- Breadcrumb.
- Sahifa sarlavhasi va mahsulotlar soni.
- Filter: kategoriya, narx oralig‘i, razmer, rang, mavjudlik.
- Sort: tavsiya etilgan, yangilari, narx o‘sish/tushish tartibida.
- Product grid.
- Pagination yoki `Ko‘proq yuklash`.
- Active filter chips va `Filtrlarni tozalash`.
- Mobile’da filter bottom sheet/drawer.

**Qabul mezonlari:** filterlar birgalikda ishlaydi; query param’lar URL’da saqlanadi; refresh qilganda filter holati yo‘qolmaydi; natija topilmaganda foydali empty state ko‘rsatiladi.

### TZ-UI-04 — Product Details

**Maqsad:** xarid qarori uchun kerakli ma’lumotni to‘liq ko‘rsatish.

**Elementlar:**
- Product image gallery; thumbnail va asosiy rasm.
- Mahsulot nomi, narxi, eski narx/chegirma bo‘lsa ko‘rsatish.
- Qisqa tavsif va SKU.
- Rang tanlash.
- Razmer tanlash.
- Size guide modal.
- Ombor holati.
- Miqdor tanlash.
- `Savatchaga qo‘shish` va wishlist.
- Yetkazib berish/qaytarish haqida qisqa ma’lumot.
- Batafsil tavsif, material, parvarish ko‘rsatmasi.
- O‘xshash mahsulotlar.

**Validatsiya:** rang/razmer talab qilinsa, tanlanmaguncha cart’ga qo‘shilmaydi; mavjud bo‘lmagan variant disabled; quantity 1 dan kam bo‘lmaydi va qoldiqdan oshmaydi.

**Qabul mezonlari:** tanlangan variant to‘g‘ri cart’ga tushadi; narx va mavjudlik serverdan olinadi; rasm gallery mobile’da swipe qilinadi.

### TZ-UI-05 — Search

- Header search input va alohida search route.
- Mahsulot nomi, SKU va kategoriya bo‘yicha qidiruv.
- Debounce (taxminan 250–400 ms) va loading state.
- Qidiruv so‘rovi URL’da `q` parametri sifatida saqlanadi.
- Natija yo‘q bo‘lsa qidiruv matni va tavsiya etilgan kategoriyalar ko‘rsatiladi.
- Backend qidiruviga mos ravishda pagination ishlaydi.

### TZ-UI-06 — Wishlist

- Mahsulot kartalari va remove action.
- Guest wishlist local storage’da vaqtincha saqlanishi mumkin.
- Login bo‘lganda guest wishlist’ni account wishlist’iga birlashtirish qoidasi belgilanadi.
- Variant tanlamasdan wishlist’ga qo‘shish mumkin; wishlist’dan cart’ga o‘tkazishda variant tanlash talab qilinadi.
- Empty state’da Shop CTA ko‘rsatiladi.

### TZ-UI-07 — Cart

- Mahsulot rasmi, nomi, tanlangan rang/razmer, narx, quantity.
- Quantity increment/decrement va remove.
- Subtotal, tax/shipping (biznes modeliga muvofiq), discount va total.
- Promo code maydoni faqat promo-code moduli ishga tushganda ko‘rinadi.
- `Xaridni davom ettirish` va `Rasmiylashtirish` CTA.
- Cart’dagi mahsulot o‘chirilgan yoki qoldig‘i kamaygan bo‘lsa, xabar beriladi.

### TZ-UI-08 — Checkout

**Maqsad:** xaridni kam qadamda va xatosiz yakunlash.

**Maydonlar:**
- Ism-familiya.
- Telefon raqami (`+998` formatini qo‘llab-quvvatlash; xalqaro format kelajakda).
- Email — ixtiyoriy yoki biznes qaroriga muvofiq.
- Viloyat/shahar/tuman.
- Ko‘cha, uy, xonadon/mo‘ljal.
- Yetkazib berish usuli.
- To‘lov usuli.
- Buyurtma izohi — ixtiyoriy.

**UI qoidalari:**
- Order summary doim ko‘rinadi; mobile’da accordion bo‘lishi mumkin.
- Field validation aniq va Uzbek tilida.
- Submit paytida double-submit bloklanadi.
- Order yaratish muvaffaqiyatsiz bo‘lsa cart yo‘qolmaydi.
- Buyurtma muvaffaqiyatli bo‘lsa confirmation page ko‘rsatiladi.

### TZ-UI-09 — Auth va Account

- Login/register/forgot password ekranlari.
- Account overview.
- Profil ma’lumotlarini tahrirlash.
- Buyurtmalar tarixi va status timeline.
- Saqlangan manzillar.
- Logout.
- Customer faqat o‘z ma’lumotlarini ko‘radi.

### TZ-UI-10 — Admin Dashboard

**Umumiy layout:** chap sidebar, yuqori header, kontent maydoni, responsive mobile navigation.

**Dashboard widget’lari:**
- Bugungi/haftalik/oylik buyurtmalar.
- Savdo summasi.
- Kutilayotgan buyurtmalar.
- Kam qolgan mahsulotlar.
- So‘nggi buyurtmalar.
- Sotuv statistikasi (sana oralig‘i bo‘yicha).

**Admin UI talablari:**
- Jadval: search, filter, sort, pagination.
- Create/edit form: field validation va image upload.
- Delete action uchun confirmation dialog.
- Status o‘zgarishida success/error toast.
- Admin tomonidan bajarilgan muhim amallar audit log’da qayd etilishi tavsiya qilinadi.

### TZ-UI-11 — Static content sahifalari

About, Contact, FAQ, Delivery, Returns, Privacy va Terms sahifalari bitta tipografik/design tizimidan foydalanadi. Matnlar admin tomonidan o‘zgartirilishi mumkin yoki MVPda koddagi kontent konfiguratsiyasidan olinadi. Huquqiy matnlar ishga tushirishdan oldin biznes/yurist tomonidan tasdiqlanadi.

### TZ-UI-12 — UI holatlari va accessibility

Har bir asosiy sahifada quyidagi holatlar dizayn qilinadi:
- Loading / skeleton.
- Empty state.
- Error state / retry.
- Success feedback.
- Disabled state.
- Validation error.
- Network offline yoki timeout holati.

**Qabul mezonlari:** keyboard bilan asosiy flow yakunlanadi; ikonkalarda accessible label bor; modal ochilganda focus boshqariladi; rangning o‘zi yagona status indikatori bo‘lmaydi.

---

## 6. Frontend development uchun alohida TZ

### TZ-FE-01 — Next.js loyiha setup’i

**Vazifalar:**
- Next.js App Router + TypeScript loyiha yaratish.
- Tailwind CSS va global design tokens sozlash.
- ESLint/formatter va import alias (`@/*`) sozlash.
- Route group’larni tashkil qilish: `(store)`, `(auth)`, `(account)`.
- Layout: root, store, auth, account, admin.
- Environment validation (`zod` yoki typed config).

**Qabul mezonlari:** loyiha local’da toza ishga tushadi; typecheck/lint/build muvaffaqiyatli; `.env.example` mavjud; hech qanday secret repository’ga commit qilinmagan.

### TZ-FE-02 — Component system

Quyidagi reusable komponentlar ishlab chiqiladi:
- `Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Textarea`.
- `Modal`, `Drawer`, `Dialog`, `Toast`, `Tooltip`.
- `Container`, `SectionHeading`, `Breadcrumbs`, `Pagination`.
- `Header`, `MobileMenu`, `Footer`, `AnnouncementBar`.
- `ProductCard`, `ProductGrid`, `Price`, `ProductGallery`, `SizeSelector`, `ColorSelector`.
- `QuantitySelector`, `CartItem`, `OrderSummary`, `StatusBadge`.
- `DataTable`, `FormField`, `ImageUploader`.

**Qoidalar:** komponentlar biznes logikasiz va prop orqali sozlanadigan bo‘lsin; umumiy turlar `src/types` yoki feature ichida saqlansin.

### TZ-FE-03 — Public pages

Homepage, Shop, Category, Product Details, Search, About, Contact, FAQ, Delivery va Returns sahifalarini UI TZ bo‘yicha ishlab chiqish.

**Talablar:**
- Asosiy kontent server component orqali olinadi.
- Filter, gallery, dropdown kabi interaction’lar client component bo‘ladi.
- Server data va client interaction chegarasi aniq bo‘ladi.
- SEO metadata har bir mahsulot/kategoriya uchun dinamik.
- 404 va not-found holatlari ishlab chiqiladi.

### TZ-FE-04 — Client state va persistence

- Cart/wishlist state serverdagi account bilan sinxronlanadi.
- Guest holatida local storage faqat vaqtinchalik UX cache sifatida ishlatiladi.
- Local storage’dagi narx va qoldiq hech qachon ishonchli manba hisoblanmaydi.
- Cart merge qoidasi login vaqtida qo‘llanadi.
- State yangilanganda UI optimistic update qilishi mumkin; server xatosida rollback bo‘lsin.

### TZ-FE-05 — Form va validation

- React Hook Form + Zod yoki bir xil darajadagi yechim.
- Client validation foydalanuvchiga tez feedback beradi.
- Server validation majburiy va client validation’ni takrorlaydi.
- Telefon format, required field, max length, email format tekshiriladi.
- Xatolar Uzbek tilida tushunarli ko‘rsatiladi.

### TZ-FE-06 — SEO va performance

- Metadata API orqali title, description, canonical va Open Graph.
- Mahsulot/kategoriya sahifalariga Product/Breadcrumb structured data qo‘shish imkoniyati.
- `next/image` yoki mos image optimization.
- Lazy loading; hero/LCP rasmiga to‘g‘ri priority.
- Keraksiz client bundle va katta animation library yuklanishidan qochish.
- Sitemap, robots.txt va canonical URL.
- Core Web Vitals production’da kuzatiladi; aniq ko‘rsatkichlar real kontent va hostingdan keyin o‘lchanadi.

**Frontend qabul mezonlari:** asosiy user journey mobil va desktop’da bajariladi; TypeScript `any` faqat izohlangan istisnoda; loading/error/empty state’lar mavjud; production build muvaffaqiyatli.

---

## 7. Backend uchun alohida TZ

### TZ-BE-01 — Backend arxitekturasi

**Maqsad:** barcha biznes qoidalarini ishonchli server qatlamida bajarish.

**Qatlamlar:**

```text
src/
  app/api/v1/             # HTTP route handlers
  server/
    auth/                 # session, permissions
    services/             # business logic
    repositories/         # DB access
    validators/           # Zod schemas
    integrations/         # payment, delivery, messaging
    errors/               # typed errors
```

**Talablar:**
- Har bir mutation auth va authorization’dan o‘tadi.
- Request body Zod bilan tekshiriladi.
- DB xatolari xavfsiz error response’ga aylantiriladi.
- Log’da password, token, payment secret va to‘liq shaxsiy ma’lumotlar yozilmaydi.
- API response formatlari bir xil bo‘ladi.

### TZ-BE-02 — API standartlari

Base path: `/api/v1`.

**Muvaffaqiyatli response namunasi:**

```json
{
  "data": {},
  "meta": {}
}
```

**Xatolik response namunasi:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Kiritilgan ma’lumotlarni tekshiring.",
    "fields": {
      "phone": "Telefon raqami noto‘g‘ri."
    }
  }
}
```

**HTTP statuslar:**
- `200` — muvaffaqiyatli o‘qish/yangilash.
- `201` — yangi resurs yaratildi.
- `204` — muvaffaqiyatli, body yo‘q.
- `400` — noto‘g‘ri request.
- `401` — autentifikatsiya talab qilinadi.
- `403` — ruxsat yo‘q.
- `404` — resurs topilmadi.
- `409` — conflict, masalan qoldiq yetarli emas.
- `422` — biznes validatsiyasi xatosi.
- `429` — rate limit.
- `500` — server xatosi.

Pagination parametrlari: `page`, `limit`; default `page=1`, `limit=12`, maksimal `limit=100`. Sort/filter parametrlari endpoint hujjatida aniq belgilanadi.

### TZ-BE-03 — Authentication va Authorization

**Maqsad:** customer va admin kirishini xavfsiz boshqarish.

**Talablar:**
- Supabase Auth ishlatiladi.
- MVP auth usuli biznes qarori bilan belgilanadi: email/password yoki phone OTP. Phone OTP uchun SMS provider va Supabase konfiguratsiyasi talab qilinadi.
- Session server tomonda tekshiriladi.
- Har bir admin route va admin API `admin` yoki `super_admin` rolini tekshiradi.
- Foydalanuvchi faqat o‘z profil, manzil va buyurtmalarini ko‘ra oladi.
- Password reset va email/phone verification flow mavjud bo‘ladi.
- Login/register endpoint’lariga rate limit qo‘llanadi.

### TZ-BE-04 — Product Catalog API

**Vazifalar:**
- Active mahsulotlarni public ko‘rsatish.
- Kategoriya, slug, SKU, variant, rasm va narxlarni olish.
- Admin uchun mahsulot CRUD.
- Mahsulot statuslari: `draft`, `active`, `archived`.
- Variant bo‘yicha narx/stock farqlanishi mumkin.

**Asosiy qoidalar:**
- Faqat `active` mahsulotlar public katalogda ko‘rinadi.
- Slug unique bo‘lishi kerak.
- SKU unique bo‘lishi tavsiya etiladi.
- Narx manbasi DB; client price qabul qilinmaydi.
- `archived` mahsulotni yangi buyurtmaga qo‘shib bo‘lmaydi.

### TZ-BE-05 — Search, Filter va Sort API

- Search: product name, descriptionning mos qismlari, SKU (kerak bo‘lsa).
- Filter: category, min/max price, size, color, in-stock.
- Sort: newest, price asc, price desc, featured.
- Query param’lar whitelist orqali tekshiriladi.
- Pagination qo‘llanadi.
- SQL injection’dan himoyalanish uchun parametrli query/ORM client ishlatiladi.
- Qidiruv turi va indekslar real katalog hajmiga qarab tanlanadi; MVPda PostgreSQL `ILIKE`/full-text search yetarli bo‘lishi mumkin.

### TZ-BE-06 — Cart API

- Guest cart client’da vaqtincha saqlanishi mumkin; checkout vaqtida server qayta validatsiya qiladi.
- Login bo‘lgan customer cart’i DB’da saqlanadi.
- Cart item identifikatori `variant_id` bilan bog‘lanadi.
- Quantity musbat integer; mavjud qoldiqdan oshmasin.
- Har bir cart read/update’da narx va stock qayta olinadi.
- Cart subtotal backend’da hisoblanadi.

### TZ-BE-07 — Wishlist API

- Customer wishlist’i DB’da saqlanadi.
- Guest wishlist local storage’da vaqtincha saqlanishi mumkin.
- Login vaqtida merge endpoint yoki service ishlaydi.
- Bir user uchun bir variant/mahsulot takrorlanmasin (business rule bo‘yicha product yoki variant darajasida).

### TZ-BE-08 — Checkout va Order API

**Order flow:**

```text
Cart validation
    -> customer/contact validation
    -> address validation
    -> delivery fee calculation
    -> current product/variant price lookup
    -> stock reservation/decrement (atomic)
    -> order + order_items creation
    -> payment record/status creation
    -> cart clear after successful order creation
    -> confirmation response
```

**Majburiy talablar:**
- Jami summa frontenddan qabul qilinmaydi; server qayta hisoblaydi.
- Buyurtma item’larida mahsulot nomi, SKU, tanlangan rang/razmer va unit price snapshot bo‘ladi.
- Stock tekshiruvi va kamaytirish race condition’ga qarshi atomic bo‘lishi shart.
- `idempotency_key` yordamida takroriy checkout so‘rovi ikki buyurtma yaratmasin.
- Buyurtma yaratilishi bilan unique order number beriladi.
- Muvaffaqiyatsiz transaction’da cart va stock izchil qolishi kerak.

**Order statuslari:**
- `pending` — yangi, operator tasdiqlashini kutmoqda.
- `confirmed` — tasdiqlandi.
- `processing` — tayyorlanmoqda.
- `shipped` — jo‘natildi.
- `delivered` — topshirildi.
- `cancelled` — bekor qilindi.
- `returned` — qaytarildi.

Status o‘zgarishlari serverda ruxsat etilgan transition qoidasi bilan cheklanadi. Masalan, `delivered -> processing` oddiy admin action bilan bajarilmaydi.

### TZ-BE-09 — Payment API va integratsiya

**MVP:** COD yoki biznes tasdiqlagan manual payment status.

**Keyingi bosqich:** Click/Payme yoki boshqa to‘lov provayderi.

**Talablar:**
- Payment provider adapter pattern orqali ajratiladi.
- Payment secret faqat server env’da bo‘ladi.
- Payment callback/webhook signature tekshiriladi.
- Webhook idempotent bo‘ladi; bitta event ikki marta kelganda ikki marta order/payment holati o‘zgarmaydi.
- Provider’da payment status tekshirish imkoniyati bo‘lsa, callback natijasi server-to-server verification bilan mustahkamlanadi.
- Payment statuslari: `unpaid`, `pending`, `paid`, `failed`, `refunded`, `partially_refunded`.
- Kartaning to‘liq ma’lumotlari SARTO serverida saqlanmaydi; provayderning hosted checkout/tokenized flow’i ishlatiladi.

**To‘lov provayderi tanlanishidan oldin bajarilmaydigan ish:** aniq endpoint, signature algoritmi yoki callback payload’ini taxmin qilib yozish mumkin emas. Rasmiy merchant hujjati olinishi shart.

### TZ-BE-10 — Delivery va shipping calculation

- Yetkazib berish narxi admin sozlamasidan yoki hudud tarifidan hisoblanadi.
- Hudud, shahar/tuman, xizmat turi va kerak bo‘lsa vazn bo‘yicha tarif qo‘llash imkoniyati arxitekturada ko‘zda tutilsin.
- MVPda oddiy flat rate yoki hudud bo‘yicha rate ishlatilishi mumkin.
- Buyurtma yaratilganda shipping fee snapshot sifatida saqlanadi.
- Yetkazish statusi order status timeline bilan bog‘lanadi.
- Tashqi delivery provider integratsiyasi keyingi bosqichga qoldirilishi mumkin.

### TZ-BE-11 — Admin API

Admin API quyidagilarni qo‘llab-quvvatlaydi:
- Product/category CRUD.
- Variant va inventory boshqaruvi.
- Order list/filter/detail/status update.
- Customer list va faqat zarur profil ma’lumotlari.
- Homepage banner/collection kontenti.
- Shop settings: telefon, email, manzil, social links, shipping rates, free shipping threshold.
- Admin action’lar uchun audit log.

Har bir endpoint admin role check va input validation’dan o‘tadi.

### TZ-BE-12 — Error handling, logging va rate limiting

- Xatolar typed error class’lar orqali boshqariladi.
- Client’ga stack trace yoki SQL detail yuborilmaydi.
- Server log’larda correlation/request ID bo‘ladi.
- Auth, search, checkout, contact form va webhook endpoint’lari uchun rate limit.
- Contact/newsletter endpoint’larida spamdan himoya (rate limit va zarur bo‘lsa CAPTCHA).
- Production’da `console.log` orqali shaxsiy ma’lumot chiqarilmaydi.

**Backend qabul mezonlari:** barcha mutation serverda validatsiya qilinadi; role policy testdan o‘tadi; order totals serverda hisoblanadi; inventory concurrency testdan o‘tadi; webhook idempotent.

---

## 8. Database uchun alohida TZ

### TZ-DB-01 — Umumiy qoidalar

- Database: PostgreSQL (Supabase).
- Primary key: UUID (`gen_random_uuid()` yoki platforma tavsiyasi).
- Sana-vaqt: `timestamptz`, UTC.
- Pul: `bigint` yoki `numeric(14,0)`, UZS butun son.
- Foreign key va kerakli index’lar majburiy.
- Soft delete faqat audit yoki biznes ehtiyoji bo‘lsa; aks holda `archived` status ishlatiladi.
- Schema o‘zgarishlari migration fayllari bilan boshqariladi.

### TZ-DB-02 — Tavsiya etilgan jadvallar

#### `profiles`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK, FK auth.users | Supabase user ID |
| `full_name` | text | Ism-familiya |
| `phone` | text nullable | Telefon |
| `role` | text/enum | `customer`, `admin`, `super_admin`; xavfsiz server-side boshqaruv |
| `created_at` | timestamptz | Yaratilgan vaqt |
| `updated_at` | timestamptz | Yangilangan vaqt |

#### `categories`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK | ID |
| `name` | text | Kategoriya nomi |
| `slug` | text unique | URL slug |
| `description` | text nullable | Tavsif |
| `image_url` | text nullable | Kategoriya rasmi |
| `sort_order` | int | Tartib |
| `is_active` | boolean | Public ko‘rinish |
| `created_at`, `updated_at` | timestamptz | Audit |

#### `products`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK | ID |
| `category_id` | uuid FK | Kategoriya |
| `name` | text | Mahsulot nomi |
| `slug` | text unique | SEO URL |
| `sku` | text unique nullable | Umumiy SKU (kerak bo‘lsa) |
| `description` | text | Tavsif |
| `material` | text nullable | Material |
| `care_instructions` | text nullable | Parvarish |
| `status` | enum/text | `draft`, `active`, `archived` |
| `is_featured` | boolean | Featured |
| `is_new` | boolean | New arrivals |
| `created_at`, `updated_at` | timestamptz | Audit |

#### `product_variants`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK | Variant ID |
| `product_id` | uuid FK | Mahsulot |
| `sku` | text unique | Variant SKU |
| `size` | text nullable | S/M/L/XL va h.k. |
| `color_name` | text nullable | Rang nomi |
| `color_hex` | text nullable | Rang kodi |
| `price_uzs` | bigint | Sotuv narxi |
| `compare_at_price_uzs` | bigint nullable | Eski narx |
| `stock_quantity` | int | Joriy qoldiq (yoki inventory jadvali orqali) |
| `is_active` | boolean | Variant aktivligi |
| `created_at`, `updated_at` | timestamptz | Audit |

> Tavsiya: MVPda qoldiqni `product_variants.stock_quantity` ichida saqlash mumkin. Agar omborlar, rezerv yoki stock movement kerak bo‘lsa, alohida `inventory` va `inventory_movements` jadvaliga ajratilsin. Bir vaqtning o‘zida ikkala joyda mustaqil stock saqlab, sinxronizatsiya muammosi yaratilmasin.

#### `product_images`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK | ID |
| `product_id` | uuid FK | Mahsulot |
| `variant_id` | uuid FK nullable | Variantga tegishli rasm |
| `storage_path` | text | Storage path |
| `alt_text` | text | Accessibility/SEO |
| `sort_order` | int | Galereya tartibi |
| `is_primary` | boolean | Asosiy rasm |

#### `carts` va `cart_items`

`carts`: `id`, `user_id` nullable, `session_id` nullable, `created_at`, `updated_at`.  
`cart_items`: `id`, `cart_id`, `variant_id`, `quantity`, `created_at`, `updated_at`.

Guest cart DB’da saqlansa, xavfsiz random session token ishlatiladi; tokenning o‘zi user identity o‘rnini bosmaydi.

#### `wishlists` va `wishlist_items`

`wishlists`: `id`, `user_id`, `created_at`.  
`wishlist_items`: `id`, `wishlist_id`, `product_id`, `created_at`; `wishlist_id + product_id` unique.

#### `addresses`

`id`, `user_id`, `recipient_name`, `phone`, `region`, `city`, `district`, `street`, `house`, `apartment`, `landmark`, `is_default`, `created_at`, `updated_at`.

#### `orders`

| Ustun | Tip | Izoh |
|---|---|---|
| `id` | uuid PK | ID |
| `order_number` | text unique | Odamga qulay buyurtma raqami |
| `user_id` | uuid FK nullable | Guest order uchun null |
| `customer_name` | text | Snapshot |
| `customer_phone` | text | Snapshot |
| `customer_email` | text nullable | Snapshot |
| `delivery_address` | jsonb | Buyurtma paytidagi manzil snapshot’i |
| `order_status` | text/enum | Order lifecycle |
| `payment_status` | text/enum | Payment lifecycle |
| `payment_method` | text | COD/provider/manual |
| `subtotal_uzs` | bigint | Mahsulotlar summasi |
| `discount_uzs` | bigint | Chegirma |
| `shipping_uzs` | bigint | Yetkazish |
| `total_uzs` | bigint | Yakuniy summa |
| `customer_note` | text nullable | Izoh |
| `idempotency_key` | text unique nullable | Takroriy requestdan himoya |
| `created_at`, `updated_at` | timestamptz | Audit |

#### `order_items`

`id`, `order_id`, `product_id` nullable, `variant_id` nullable, `product_name_snapshot`, `sku_snapshot`, `size_snapshot`, `color_snapshot`, `unit_price_uzs`, `quantity`, `line_total_uzs`, `created_at`.

FK’lar mahsulot o‘chirilganda order tarixini yo‘qotmasligi uchun `ON DELETE SET NULL` yoki mos strategiya bilan ishlasin. Snapshot ustunlari tarixiy ma’lumotni saqlaydi.

#### `payments`

`id`, `order_id`, `provider`, `provider_payment_id` nullable, `amount_uzs`, `status`, `idempotency_key`, `raw_reference` (faqat xavfsiz metadata), `paid_at`, `created_at`, `updated_at`.

Karta raqami, CVV yoki maxfiy payment data saqlanmaydi.

#### `order_status_history`

`id`, `order_id`, `old_status`, `new_status`, `changed_by` nullable, `note` nullable, `created_at`.

#### `shop_settings`

`id`, `key` unique, `value` jsonb, `updated_by`, `updated_at`. Faqat ruxsatli admin boshqaradi. Maxfiy API key’lar bu jadvalda saqlanmaydi.

#### `banners` / `collections` (MVP scope’ga qarab)

Homepage banner va collection kontentini admin boshqarishi uchun `title`, `subtitle`, `image_path`, `cta_label`, `cta_url`, `sort_order`, `is_active`, `starts_at`, `ends_at` kabi ustunlar.

#### `audit_logs`

`id`, `actor_user_id`, `action`, `entity_type`, `entity_id`, `metadata` jsonb, `created_at`. Maxfiy qiymatlar log metadata’ga tushmasin.

### TZ-DB-03 — Index va constraintlar

- `products.slug`, `categories.slug`, `product_variants.sku`, `orders.order_number` unique.
- `products.status`, `products.category_id`, `products.created_at` index.
- `product_variants.product_id`, `product_variants.is_active` index.
- `orders.user_id`, `orders.order_status`, `orders.created_at`, `orders.customer_phone` kerakli query’lar uchun index.
- `order_items.order_id`, `cart_items.cart_id`, `wishlist_items.wishlist_id` index.
- `quantity > 0`, `price_uzs >= 0`, `stock_quantity >= 0` check constraint.
- Variant kombinatsiyasi bir mahsulot ichida takrorlanmasligi uchun unique constraint (product + size + color) biznesga mos bo‘lsa qo‘llanadi.

### TZ-DB-04 — RLS siyosatlari

- Public: faqat active category/product/variant va kerakli public image metadata o‘qiladi.
- Customer: faqat o‘z profile, address, cart, wishlist va order ma’lumotlarini o‘qiydi/yangilaydi.
- Guest cart: maxsus session token yoki server-side handler orqali; oddiy public RLS bilan boshqa session ma’lumotlari ko‘rinmasin.
- Admin: faqat serverda tasdiqlangan admin role orqali.
- Super Admin: admin role va global settings boshqaruvi.
- `service_role` key faqat server muhitida; client’ga berilmaydi.
- Role qiymatini user tomonidan `profiles` update orqali o‘zgartirishga ruxsat berilmaydi.

**Qabul mezonlari:** customer boshqa customer order’ini ID’ni almashtirib ham ko‘ra olmaydi; anon foydalanuvchi admin ma’lumotlariga kira olmaydi; RLS testlari mavjud.

---

## 9. API endpoint spetsifikatsiyasi

> Endpoint nomlari boshlang‘ich taklif. Implementatsiyadan oldin OpenAPI/Swagger hujjatiga aylantirib, frontend/backend birgalikda tasdiqlaydi.

### 9.1. Public catalog

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET | `/api/v1/products` | Mahsulotlar, filter, pagination |
| GET | `/api/v1/products/:slug` | Mahsulot tafsiloti |
| GET | `/api/v1/categories` | Active kategoriyalar |
| GET | `/api/v1/categories/:slug/products` | Kategoriya mahsulotlari |
| GET | `/api/v1/search?q=` | Qidiruv |

### 9.2. Cart va wishlist

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET | `/api/v1/cart` | Joriy cart |
| POST | `/api/v1/cart/items` | Item qo‘shish |
| PATCH | `/api/v1/cart/items/:id` | Quantity yangilash |
| DELETE | `/api/v1/cart/items/:id` | Item o‘chirish |
| DELETE | `/api/v1/cart` | Cart tozalash |
| GET | `/api/v1/wishlist` | Wishlist olish |
| POST | `/api/v1/wishlist/items` | Wishlist’ga qo‘shish |
| DELETE | `/api/v1/wishlist/items/:productId` | O‘chirish |
| POST | `/api/v1/wishlist/merge` | Guest va account wishlist birlashtirish |

### 9.3. Checkout va orders

| Method | Endpoint | Vazifasi |
|---|---|---|
| POST | `/api/v1/checkout/quote` | Joriy narx, shipping va total hisoblash |
| POST | `/api/v1/orders` | Buyurtma yaratish |
| GET | `/api/v1/orders/:orderNumber/status` | Ruxsatli order tracking |
| GET | `/api/v1/account/orders` | Customer buyurtmalari |
| GET | `/api/v1/account/orders/:id` | Customer order detail |
| POST | `/api/v1/payments/webhook/:provider` | Provider webhook |

`POST /orders` request’da variant ID va quantity, contact, address, payment method va idempotency key yuboriladi. Narxlar client’dan yuborilmaydi yoki yuborilsa ham e’tiborga olinmaydi.

### 9.4. Account

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET | `/api/v1/account/profile` | Profil olish |
| PATCH | `/api/v1/account/profile` | Profil yangilash |
| GET | `/api/v1/account/addresses` | Manzillar |
| POST | `/api/v1/account/addresses` | Manzil yaratish |
| PATCH | `/api/v1/account/addresses/:id` | Manzil tahrirlash |
| DELETE | `/api/v1/account/addresses/:id` | Manzil o‘chirish |

Supabase Auth’ning o‘z auth endpoint’lari ishlatilsa, custom duplicate auth endpoint’lar yaratilmasin.

### 9.5. Admin

| Method | Endpoint | Vazifasi |
|---|---|---|
| GET/POST | `/api/v1/admin/products` | Mahsulotlar list/create |
| GET/PATCH/DELETE | `/api/v1/admin/products/:id` | Product read/update/archive |
| GET/POST | `/api/v1/admin/categories` | Category list/create |
| PATCH/DELETE | `/api/v1/admin/categories/:id` | Category update/archive |
| POST | `/api/v1/admin/products/:id/images` | Image upload metadata |
| GET/PATCH | `/api/v1/admin/inventory` | Qoldiq ko‘rish/yangilash |
| GET | `/api/v1/admin/orders` | Buyurtmalar list/filter |
| GET | `/api/v1/admin/orders/:id` | Buyurtma tafsiloti |
| PATCH | `/api/v1/admin/orders/:id/status` | Status update |
| GET | `/api/v1/admin/customers` | Mijozlar list |
| GET/PATCH | `/api/v1/admin/settings` | Shop settings |
| GET | `/api/v1/admin/dashboard` | Dashboard statistikasi |

---

## 10. Modulma-modul alohida development TZ

### MOD-01 — Product Catalog

**Mas’ul:** Backend + Frontend  
**Maqsad:** mahsulotlarni yaratish va public katalogda ko‘rsatish.

**Funksiyalar:**
- Product CRUD, status boshqaruvi.
- Kategoriya bilan bog‘lash.
- Nom, slug, description, material, care instructions.
- SKU va product variants.
- Narx, compare-at price, rang, razmer, stock.
- Bir nechta rasm, asosiy rasm, tartib.
- Featured va New Arrival belgilari.

**Biznes qoidalari:**
- Draft mahsulot public’da ko‘rinmaydi.
- Active mahsulotda kamida bitta aktiv variant va asosiy rasm bo‘lishi kerak.
- Narx manfiy bo‘lmaydi.
- Mahsulotni tarixiy order bilan bog‘langan holatda hard delete qilmaslik; archive qilish.

**Acceptance criteria:** admin mahsulot qo‘sha oladi; variant va rasm biriktiradi; active mahsulot Shop’da chiqadi; draft chiqmaydi; slug unique.

### MOD-02 — Category Management

**Funksiyalar:** kategoriya create/edit/archive; slug; rasm; sort order; active/inactive.

**Qoidalar:**
- Slug unique.
- Kategoriya o‘chirilishidan oldin unga bog‘langan mahsulotlar tekshiriladi.
- Mahsulotli kategoriya hard delete qilinmaydi; inactive/archive qilinadi.

**Acceptance criteria:** admin kategoriya tartibini boshqaradi; public menu faqat active kategoriyalarni ko‘rsatadi.

### MOD-03 — Product Variant & Inventory

**Funksiyalar:** size/color variant; SKU; stock; inventory update; low-stock threshold.

**Qoidalar:**
- Har bir variantning SKU’si unique.
- Stock manfiy bo‘lmaydi.
- Order checkout vaqtida stock atomic ravishda tekshiriladi.
- Admin stock adjustment qilganda sabab yozishi tavsiya etiladi.
- Stock kamayishi order create bilan transaction ichida bajariladi.

**Acceptance criteria:** qoldiq 0 variant sotib olinmaydi; parallel checkout stock’dan ortiq buyurtma bermaydi; admin qoldiq o‘zgarishini ko‘radi.

### MOD-04 — Product Media / Storage

**Funksiyalar:** product image upload, preview, delete, reorder, primary image belgilash.

**Qoidalar:**
- Faqat ruxsatli admin upload qiladi.
- Ruxsat etilgan formatlar: JPEG, PNG, WebP (zarur bo‘lsa AVIF).
- File size limiti konfiguratsiya qilinadi; boshlang‘ich limit 5–8 MB.
- MIME type bilan birga file content ham tekshiriladi.
- Fayl nomi user yuborgan nomga ishonmasdan generated ID bilan saqlanadi.
- Storage path DB’da saqlanadi; public URL kerak bo‘lsa server/client helper orqali olinadi.
- Mahsulotga mos `alt_text` bo‘lishi kerak.

**Acceptance criteria:** invalid file rad etiladi; upload progress ko‘rinadi; rasm o‘chirilganda DB reference va storage asset izchil boshqariladi.

### MOD-05 — Search, Filter, Sort

**Funksiyalar:** matn qidiruvi; kategoriya; narx; size; color; stock; sort; pagination.

**Qoidalar:**
- Faqat active product va active variantlar qidiruvga kiradi.
- Parametrlar serverda normalize/validate qilinadi.
- Filterlar URL query’da saqlanadi.
- Search natijalari deterministik tartibda bo‘ladi.

**Acceptance criteria:** bir necha filter birga ishlaydi; clear filters hammasini olib tashlaydi; page o‘zgarganda qidiruv konteksti saqlanadi.

### MOD-06 — Authentication & Profile

**Funksiyalar:** register, login, logout, password reset, verification, profile.

**Qoidalar:**
- Auth provider Supabase.
- Auth usuli — [TASDIQLASH KERAK].
- Profile `auth.users` bilan 1:1 bog‘langan.
- Customer o‘z role’ini o‘zgartira olmaydi.
- Admin login’dan keyin admin panelga, customer account’ga yo‘naltiriladi.

**Acceptance criteria:** session refresh ishlaydi; logout sessionni bekor qiladi; reset flow ishlaydi; customer admin endpoint’ga kira olmaydi.

### MOD-07 — Cart

**Funksiyalar:** add/update/remove/clear; guest cart; account cart; cart merge.

**Qoidalar:**
- Cart item variant asosida identifikatsiya qilinadi.
- Bir xil variant qo‘shilsa quantity birlashtiriladi.
- Quantity stock’dan oshmasin.
- Narx serverdan yangilanadi.
- Order muvaffaqiyatli yaratilgandan keyin cart tozalanadi.

**Acceptance criteria:** refresh’dan keyin guest cart saqlanadi; login’dan keyin merge qoidasi ishlaydi; stock o‘zgarsa cart’da ogohlantirish ko‘rinadi.

### MOD-08 — Wishlist

**Funksiyalar:** add/remove/list; guest local wishlist; login merge.

**Qoidalar:** duplicate item bo‘lmasin; wishlist sotib olishni kafolatlamaydi; stock checkout’da tekshiriladi.

**Acceptance criteria:** wishlist’dan item o‘chirish darhol UI’da ko‘rinadi; account’ga kirganda tegishli item’lar birlashadi.

### MOD-09 — Checkout & Order Creation

**Funksiyalar:** customer details, delivery address, delivery selection, payment method, order summary, order create.

**Qoidalar:**
- Checkout oldidan cart serverda qayta tekshiriladi.
- Narx, discount va shipping serverda hisoblanadi.
- Order item snapshot saqlanadi.
- Idempotency key takroriy order’dan himoya qiladi.
- Stock transaction ichida rezerv/decrement qilinadi.
- Guest order uchun xavfsiz order tracking mexanizmi bo‘ladi; order raqamining o‘zi shaxsiy ma’lumotga kirish uchun yetarli bo‘lmasin.

**Acceptance criteria:** successful order confirmation; insufficient stock’da 409/422; duplicate request’da duplicate order yo‘q; failure’da cart saqlanadi.

### MOD-10 — Payment

**MVP:** COD/manual status.  
**Future:** Click/Payme/provider adapter.

**Funksiyalar:** payment record, status, webhook, refund-ready data model.

**Acceptance criteria:** payment status faqat ruxsatli admin yoki verifikatsiyalangan provider event orqali yangilanadi; duplicate webhook xavfsiz qayta ishlanadi.

### MOD-11 — Delivery & Address

**Funksiyalar:** address CRUD; region/city/district; shipping rate calculation; delivery notes.

**Qoidalar:**
- Order manzili snapshot sifatida saqlanadi.
- Shipping fee order yaratilgan vaqtdagi qiymatda qoladi.
- Hudud/tarif sozlamasi admin tomonidan o‘zgartirilishi mumkin.

**Acceptance criteria:** noto‘g‘ri/bo‘sh manzil rad etiladi; total’da shipping aniq ko‘rsatiladi; admin order address’ni ko‘ra oladi.

### MOD-12 — Order Management (Admin)

**Funksiyalar:** order list, filter, detail, status update, notes, print/export (keyingi versiyada).

**Qoidalar:**
- Status transition validatsiya qilinadi.
- Har o‘zgarish history jadvaliga yoziladi.
- Cancel/return qoidalari stock va refund bilan mos ishlaydi.
- Admin o‘zgarishlari audit log’ga yoziladi.

**Acceptance criteria:** admin order’ni topadi, ko‘radi va ruxsatli statusga o‘tkazadi; customer o‘z account’ida yangilangan statusni ko‘radi.

### MOD-13 — Customer Management

**Funksiyalar:** mijozlar ro‘yxati; telefon/ism bo‘yicha search; customer order history; profil ko‘rish.

**Qoidalar:** admin faqat ish uchun zarur shaxsiy ma’lumotlarni ko‘radi; mijozlar ro‘yxati public endpoint orqali ochilmaydi.

**Acceptance criteria:** faqat admin kiradi; list pagination’li; maxfiy ma’lumotlar log’da ko‘rinmaydi.

### MOD-14 — Homepage Content & Collections

**Funksiyalar:** banner, featured collection, homepage section ordering, CTA label/link, active dates.

**Qoidalar:** inactive yoki muddati o‘tgan banner ko‘rinmaydi; CTA URL xavfsiz validate qilinadi; admin image upload huquqiga ega.

**Acceptance criteria:** admin banner tahrirlaydi; Homepage yangilangan kontentni ko‘rsatadi; mobil crop nazorat qilinadi.

### MOD-15 — Static Pages, Contact & Newsletter

**Funksiyalar:** About/FAQ/Contact/policies; contact form; optional newsletter subscription.

**Qoidalar:**
- Contact form input validation, rate limit va spam himoyasi.
- Newsletter uchun foydalanuvchi roziligi qayd etiladi.
- Privacy/terms/returns matni biznes tomonidan tasdiqlanadi.

**Acceptance criteria:** yuborilgan xabar admin belgilangan email/CRM’ga xavfsiz uzatiladi yoki DB’da saqlanadi; muvaffaqiyat va xato holati ko‘rsatiladi.

### MOD-16 — Dashboard & Analytics

**Funksiyalar:** sales totals, order counts, pending orders, low stock, recent orders, date filter.

**Qoidalar:**
- Dashboard metric’lari aniq ta’riflanadi: masalan, `sales` faqat `paid` yoki `delivered` buyurtmalarni o‘z ichiga oladimi — [TASDIQLASH KERAK].
- Cancelled/refunded order’lar hisobdan qanday chiqarilishi biznes qoidasida belgilanadi.
- Statistikalar serverda hisoblanadi.

**Acceptance criteria:** tanlangan davrga mos metric qaytadi; customer dashboard endpoint’iga kira olmaydi.

### MOD-17 — SEO & Marketing Basics

**Funksiyalar:** dynamic metadata, sitemap, robots, canonical, Open Graph, structured data, analytics event hook’lari.

**Qoidalar:**
- Draft/archived product index qilinmaydi.
- Duplicate canonical URL bo‘lmasin.
- Analytics’da payment/contact kabi shaxsiy ma’lumotlar yuborilmasin.

**Acceptance criteria:** mahsulot sahifasi unique title/description; sitemap active product/category’larni qamrab oladi.

### MOD-18 — Notifications

**MVP:** confirmation UI va admin order dashboard.  
**Keyingi bosqich:** email/SMS/Telegram notification.

**Eventlar:** order created, order confirmed, shipped, delivered, cancelled, payment success/failure.

**Qoidalar:** notification yuborish xatosi order transaction’ni bekor qilmasin; retry queue yoki qayta yuborish mexanizmi bo‘lishi kerak.

---

## 11. Fayl strukturasi

Quyidagi struktura Next.js App Router uchun tavsiya etiladi. Keraksiz papkalarni boshida yaratmaslik, feature ishlab chiqilganda qo‘shish mumkin.

```text
sarto/
├── public/
│   ├── images/
│   │   ├── brand/
│   │   ├── banners/
│   │   ├── categories/
│   │   └── placeholders/
│   ├── icons/
│   └── fonts/                    # faqat litsenziyasi mos fontlar
│
├── src/
│   ├── app/
│   │   ├── (store)/
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── shop/page.tsx
│   │   │   ├── category/[slug]/page.tsx
│   │   │   ├── product/[slug]/page.tsx
│   │   │   ├── search/page.tsx
│   │   │   ├── wishlist/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/page.tsx
│   │   │   ├── order/success/[orderNumber]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   ├── delivery/page.tsx
│   │   │   ├── returns/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── account/
│   │   │   ├── page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   ├── addresses/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── products/page.tsx
│   │   │   ├── products/new/page.tsx
│   │   │   ├── products/[id]/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── inventory/page.tsx
│   │   │   ├── orders/page.tsx
│   │   │   ├── orders/[id]/page.tsx
│   │   │   ├── customers/page.tsx
│   │   │   ├── content/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   ├── admin-users/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/v1/
│   │   │   ├── products/route.ts
│   │   │   ├── products/[slug]/route.ts
│   │   │   ├── categories/route.ts
│   │   │   ├── search/route.ts
│   │   │   ├── cart/route.ts
│   │   │   ├── cart/items/route.ts
│   │   │   ├── wishlist/route.ts
│   │   │   ├── checkout/quote/route.ts
│   │   │   ├── orders/route.ts
│   │   │   ├── payments/webhook/[provider]/route.ts
│   │   │   └── admin/...
│   │   │
│   │   ├── auth/callback/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/
│   │   ├── ui/                    # Button, Input, Modal, Drawer...
│   │   ├── layout/                # Header, Footer, Navigation...
│   │   ├── product/               # ProductCard, Gallery, VariantSelector...
│   │   ├── cart/                  # CartItem, CartSummary...
│   │   ├── checkout/              # CheckoutForm, AddressFields...
│   │   └── admin/                 # Sidebar, DataTable, AdminHeader...
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── schemas.ts
│   │   │   ├── actions.ts
│   │   │   └── types.ts
│   │   ├── catalog/
│   │   ├── categories/
│   │   ├── search/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── delivery/
│   │   ├── inventory/
│   │   ├── customers/
│   │   ├── content/
│   │   └── analytics/
│   │
│   ├── server/
│   │   ├── auth/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── validators/
│   │   ├── integrations/
│   │   ├── policies/
│   │   └── errors/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── server.ts
│   │   │   └── middleware.ts
│   │   ├── env.ts
│   │   ├── format.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   ├── hooks/
│   ├── stores/                    # kerak bo‘lsa Zustand yoki boshqa client state
│   ├── types/
│   └── config/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── SARTO_PROJECT_TZ.md
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

### 11.1. Fayllar mas’uliyati

| Papka | Mas’uliyat | Nimalar bo‘lmasligi kerak |
|---|---|---|
| `app/` | Routing, layout, route handler | Katta biznes logika |
| `components/ui/` | Umumiy presentational UI | DB query, payment logic |
| `features/` | Feature UI, schema, types, client orchestration | Secret key |
| `server/services/` | Biznes qoidalari | React component |
| `server/repositories/` | DB access | UI markup |
| `server/integrations/` | Payment/delivery adapter | Frontend-only state |
| `lib/supabase/` | Supabase client’lar | Service role’ni browser client’da ishlatish |
| `supabase/migrations/` | Schema/policy/function o‘zgarishlari | Manual production DB edit’ga tayanish |
| `tests/` | Automated testlar | Production secret |

---

## 12. Security va privacy TZ

### SEC-01 — Authentication
- Secure session/cookie konfiguratsiyasi.
- Password provider’ning xavfsiz storage mexanizmidan foydalanadi; plaintext password saqlanmaydi.
- Password reset token’lari log qilinmaydi.
- Login va reset urinishlariga rate limit.

### SEC-02 — Authorization
- Har bir private API request’da user identity tekshiriladi.
- Har bir admin request’da admin role server-side tekshiriladi.
- Object-level authorization: customer boshqa user `id` qiymatini berib, uning order/address’ini ko‘ra olmaydi.
- RLS backend authorization’ga qo‘shimcha qatlam sifatida ishlaydi.

### SEC-03 — Input va file security
- Zod server validation.
- SQL injection’dan parametrli query orqali himoya.
- XSS uchun user kontentini xavfsiz render qilish.
- Upload MIME, extension, size va content tekshiruvi.
- Admin rich text ishlatsa sanitization.

### SEC-04 — Payment security
- Card data saqlanmaydi.
- Webhook signature tekshiriladi.
- Payment status browser callback’iga qarab `paid` qilinmaydi.
- Provider idempotency va event replay himoyasi.

### SEC-05 — Personal data
- Faqat zarur ma’lumot yig‘iladi.
- Privacy policy’da ma’lumot maqsadi va saqlash tartibi tushuntiriladi.
- Production log’da telefon/manzil/email to‘liq yozilmaydi.
- Backup va retention siyosati belgilanadi.

**Security release gate:** RLS test, admin access test, checkout tampering test va webhook verification test o‘tmasdan production launch qilinmaydi.

---

## 13. Non-functional requirements

| Yo‘nalish | Talab |
|---|---|
| Responsive | 360 px dan boshlab mobile layout ishlashi |
| Performance | Image optimization, lazy loading, server rendering va bundle nazorati |
| SEO | Metadata, sitemap, robots, canonical, product schema |
| Accessibility | Semantic HTML, keyboard navigation, label, focus state |
| Reliability | Server error handling, monitoring, backup |
| Security | Auth, RBAC, RLS, validation, rate limit |
| Maintainability | Feature-based modular architecture, TypeScript, migrations |
| Localization | Hozircha Uzbek Latin; UZS formatting |
| Timezone | UI’da Asia/Tashkent; DB’da UTC |
| Browser | So‘nggi Chrome, Edge, Safari va Firefox versiyalarida test |

Performance uchun aniq SLA/score biznes va hosting tanlangach belgilanadi. Lighthouse natijasi test muhitida o‘lchanadi; sun’iy ravishda kafolatlangan ball deb qabul qilinmaydi.

---

## 14. QA va test uchun alohida TZ

### QA-01 — Test strategiyasi

**Unit testlar:**
- UZS formatlash.
- Price subtotal/discount/shipping/total calculation.
- Order status transition.
- Variant availability validation.
- Zod schema’lar.

**Integration testlar:**
- Product list/detail query.
- Cart CRUD.
- Checkout order creation.
- Inventory atomic update.
- Customer ownership policy.
- Admin authorization.
- Webhook idempotency.

**E2E testlar:**
1. Guest foydalanuvchi Shop’dan mahsulot topadi.
2. Variant tanlaydi va cart’ga qo‘shadi.
3. Checkout form’ni to‘ldiradi.
4. Order yaratadi va confirmation ko‘radi.
5. Admin login qiladi, order’ni topadi va statusni yangilaydi.
6. Customer account’da order status yangilanganini ko‘radi.
7. Customer boshqa foydalanuvchining order’iga kira olmasligi tekshiriladi.

### QA-02 — Edge case’lar

- Stock checkout vaqtida 0 ga tushib qolishi.
- Bir xil order submit ikki marta yuborilishi.
- Product admin tomonidan checkout paytida archive qilinishi.
- Narx checkout vaqtida o‘zgarishi.
- Payment webhook takror kelishi.
- Network timeout.
- Rasm upload xatosi.
- Empty catalog/search/cart/wishlist.
- Invalid/expired session.
- Mobile’da uzun mahsulot nomi yoki xato matni.

### QA-03 — Qabul mezonlari

- Critical/High severity bug qolmasligi.
- Checkout va admin order flow E2E testdan o‘tishi.
- Access control va RLS testdan o‘tishi.
- Desktop/mobile asosiy breakpoint’larda vizual tekshiruv.
- `lint`, `typecheck`, `test`, `build` CI’da muvaffaqiyatli.

---

## 15. Deployment va DevOps uchun alohida TZ

### DEVOPS-01 — Environment

Muhitlar:
- `local` — developer kompyuteri.
- `staging` — test va stakeholder review.
- `production` — real mijozlar.

Har bir muhit alohida Supabase project/credentials ishlatishi tavsiya etiladi.

### DEVOPS-02 — Environment variables

`.env.example` ichida faqat nomlar va placeholder bo‘ladi; haqiqiy secret yozilmaydi.

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional: online payment integration (provider confirmed later)
PAYMENT_PROVIDER=
PAYMENT_MERCHANT_ID=
PAYMENT_SECRET_KEY=
PAYMENT_WEBHOOK_SECRET=

# Optional: email / SMS
EMAIL_PROVIDER_API_KEY=
SMS_PROVIDER_API_KEY=

# Monitoring
SENTRY_DSN=
```

`SUPABASE_SERVICE_ROLE_KEY`, payment secret va webhook secret `NEXT_PUBLIC_` prefiksi bilan yozilmasligi shart.

### DEVOPS-03 — CI/CD

- Pull request’da lint, typecheck va unit test.
- Main branch merge’da staging deployment.
- Production deployment faqat review va release checklist’dan keyin.
- DB migration deploy jarayoni nazorat qilinadi; production migration oldidan backup/rollback reja bo‘ladi.
- Secret’lar hosting environment settings’da saqlanadi.

### DEVOPS-04 — Backup va monitoring

- Database backup Supabase plan imkoniyatlariga mos sozlanadi.
- Restore jarayoni kamida staging’da sinab ko‘riladi.
- Sentry yoki muqobil error monitoring.
- Uptime va checkout xatolari monitoring’i.
- Log retention va access policy belgilanadi.

---

## 16. Project management: bosqichlar va task breakdown

### Sprint 0 — Discovery va qarorlar

**Deliverable:** tasdiqlangan biznes qarorlari, sitemap, user flow, brand asset list.

Task’lar:
- [ ] SARTO nomi, logo va domen tekshiruvi.
- [ ] Kategoriyalar va mahsulot atributlarini tasdiqlash.
- [ ] Narx, razmer, rang va qoldiq modeli.
- [ ] Checkout va guest checkout qarori.
- [ ] To‘lov usuli qarori.
- [ ] Yetkazib berish tariflari.
- [ ] Return/refund policy matni.
- [ ] Admin rollari va operatorlar.

### Sprint 1 — UI/UX Design

**Deliverable:** tasdiqlangan desktop/mobile Figma yoki Stitch screen’lari va Design System.

Task’lar:
- [ ] Moodboard va brand visual direction.
- [ ] Design tokens.
- [ ] Homepage.
- [ ] Shop/category.
- [ ] Product details.
- [ ] Cart/checkout.
- [ ] Auth/account.
- [ ] Admin dashboard va CRUD screen’lari.
- [ ] Mobile responsive screen’lar.
- [ ] Loading/empty/error state’lar.
- [ ] Design review va approval.

### Sprint 2 — Foundation

**Deliverable:** deploy qilinadigan Next.js skeleton, Supabase ulanishi, CI.

Task’lar:
- [ ] Project setup.
- [ ] Lint/typecheck/test.
- [ ] Layout va component foundation.
- [ ] Env validation.
- [ ] Supabase client/server setup.
- [ ] Database initial migrations.
- [ ] Auth skeleton.
- [ ] Staging deploy.

### Sprint 3 — Catalog va storefront

**Deliverable:** public Shop ishlaydi.

Task’lar:
- [ ] Categories schema/API.
- [ ] Products/variants/images schema/API.
- [ ] Admin product CRUD (minimal).
- [ ] Homepage sections.
- [ ] Shop/category listing.
- [ ] Product details.
- [ ] Search/filter/sort.
- [ ] SEO metadata.

### Sprint 4 — Cart va customer

**Deliverable:** foydalanuvchi mahsulotni cart’ga yig‘adi.

Task’lar:
- [ ] Guest cart.
- [ ] Customer auth/profile.
- [ ] Account cart persistence.
- [ ] Cart merge.
- [ ] Wishlist.
- [ ] Address management.

### Sprint 5 — Checkout va order

**Deliverable:** real buyurtma yaratish.

Task’lar:
- [ ] Shipping settings.
- [ ] Checkout quote.
- [ ] Order schema/RPC.
- [ ] Stock concurrency handling.
- [ ] Order confirmation.
- [ ] Customer order history.
- [ ] Order tracking.
- [ ] COD/manual payment.

### Sprint 6 — Admin va content

**Deliverable:** do‘kon operatori kundalik ishlarni boshqaradi.

Task’lar:
- [ ] Dashboard metrics.
- [ ] Order management.
- [ ] Inventory management.
- [ ] Customer list.
- [ ] Banner/collection management.
- [ ] Shop settings.
- [ ] Audit logs.

### Sprint 7 — QA, hardening va launch

**Deliverable:** production launch candidate.

Task’lar:
- [ ] Unit/integration/E2E test.
- [ ] RLS va RBAC security test.
- [ ] Performance va accessibility review.
- [ ] SEO tekshiruvi.
- [ ] Privacy/terms/returns policy tasdig‘i.
- [ ] Backup/restore rehearsal.
- [ ] Production env va domain.
- [ ] Smoke test.
- [ ] Launch approval.

**Sprint davomiyligi** jamoa hajmi va ish yukiga qarab belgilanadi. Bu hujjat aniq deadline yoki developer sonini taxmin qilmaydi.

---

## 17. Definition of Ready va Definition of Done

### Definition of Ready (task boshlashdan oldin)

- [ ] Task maqsadi tushunarli.
- [ ] Figma/Stitch screen yoki aniq acceptance criteria mavjud.
- [ ] API/data contract kelishilgan.
- [ ] Loading/error/empty state’lar ko‘rsatilgan.
- [ ] Bog‘liqliklar aniqlangan.
- [ ] Test holatlari yozilgan.

### Definition of Done (task yakunlanganda)

- [ ] Talablar bajarilgan.
- [ ] Responsive holat tekshirilgan.
- [ ] Input validation bor.
- [ ] Loading, success, error state ishlaydi.
- [ ] Authorization va ownership tekshirilgan.
- [ ] Unit/integration/E2E testlar zarur darajada yozilgan.
- [ ] Lint/typecheck/build muvaffaqiyatli.
- [ ] README yoki tegishli hujjat yangilangan.
- [ ] Code review’dan o‘tgan.
- [ ] Staging’da tekshirilgan.

---

## 18. Production launch checklist

### Business
- [ ] SARTO brand name/trademark/domain tekshirildi.
- [ ] Mahsulot nomi, rasmi, narxi va qoldig‘i to‘g‘ri.
- [ ] Yetkazib berish hududlari va tariflari tasdiqlandi.
- [ ] Qaytarish/almashtirish siyosati tasdiqlandi.
- [ ] Aloqa ma’lumotlari va ish vaqti aniq.
- [ ] To‘lov usuli va operator jarayoni sinovdan o‘tdi.

### Product & UX
- [ ] Homepage, catalog, product detail va checkout responsive.
- [ ] Empty/error/loading state’lar mavjud.
- [ ] O‘zbekcha matnlar imlo jihatdan tekshirildi.
- [ ] Telefon raqami va manzil formati sinovdan o‘tdi.
- [ ] Buyurtma confirmation tushunarli.

### Technical
- [ ] Production environment variables kiritildi.
- [ ] Secret’lar repository’ga tushmagan.
- [ ] RLS/RBAC testlar o‘tdi.
- [ ] Inventory concurrency test o‘tdi.
- [ ] Webhook (agar online payment bo‘lsa) tekshirildi.
- [ ] Backup/restore rejasi bor.
- [ ] Monitoring ishlayapti.
- [ ] Sitemap/robots/metadata tekshirildi.
- [ ] 404/500 sahifalar bor.

---

## 19. Risklar va kamaytirish choralari

| Risk | Ta’siri | Kamaytirish |
|---|---|---|
| To‘lov provayderi hali tanlanmagan | Online payment kechikadi | MVPni COD bilan ishga tushirish; adapter architecture |
| Mahsulot rasmi sifatsiz | Premium brend taassuroti pasayadi | Photo guideline va bir xil art direction |
| Stock race condition | Ortiqcha sotuv | Atomic DB transaction/RPC va concurrency test |
| Admin role noto‘g‘ri himoyalangan | Ma’lumotlar xavfi | Server-side RBAC + RLS + test |
| Yetkazish tarifi noaniq | Checkout’da noto‘g‘ri total | Rate settings va biznes tasdig‘i |
| Qaytarish siyosati yo‘q | Mijoz e’tirozi/huquqiy risk | Launch’dan oldin yozma policy tasdiqlash |
| AI-generated kod tekshirilmaydi | Bug/security debt | Kichik task, code review, test, staged rollout |
| Scope haddan tashqari kengayadi | Launch kechikadi | MVP scope freeze va change request jarayoni |

---

## 20. Ochiq qarorlar — loyiha egasi tasdiqlashi kerak

Quyidagi savollarga javoblar development boshida tasdiqlanishi kerak. Ular noma’lum bo‘lsa, tegishli modul konfiguratsion/adapter ko‘rinishida quriladi.

1. SARTO yakuniy brend nomimi yoki boshqa nom tanlanadimi?
2. Logo va original fashion fotografiyalar kim tomonidan tayyorlanadi?
3. Mahsulotlar qaysi kategoriyalardan boshlanadi va nechta SKU bo‘ladi?
4. Checkout guest uchun ochiq bo‘ladimi?
5. Login telefon OTP, email/password yoki ikkalasi orqali bo‘ladimi?
6. MVPda COD yetarlimi yoki online payment launch kunidayoq shartmi?
7. Yetkazib berish Toshkent ichida va viloyatlarga qanday tariflanadi?
8. Bepul yetkazib berish chegarasi bormi?
9. Qaytarish/almashtirish muddati va shartlari qanday?
10. Adminlar soni va rollari qanday?
11. Customer support qaysi kanal orqali ishlaydi: telefon, Telegram, email?
12. Analytics/marketing pixel ishlatiladimi va consent talabi qanday?

---

## 21. Stitch AI uchun UI generation prompt

Quyidagi prompt dizayn boshlash uchun. Stitch yaratgan natija ushbu hujjatdagi sahifalar va UX talablariga moslab tekshirilishi shart.

```text
Act as a senior product designer and design a complete premium menswear
 e-commerce experience for SARTO, a fashion brand serving Uzbekistan.

BRAND:
- Name: SARTO (working brand name)
- Audience: men, primarily 18–35
- Positioning: premium casual, smart casual, modern minimal fashion
- Market: Uzbekistan
- Visible UI language: Uzbek Latin only
- Currency: UZS

VISUAL DIRECTION:
- Editorial luxury fashion, restrained and timeless
- Colors: #111111, #292929, #EAE6DF, #B8A995, #FFFFFF
- Elegant serif display headings + clean sans-serif interface typography
- Large authentic menswear photography
- Generous whitespace, thin borders, refined hierarchy
- Avoid generic marketplace templates, neon colors, excessive gradients,
  excessive shadows and clutter

CREATE A CONSISTENT DESIGN SYSTEM AND THESE SCREENS:
1. Homepage
2. Shop listing with filters and sorting
3. Category listing
4. Product details with gallery, size/color selection and size guide
5. Search results and no-results state
6. Wishlist and empty state
7. Cart and empty state
8. Checkout with Uzbekistan address fields and order summary
9. Order confirmation
10. Login, registration and password recovery
11. Customer account, profile, addresses and orders
12. Admin dashboard
13. Admin product create/edit and inventory screens
14. Admin order list and order detail
15. About, Contact, FAQ, Delivery and Returns pages

IMPORTANT UX REQUIREMENTS:
- Design desktop, tablet and mobile states
- Include hover, focus, disabled, loading, empty, error and success states
- Use reusable components and consistent spacing
- Provide clear Uzbek CTA labels and form validation messages
- Product cards show image, name, price in UZS and wishlist action
- Filters include category, price, size, color and availability
- Checkout includes customer name, phone, region/city/district,
  street/address, delivery method and payment method
- Admin layouts must be practical and data-dense without losing the brand style
- Use realistic premium menswear content; no lorem ipsum
- Ensure the purchase journey is coherent from homepage to order confirmation

The output should look like a credible, polished premium fashion brand,
not a generic e-commerce template.
```

---

## 22. Yakuniy texnik qaror

SARTO MVP quyidagi ketma-ketlikda ishlab chiqiladi:

1. **Avval UI/UX:** Stitch’da Homepage, Shop, Product Details, Cart, Checkout va Admin screen’larini tasdiqlash.
2. **Keyin foundation:** Next.js setup, design system, Supabase connection, migrations va auth.
3. **Keyin commerce flow:** katalog → variant → cart → checkout → order.
4. **Keyin operations:** admin mahsulot, inventory va order boshqaruvi.
5. **So‘ng launch:** security, QA, content/legal policy, monitoring va deployment.
**Project Manager qarori:** MVP’da foydalanuvchi mahsulotni topishi, variantni tanlashi, savatchaga qo‘shishi va buyurtma berishi; admin esa mahsulot/qoldiq/buyurtmani boshqarishi — loyiha muvaffaqiyatining asosiy mezoni. Qolgan imkoniyatlar shu asosiy xarid oqimiga xalaqit bermasdan bosqichma-bosqich qo‘shiladi.

---

**Hujjat yakuni — SARTO Project TZ v1.0**
