"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/ui/form";
import CustomFormField from "./custom-form-field";
import SubmitButton from "./submit-button";
import { useState } from "react";
import { userFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserFormValidation>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({ name, email, phone }: UserFormValidation) => {
    setIsLoading(true);

    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);
      // if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá 👋</h1>
          <p className="text-dark-700">Comece com os compromissos.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Nome Completo"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Ícone de usuário"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="Ícone de email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Telefone"
        />

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
