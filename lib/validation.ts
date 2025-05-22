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

export const patientFormValidation = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido",
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "O endereço deve ter no mínimo 5 caracteres")
    .max(500, "O endereço deve ter no máximo 500 caracteres"),
  occupation: z
    .string()
    .min(2, "A ocupação deve ter no mínimo 2 caracteres")
    .max(500, "A ocupação deve ter no máximo 500 caracteres"),
  emergencyContactName: z
    .string()
    .min(2, "O nome do contato de emergência deve ter no mínimo 2 caracteres")
    .max(
      50,
      "O nome do contato de emergência deve ter no máximo 50 caracteres",
    ),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Número de telefone de emergência inválido",
    ),
  primaryPhysician: z.string().min(2, "Selecione pelo menos um médico"),
  insuranceProvider: z
    .string()
    .min(2, "O nome do convênio deve ter no mínimo 2 caracteres")
    .max(50, "O nome do convênio deve ter no máximo 50 caracteres"),
  insurancePolicyNumber: z
    .string()
    .min(2, "O número da apólice deve ter no mínimo 2 caracteres")
    .max(50, "O número da apólice deve ter no máximo 50 caracteres"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z.boolean().refine((value) => value === true, {
    message: "Você deve consentir com o tratamento para continuar",
  }),
  disclosureConsent: z.boolean().refine((value) => value === true, {
    message:
      "Você deve consentir com o compartilhamento de informações para continuar",
  }),
  privacyConsent: z.boolean().refine((value) => value === true, {
    message: "Você deve consentir com a política de privacidade para continuar",
  }),
});

export type UserFormValidation = z.infer<typeof userFormValidation>;
export type PatientFormValidation = z.infer<typeof patientFormValidation>;
