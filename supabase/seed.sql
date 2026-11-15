-- ==============================================================================
-- SARTO E-Commerce Platform — Seed Data
-- ==============================================================================

-- 1. SHOP SETTINGS
INSERT INTO public.shop_settings (key, value) VALUES
('general', '{
    "store_name": "SARTO Menswear",
    "phone": "+998 71 200 00 00",
    "email": "info@sarto.uz",
    "address": "Toshkent shahri, Amir Temur ko''chasi, 12-uy",
    "shipping_fee_tashkent": 30000,
    "shipping_fee_regions": 50000,
    "free_shipping_threshold": 800000
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 2. CATEGORIES
INSERT INTO public.categories (id, name, slug, description, sort_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'Ko''ylaklar', 'koylaklar', 'Klassik va zamonaviy uslubdagi premium paxta ko''ylaklar', 1, true),
('c1000000-0000-0000-0000-000000000002', 'Kostyum va Shimlar', 'kostyum-va-shimlar', 'Italiya jun matosidan tikilgan sifatli kostyumlar va klassik shimlar', 2, true),
('c1000000-0000-0000-0000-000000000003', 'Ustki kiyimlar', 'ustki-kiyimlar', 'Palto, trench va charm kurtkalar to''plami', 3, true),
('c1000000-0000-0000-0000-000000000004', 'Polo va Trikotaj', 'polo-va-trikotaj', 'Yuqori sifatli pima paxta pololar va kashmir jemperlar', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 3. PRODUCTS
INSERT INTO public.products (id, category_id, name, slug, sku, description, material, care_instructions, status, is_featured, is_new) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'Oxford Slim-Fit Oq Ko''ylak',
    'oxford-slim-fit-oq-koylak',
    'SRT-SH-001',
    '100% tabiiy paxtadan tayyorlangan, nafas oluvchi va shaklini mukammal saqlaydigan klassik ko''ylak. Kundalik ish va tantanali tadbirlar uchun ideal tanlov.',
    '100% Misr paxtasi (Egyptian Cotton)',
    '30°C da nozik yuvish, past haroratda dazmollash',
    'active',
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'To''q Ko''k Premium Jun Kostyum',
    'toq-kok-premium-jun-kostyum',
    'SRT-SU-002',
    'Klassik ikki tugmali, nafis qirqimli Italiya jun matosidan tikilgan kostyum. To''liq viskoza astar va qo''l choki detallari bilan boyitilgan.',
    '100% Super 130s Merino juni, astar: 100% viskoza',
    'Faqat quruq tozalash (dry clean)',
    'active',
    true,
    false
),
(
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000003',
    'Kashmir Aralashmali Bej Palto',
    'kashmir-aralashmali-bej-palto',
    'SRT-OT-003',
    'Kuz va qish mavsumi uchun nafis siluetli, issiq va yengil palto. Qulay ichki cho''ntaklar va qimmatbaho tugmalar.',
    '80% Tabiiy jun, 20% Kashmir',
    'Faqat kimyoviy tozalash',
    'active',
    true,
    true
),
(
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000004',
    'Klassik Pima Paxta Polo',
    'klassik-pima-paxta-polo',
    'SRT-PL-004',
    'Yengil, ipakdek mayin teginishga ega pima paxtadan tikilgan nafis polo. Yuvilganda o''z rangini va shaklini yo''qotmaydi.',
    '100% Pima paxta',
    '30°C da mashinada yuvish mumkin',
    'active',
    false,
    true
)
ON CONFLICT (id) DO NOTHING;

-- 4. PRODUCT VARIANTS (Narxlar UZS butun son ko'rinishida)
INSERT INTO public.product_variants (product_id, sku, size, color_name, color_hex, price_uzs, compare_at_price_uzs, stock_quantity, is_active) VALUES
-- Ko'ylak variantlari
('p1000000-0000-0000-0000-000000000001', 'SRT-SH-001-M-WHT', 'M', 'Oq', '#FFFFFF', 450000, 520000, 15, true),
('p1000000-0000-0000-0000-000000000001', 'SRT-SH-001-L-WHT', 'L', 'Oq', '#FFFFFF', 450000, 520000, 12, true),
('p1000000-0000-0000-0000-000000000001', 'SRT-SH-001-XL-WHT', 'XL', 'Oq', '#FFFFFF', 450000, 520000, 8, true),

-- Kostyum variantlari
('p1000000-0000-0000-0000-000000000002', 'SRT-SU-002-48-NVY', '48 (M)', 'To''q ko''k', '#1B263B', 2850000, 3200000, 5, true),
('p1000000-0000-0000-0000-000000000002', 'SRT-SU-002-50-NVY', '50 (L)', 'To''q ko''k', '#1B263B', 2850000, 3200000, 7, true),
('p1000000-0000-0000-0000-000000000002', 'SRT-SU-002-52-NVY', '52 (XL)', 'To''q ko''k', '#1B263B', 2850000, 3200000, 4, true),

-- Palto variantlari
('p1000000-0000-0000-0000-000000000003', 'SRT-OT-003-M-BGE', 'M', 'Bej', '#D7C4B7', 1950000, 2300000, 6, true),
('p1000000-0000-0000-0000-000000000003', 'SRT-OT-003-L-BGE', 'L', 'Bej', '#D7C4B7', 1950000, 2300000, 8, true),

-- Polo variantlari
('p1000000-0000-0000-0000-000000000004', 'SRT-PL-004-M-BLK', 'M', 'Qora', '#111111', 320000, NULL, 20, true),
('p1000000-0000-0000-0000-000000000004', 'SRT-PL-004-L-BLK', 'L', 'Qora', '#111111', 320000, NULL, 18, true)
ON CONFLICT (sku) DO NOTHING;
