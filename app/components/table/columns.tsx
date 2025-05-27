"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appwrite.types";
import StatusBadge from "../status-badge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmenteModal from "../appointment-modal";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Paciente",
    cell: ({ row: { original: appointment } }) => (
      <p className="text-14-medium">{appointment.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: appointment } }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={appointment.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Consulta",
    cell: ({ row: { original: appointment } }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(appointment.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doutor(a)",
    cell: ({ row: { original: appointment } }) => {
      const doctors = Doctors.find(
        (doc) => doc.name === appointment.primaryPhysician,
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctors?.image!}
            alt="Imagem do doutor(a)"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">Dr. {doctors?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row: { original: appointment } }) => {
      return (
        <div className="flex gap-1">
          <AppointmenteModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Consulta agendada"
            description="Por favor, confirme os seguintes detalhes para agendar."
          />

          <AppointmenteModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancelar consulta"
            description="Tem certeza de que deseja cancelar seu agendamento?"
          />
        </div>
      );
    },
  },
];
