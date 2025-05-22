"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/components/ui/form";
import CustomFormField from "./custom-form-field";
import SubmitButton from "./submit-button";
import { useState } from "react";
import {
  getAppointmentSchema,
  userFormValidation,
  UserFormValidation,
} from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./patient-form";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { z } from "zod";
import { createAppointment } from "@/lib/actions/appointment.actions";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: AppointmentType;
}

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const appointmentFormValidation = getAppointmentSchema(type);
  type AppointmentFormValidation = z.infer<typeof appointmentFormValidation>;

  const form = useForm<AppointmentFormValidation>({
    resolver: zodResolver(appointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: AppointmentFormValidation) => {
    setIsLoading(true);

    let status: Status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset(),
            router.push(
              `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`,
            );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = "Criar Consulta";
      break;
    case "cancel":
      buttonLabel = "Cancelar Consulta";
      break;
    case "schedule":
      buttonLabel = "Agendar Consulta";
      break;
    default:
      buttonLabel = "Criar Consulta";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Nova Consulta</h1>
          <p className="text-dark-700">
            Solicite uma nova consulta em 10 segundos.
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doutor"
              placeholder="Selecione um Doutor"
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

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data prevista da consulta"
              showTimeSelect
              dateFormat="dd/MM/yyyy - HH:mm"
            />

            <div
              className={`grid gap-6 ${type === "create" && "xl:grid-cols-2"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Motivo da Consulta"
                placeholder="Check-up mensal anual"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comentários/notas"
                placeholder="Prefiro consultas à tarde, se possível"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Motivo do Cancelamento"
            placeholder="Surgiu uma reunião urgente"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
