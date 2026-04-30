import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Courses from "@/components/landing/Courses";
import AdmissionForm from "@/components/landing/AdmissionForm";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

const WHATSAPP_NUMBER = "917449858122"; // +91 7449858122

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-testid="landing-page" className="relative overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Courses />
        <AdmissionForm />
      </main>
      <Footer whatsappNumber={WHATSAPP_NUMBER} />
      <WhatsAppButton number={WHATSAPP_NUMBER} />
    </div>
  );
}
