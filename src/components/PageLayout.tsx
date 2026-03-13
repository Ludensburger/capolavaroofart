"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import DotNav from "./DotNav";
import ThemeToggle from "./ThemeToggle";

const sections = ["gallery", "about", "events", "contact"];

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("gallery");

  const handleSetActive = useCallback((section: string) => {
    setActiveSection(section);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <DotNav activeSection={activeSection} onNavigate={handleSetActive} />
      <ThemeToggle />
      {children}
    </>
  );
}
