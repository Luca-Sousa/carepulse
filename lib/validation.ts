import { z } from "zod";

export const userFormValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "O nome deve ter pelo menos 2 caracteres.",
    })
    .max(50, { message: "O nome deve ter no máximo 50 caracteres." }),
  email: z.string().email("Email inválido."),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido.",
    ),
});

export type UserFormValidation = z.infer<typeof userFormValidation>;
