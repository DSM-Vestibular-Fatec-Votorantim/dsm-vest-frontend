"use client"

import Navbar from "./components/templates/Navbar";
import Banner from "./components/organisms/Banner";
import Card from "./components/molecules/Card";
import CalendarSection from "./components/organisms/CalendarSection";
import FAQSection from "./components/organisms/FAQSection";
import ContactSection from "./components/organisms/ContactSection";
import Carousel from "./components/organisms/ReceptionSection";
import ProjectsGrid from "./components/organisms/ProjectsGrid";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar />
      <Banner />

      <section className="w-full flex flex-col items-center">
        {/* Carousel */}
        <div className="w-full">
          <Carousel />
        </div>

        {/* Grid de projetos */}
        <div className="max-w-6xl w-full px-4 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Projetos das Turmas
          </h2>
          <ProjectsGrid />
        </div>
      </section>


      <CalendarSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
