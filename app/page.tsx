"use client"

import Navbar from "./components/templates/Navbar";
import Banner from "./components/organisms/Banner";
import Card from "./components/molecules/Card";
import CalendarSection from "./components/organisms/CalendarSection";
import FAQSection from "./components/organisms/FAQSection";
import ContactSection from "./components/organisms/ContactSection";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar />
      <Banner />

      <section className="w-full max-w-6xl mt-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Professor(a)" description="Informações sobre o docente" />
        <Card title="Direção" description="Equipe de gestão acadêmica" />
        <Card title="Coordenadores" description="Responsáveis pelos cursos" />
      </section>

      <CalendarSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
