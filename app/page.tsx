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

      <CalendarSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
