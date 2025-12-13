"use client"

import Navbar from "./components/templates/Navbar";
import Banner from "./components/organisms/Banner";
import CalendarSection from "./components/organisms/CalendarSection";
import FAQSection from "./components/organisms/FAQSection";
import ContactSection from "./components/organisms/ContactSection";
import ProjectsGrid from "./components/organisms/ProjectsGrid";
import StudentsSection from "./components/organisms/StudentsSection";
import ReceptionSection from "./components/organisms/ReceptionSection";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar />
      <Banner />
      <ReceptionSection />
      <StudentsSection />
      <ProjectsGrid />
      <CalendarSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
