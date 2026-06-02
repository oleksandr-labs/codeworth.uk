import { z } from "zod";

// ─── Contact form ──────────────────────────────────────────────────────────────

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(100, "Ім'я занадто довге")
    .transform((s) => s.trim()),
  contact: z
    .string()
    .min(5, "Вкажіть email або телефон")
    .max(200, "Контакт занадто довгий")
    .transform((s) => s.trim()),
  service: z.string().max(100).optional().transform((s) => s?.trim()),
  budget: z.string().max(100).optional().transform((s) => s?.trim()),
  message: z.string().max(2000).optional().transform((s) => s?.trim()),
  honeypot: z.string().max(0, "").optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

// ─── Newsletter ────────────────────────────────────────────────────────────────

export const NewsletterSchema = z.object({
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254, "Email занадто довгий")
    .transform((s) => s.trim().toLowerCase()),
  source: z.string().max(100).optional().transform((s) => s?.trim()),
});

export type NewsletterInput = z.infer<typeof NewsletterSchema>;

// ─── Order ─────────────────────────────────────────────────────────────────────

const OrderItemSchema = z.object({
  title: z.string().min(1).max(200),
  package: z.string().min(1).max(100),
  price: z.number().nonnegative(),
});

export const OrderSchema = z.object({
  firstName: z
    .string()
    .min(2, "Вкажіть ім'я")
    .max(100)
    .transform((s) => s.trim()),
  lastName: z
    .string()
    .min(2, "Вкажіть прізвище")
    .max(100)
    .transform((s) => s.trim()),
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254)
    .transform((s) => s.trim().toLowerCase()),
  phone: z
    .string()
    .min(7, "Введіть коректний телефон")
    .max(20)
    .transform((s) => s.trim()),
  company: z.string().max(200).optional().transform((s) => s?.trim()),
  businessName: z.string().max(200).optional().transform((s) => s?.trim()),
  domain: z.string().max(253).optional().transform((s) => s?.trim()),
  description: z.string().max(2000).optional().transform((s) => s?.trim()),
  wishes: z.string().max(2000).optional().transform((s) => s?.trim()),
  paymentMethod: z.string().min(1).max(100),
  items: z.array(OrderItemSchema).min(1, "Додайте хоча б один товар"),
  total: z.number().nonnegative(),
});

export type OrderInput = z.infer<typeof OrderSchema>;

// ─── Auth ──────────────────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254)
    .transform((s) => s.trim().toLowerCase()),
  password: z
    .string()
    .min(6, "Пароль має містити мінімум 6 символів")
    .max(128),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ─── Job application ───────────────────────────────────────────────────────────

export const ApplySchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(100)
    .transform((s) => s.trim()),
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254)
    .transform((s) => s.trim().toLowerCase()),
  position: z
    .string()
    .min(2, "Вкажіть бажану позицію")
    .max(200)
    .transform((s) => s.trim()),
  portfolioUrl: z
    .string()
    .url("Введіть коректне посилання")
    .max(500)
    .optional()
    .or(z.literal(""))
    .transform((s) => s?.trim() || undefined),
  coverLetter: z
    .string()
    .min(20, "Розкажіть про себе (мінімум 20 символів)")
    .max(3000, "Cover letter занадто довгий")
    .transform((s) => s.trim()),
  honeypot: z.string().max(0, "").optional(),
});

export type ApplyInput = z.infer<typeof ApplySchema>;

// ─── Partnership application ───────────────────────────────────────────────────

export const PartnershipSchema = z.object({
  name: z
    .string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(100)
    .transform((s) => s.trim()),
  email: z
    .string()
    .email("Введіть коректний email")
    .max(254)
    .transform((s) => s.trim().toLowerCase()),
  type: z.enum(["referral", "agency", "tech"], {
    error: () => "Оберіть тип партнерства",
  }),
  description: z
    .string()
    .min(20, "Розкажіть про себе (мінімум 20 символів)")
    .max(2000)
    .transform((s) => s.trim()),
  audience: z
    .string()
    .max(200)
    .optional()
    .transform((s) => s?.trim()),
  honeypot: z.string().max(0, "").optional(),
});

export type PartnershipInput = z.infer<typeof PartnershipSchema>;
