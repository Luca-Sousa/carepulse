import AppointmentForm from "@/app/components/forms/appointment-form";
import { getPacient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPacient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            type="create"
          />

          <p className="copyright py-12">© 2025 Care Pulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        alt="Imagem de consulta"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
