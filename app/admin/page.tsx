import Image from "next/image";
import Link from "next/link";
import StatCard from "../components/stat-card";

const Admin = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={162}
            height={32}
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Bem Vindo 👋</h1>
          <p className="text-dark-700">
            Comece o dia gerenciando novos agendamentos, consultas e muito mais.
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={5}
            label="consultas agendados"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={10}
            label="Consultas pendentes"
            icon="/assets/icons/pending.svg"
          />

          <StatCard
            type="cancelled"
            count={2}
            label="consultas canceladas"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
