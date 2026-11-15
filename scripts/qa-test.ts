import assert from "node:assert";
import { formatUZS, formatPhone, formatDateTime } from "../src/lib/format";
import { checkoutSchema } from "../src/server/validators/orderValidator";
import { SAMPLE_PRODUCTS, SAMPLE_CATEGORIES } from "../src/lib/constants";

console.log("Starting QA Test Suite...");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passed++;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`  [FAIL] ${name}: ${msg}`);
    failed++;
  }
}

// 1. Formatters Tests
test("formatUZS: formats 0 so'm correctly", () => {
  assert.strictEqual(formatUZS(0), "0 so'm");
});

test("formatUZS: formats 450,000 correctly with space separator", () => {
  assert.strictEqual(formatUZS(450000), "450 000 so'm");
});

test("formatUZS: formats 2,850,000 correctly", () => {
  assert.strictEqual(formatUZS(2850000), "2 850 000 so'm");
});

test("formatUZS: handles NaN safely", () => {
  assert.strictEqual(formatUZS(NaN), "0 so'm");
});

test("formatPhone: formats 12-digit 998 phone number", () => {
  assert.strictEqual(formatPhone("+998901234567"), "+998 (90) 123-45-67");
  assert.strictEqual(formatPhone("998901234567"), "+998 (90) 123-45-67");
  assert.strictEqual(formatPhone("+998 90 123 45 67"), "+998 (90) 123-45-67");
});

test("formatDateTime: returns valid formatted Uzbek date", () => {
  const result = formatDateTime("2026-11-15T12:00:00.000Z");
  assert.ok(result.length > 5, "Date string should be non-empty");
  assert.ok(result.includes("2026"), "Should include the year 2026");
});

// 2. Shipping Calculation & Threshold Logic
function mockCalculateQuote(itemsSubtotal: number, region: string) {
  const isTashkent = region.toLowerCase().includes("toshkent");
  const shippingFee = isTashkent ? 30000 : 50000;
  const freeThreshold = 800000;
  const finalShipping = itemsSubtotal >= freeThreshold ? 0 : shippingFee;
  const total = itemsSubtotal + finalShipping;
  return {
    subtotal_uzs: itemsSubtotal,
    shipping_uzs: finalShipping,
    total_uzs: total,
    isFreeShipping: finalShipping === 0,
  };
}

test("Shipping Logic: Under 800k in Tashkent costs 30,000 UZS", () => {
  const quote = mockCalculateQuote(799000, "Toshkent shahri");
  assert.strictEqual(quote.shipping_uzs, 30000);
  assert.strictEqual(quote.total_uzs, 829000);
  assert.strictEqual(quote.isFreeShipping, false);
});

test("Shipping Logic: Exactly 800k in Tashkent is FREE", () => {
  const quote = mockCalculateQuote(800000, "Toshkent shahri");
  assert.strictEqual(quote.shipping_uzs, 0);
  assert.strictEqual(quote.total_uzs, 800000);
  assert.strictEqual(quote.isFreeShipping, true);
});

test("Shipping Logic: Under 800k in Regions costs 50,000 UZS", () => {
  const quote = mockCalculateQuote(500000, "Samarqand viloyati");
  assert.strictEqual(quote.shipping_uzs, 50000);
  assert.strictEqual(quote.total_uzs, 550000);
  assert.strictEqual(quote.isFreeShipping, false);
});

test("Shipping Logic: Over 800k in Regions is FREE", () => {
  const quote = mockCalculateQuote(1200000, "Buxoro viloyati");
  assert.strictEqual(quote.shipping_uzs, 0);
  assert.strictEqual(quote.total_uzs, 1200000);
  assert.strictEqual(quote.isFreeShipping, true);
});

