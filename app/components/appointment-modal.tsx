"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/appointment-form";
import { Appointment } from "@/types/appwrite.types";

interface AppointmenteModalProps {
  patientId: string;
  userId: string;
  appointment: Appointment;
  type: "schedule" | "cancel";
  title: string;
  description: string;
}

const AppointmenteModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}: AppointmenteModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"}`}
        >
          {type}
        </Button>
      </DialogTrigger>

      <DialogContent className="shad-dialog sm:max-w-md xl:max-w-lg">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">
            Consulta {type === "schedule" ? "agendada" : "cancelada"}
          </DialogTitle>
          <DialogDescription>
            Por favor, preencha os seguintes detalhes para{" "}
            {type === "schedule" ? "agendar" : "cancelar"} uma consulta
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          patientId={patientId}
          userId={userId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmenteModal;
