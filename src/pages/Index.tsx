import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import JourneySection from "@/components/JourneySection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import FooterSection from "@/components/FooterSection";
import DotNav from "@/components/DotNav";

const sectionIds = ["hero", "gallery", "journey", "about", "events", "contact"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <DotNav activeSection={activeSection} />
      <main>
        <HeroSection />
        <GallerySection />
        <JourneySection />
        <AboutSection />
        <EventsSection />
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