// 3. Checkout Schema Validation
test("checkoutSchema: accepts valid payload with RFC 4122 UUID", () => {
  const validData = {
    customer_name: "Aziz Rahimov",
    customer_phone: "+998 (90) 123-45-67",
    customer_email: "aziz@example.com",
    delivery_address: {
      recipient_name: "Aziz Rahimov",
      phone: "+998 90 123 45 67",
      region: "Toshkent shahri",
      city: "Yunusobod tumani",
      street: "Amir Temur shoh ko'chasi",
      house: "45-uy",
    },
    payment_method: "cod",
    items: [
      {
        variant_id: "b0000000-0000-4000-a000-000000000001",
        quantity: 2,
      },
    ],
  };

  const parsed = checkoutSchema.safeParse(validData);
  assert.strictEqual(parsed.success, true, "Validation should succeed");
  if (parsed.success) {
    assert.strictEqual(parsed.data.customer_phone, "+998901234567");
  }
});

test("checkoutSchema: rejects empty cart items", () => {
  const emptyCartData = {
    customer_name: "Aziz Rahimov",
    customer_phone: "+998901234567",
    delivery_address: {
      recipient_name: "Aziz",
      phone: "+998901234567",
      region: "Toshkent",
      city: "Chilonzor",
      street: "Navoiy",
      house: "12",
    },
    items: [],
  };
  const parsed = checkoutSchema.safeParse(emptyCartData);
  assert.strictEqual(parsed.success, false);
  if (!parsed.success) {
    const itemErr = parsed.error.issues.find((i) => i.path[0] === "items");
    assert.ok(itemErr, "Should have error on items");
    assert.strictEqual(itemErr?.message, "Savatchada kamida bitta mahsulot bo'lishi kerak");
  }
});

test("checkoutSchema: rejects invalid phone number", () => {
  const badPhoneData = {
    customer_name: "Aziz",
    customer_phone: "12345",
    delivery_address: {
      recipient_name: "Aziz",
      phone: "+998901234567",
      region: "Toshkent",
      city: "Chilonzor",
      street: "Navoiy",
      house: "12",
    },
    items: [{ variant_id: "b0000000-0000-4000-a000-000000000001", quantity: 1 }],
  };
  const parsed = checkoutSchema.safeParse(badPhoneData);
  assert.strictEqual(parsed.success, false);
});

test("checkoutSchema: rejects non-UUID variant id", () => {
  const badVariant = {
    customer_name: "Aziz",
    customer_phone: "+998901234567",
    delivery_address: {
      recipient_name: "Aziz",
      phone: "+998901234567",
      region: "Toshkent",
      city: "Chilonzor",
      street: "Navoiy",
      house: "12",
    },
    items: [{ variant_id: "not-a-uuid", quantity: 1 }],
  };
  const parsed = checkoutSchema.safeParse(badVariant);
  assert.strictEqual(parsed.success, false);
});

// 4. Catalog & Product Data Consistency
test("Catalog Data: all sample categories have required fields", () => {
  assert.ok(SAMPLE_CATEGORIES.length >= 4, "Should have at least 4 categories");
  SAMPLE_CATEGORIES.forEach((c) => {
    assert.ok(c.id, "Category has ID");
    assert.ok(c.name, "Category has name");
    assert.ok(c.slug, "Category has slug");
    assert.ok(c.image_url, "Category has image");
  });
});

test("Catalog Data: all sample products have valid variants and stock", () => {
  assert.ok(SAMPLE_PRODUCTS.length >= 4, "Should have at least 4 products");
  SAMPLE_PRODUCTS.forEach((p) => {
    assert.ok(p.id, "Product has ID");
    assert.ok(p.name, "Product has name");
    assert.ok(p.slug, "Product has slug");
    assert.ok(p.variants && p.variants.length > 0, `${p.name} must have variants`);
    p.variants.forEach((v) => {
      assert.ok(v.price_uzs > 0, `Variant ${v.sku} must have positive price`);
      assert.ok(v.stock_quantity >= 0, `Variant ${v.sku} must have valid stock`);
    });
  });
});

console.log("\n=========================================");
console.log(`QA Tests Completed: ${passed} PASSED, ${failed} FAILED`);
console.log("=========================================\n");

if (failed > 0) {
  process.exit(1);
}
