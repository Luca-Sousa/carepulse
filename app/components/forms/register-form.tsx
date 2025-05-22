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
import { Doctors, GENDER_OPTIONS, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

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

          <div className="grid gap-6 xl:grid-cols-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Endereço"
              placeholder="Informe o seu endereço"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Profissão"
              placeholder="Informe a sua profissão"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Nome do Contato de Emergência"
              placeholder="Informe o nome do contato de emergência"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Número do Contato de Emergência"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Médicas</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Médico Primário"
            placeholder="Selecione um Médico"
          >
            {Doctors.map(({ image, name }) => (
              <SelectItem key={name} value={name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={image}
                    alt="Perfil do Doutor(a)"
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                  />
                  <p>{name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <div className="grid gap-6 xl:grid-cols-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Apólice de Seguros"
              placeholder="Informe a sua apólice de seguros"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Número da apólice de seguros"
              placeholder="Informe o número da apólice de seguros"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Alergias (se houver)"
              placeholder="Informe suas alergias"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Medicamentos Atuais (se houver)"
              placeholder="Informe os medicamentos que você está tomando atualmente"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Histórico Médico familiar (se relevante)"
              placeholder="Informe o histórico médico familiar"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Histórico Médico Passado"
              placeholder="Informe o seu histórico médico passado"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificação e Verificação</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Tipo de Identificação"
            placeholder="Selecione um tipo de identificação"
          >
            {IdentificationTypes.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Número de Identificação"
            placeholder="Informe o número de identificação"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Cópia Digitalizada do Documento de Identificação"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimento e Privacidade</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="Eu concordo em receber tratamento para minha condição de saúde."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Eu concordo com o uso e divulgação das minhas informações de saúde para fins de tratamento."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Reconheço que li e concordo com a política de privacidade"
          />
        </section>

        <SubmitButton isLoading={isLoading}>Começar</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
