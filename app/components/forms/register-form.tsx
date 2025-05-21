"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl } from "@/app/components/ui/form";
import CustomFormField from "./custom-form-field";
import SubmitButton from "./submit-button";
import { useState } from "react";
import { userFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./patient-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GENDER_OPTIONS } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
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

    console.log(name, email, phone);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">Bem-Vindo👋</h1>
          <p className="text-dark-700">Conte-nos mais sobre você.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Pessoais</h2>
          </div>
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

        <div className="grid gap-6 xl:grid-cols-2">
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
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Data de Nascimento"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GENDER_OPTIONS.map(({ value, label }, i) => (
                    <div key={value + i} className="radio-group">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2"></div>

        <div className="grid gap-6 xl:grid-cols-2"></div>

        <div className="grid gap-6 xl:grid-cols-2"></div>

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
