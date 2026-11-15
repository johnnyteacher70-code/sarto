import { z } from "zod";

export const checkoutSchema = z.object({
  customer_name: z.string().min(2, "Ism-familiyangizni kiriting"),
  customer_phone: z
    .string()
    .transform((val) => val.replace(/[\s()\-]/g, ""))
    .refine(
      (val) => /^(\+?998)?[0-9]{9}$/.test(val),
      "Telefon raqami formati noto'g'ri (masalan: +998901234567)"
    ),
  customer_email: z.string().email("Email formati noto'g'ri").optional().or(z.literal("")),
  delivery_address: z.object({
    recipient_name: z.string().min(2, "Qabul qiluvchi ismini kiriting"),
    phone: z
      .string()
      .transform((val) => val.replace(/[\s()\-]/g, ""))
      .refine((val) => val.length >= 9, "Telefon raqamini kiriting"),
    region: z.string().min(2, "Viloyat yoki shaharni tanlang"),
    city: z.string().min(2, "Tuman yoki shaharni kiriting"),
    district: z.string().optional(),
    street: z.string().min(2, "Ko'cha nomini kiriting"),
    house: z.string().min(1, "Uy raqamini kiriting"),
    apartment: z.string().optional(),
    landmark: z.string().optional(),
  }),
  payment_method: z.enum(["cod", "card", "manual"]).default("cod"),
  customer_note: z.string().max(500, "Izoh 500 belgidan oshmasligi kerak").optional(),
  items: z
    .array(
      z.object({
        variant_id: z.string().uuid("Variant ID noto'g'ri"),
        quantity: z.number().int().positive("Miqdor 1 dan kam bo'lmasligi kerak"),
      })
    )
    .min(1, "Savatchada kamida bitta mahsulot bo'lishi kerak"),
  idempotency_key: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
