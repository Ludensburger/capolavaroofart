"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const sections = [
  // { id: "hero", label: "Hero" },
  { id: "gallery", label: "Works" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "contact", label: "Contact" },
];

interface DotNavProps {
  activeSection: string;
  onNavigate?: (section: string) => void;
}

const DotNav = ({ activeSection, onNavigate }: DotNavProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onNavigate?.(id);
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredId === section.id;

        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative flex items-center justify-end group"
            aria-label={`Navigate to ${section.label}`}
          >
            <motion.div
              className="flex items-center gap-2 overflow-hidden rounded-full"
              initial={false}
              animate={{
                backgroundColor: isActive
                  ? "hsl(var(--primary))"
                  : isHovered
                  ? "hsl(var(--foreground) / 0.1)"
                  : "transparent",
                paddingLeft: isHovered ? 12 : 0,
                paddingRight: isHovered ? 12 : 0,
              }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            >
              {isHovered && (
                <motion.span
                  className="text-xs font-display font-medium tracking-wide uppercase whitespace-nowrap"
                  style={{ color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))" }}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.label}
                </motion.span>
              )}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-primary"
                    : isHovered
                    ? "bg-foreground/60"
                    : "bg-foreground/30"
                }`}
              />
            </motion.div>
          </button>
        );
      })}
    </nav>
  );
};

export default DotNav;
