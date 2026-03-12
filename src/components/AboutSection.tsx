"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const exhibitions = [
  { year: "2024", title: "Threshold: New Works", venue: "Pace Gallery, New York" },
  { year: "2023", title: "Drawing Now", venue: "Centre Pompidou, Paris" },
  { year: "2023", title: "Material Witness", venue: "ICA Philadelphia" },
  { year: "2022", title: "Charcoal and Light", venue: "Dia Beacon, New York" },
  { year: "2021", title: "Solo Exhibition", venue: "White Cube, London" },
  { year: "2019", title: "Emerging Voices", venue: "Crane Arts Building, Philadelphia" },
];

const awards = [
  "Ford Foundation Fellowship, 2020",
  "MacDowell Colony Residency, 2021",
  "Pollock-Krasner Foundation Grant, 2022",
  "Rome Prize in Visual Arts, 2023",
];

const press = [
  { publication: "Artforum", title: "The Gestural Sublime", year: "2024" },
  { publication: "Frieze", title: "Material and Memory", year: "2023" },
  { publication: "The New York Times", title: "Drawing as Architecture", year: "2022" },
];

const testimonials = [
  {
    quote: "Her work possesses a rare architectural quality—each mark builds upon the last with the precision of a master builder, yet the result feels entirely organic.",
    author: "Sarah Chen",
    role: "Curator, Museum of Contemporary Drawing",
  },
  {
    quote: "In an era of digital saturation, her commitment to the physicality of charcoal on linen feels both urgent and timeless.",
    author: "Marcus Webb",
    role: "Art Critic, Artforum",
  },
  {
    quote: "The scale is monumental, but the intimacy is what stays with you. These are drawings that breathe.",
    author: "Elena Vasquez",
    role: "Director, Pace Gallery",
  },
];

const AboutSection = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>("exhibitions");
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const toggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">About</span>
          <h2 className="heading-l2 text-foreground mt-2">Art Jan Elaine A. Ylanan</h2>
          <p className="body-prose text-foreground/80 mt-6">
            Art Jan Elaine A. Ylanan (b. 1982, Chicago, IL) is a Artist working primarily in charcoal,
            conté, and oil paint. Her practice investigates the intersection of gesture and structure,
            drawing on traditions of Abstract Expressionism while maintaining a rigorous engagement with
            material process. She holds an MFA from Yale School of Art and has exhibited internationally.
            She lives and works in Brooklyn, New York.
          </p>
        </motion.div>

        {/* Expandable CV sections */}
        <div className="mt-12 space-y-0 border-t border-border">
          {[
            {
              key: "exhibitions",
              label: "Selected Exhibitions",
              content: (
                <div className="space-y-3">
                  {exhibitions.map((e, i) => (
                    <div key={i} className="flex gap-4 items-baseline">
                      <span className="text-sm tnum text-muted-foreground w-12 shrink-0">{e.year}</span>
                      <div>
                        <span className="font-display text-sm font-medium text-foreground">{e.title}</span>
                        <span className="text-sm text-muted-foreground ml-2">{e.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              key: "awards",
              label: "Awards & Residencies",
              content: (
                <ul className="space-y-2">
                  {awards.map((a, i) => (
                    <li key={i} className="text-sm font-body text-foreground/80">{a}</li>
                  ))}
                </ul>
              ),
            },
            {
              key: "press",
              label: "Press",
              content: (
                <div className="space-y-3">
                  {press.map((p, i) => (
                    <div key={i} className="flex gap-4 items-baseline">
                      <span className="text-sm tnum text-muted-foreground w-12 shrink-0">{p.year}</span>
                      <div>
                        <span className="font-display text-sm font-medium text-foreground italic">{p.publication}</span>
                        <span className="text-sm text-muted-foreground ml-2">"{p.title}"</span>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
          ].map((section) => (
            <div key={section.key} className="border-b border-border">
              <button
                onClick={() => toggle(section.key)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="font-display text-sm font-medium tracking-wide uppercase text-foreground">
                  {section.label}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                    expandedSection === section.key ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === section.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6">{section.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">Words</span>
          <div className="mt-6 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={testimonialIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border-l-2 border-primary pl-6"
              >
                <p className="body-prose text-foreground/80 italic text-lg leading-relaxed">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <footer className="mt-4">
                  <span className="font-display text-sm font-medium text-foreground">
                    {testimonials[testimonialIndex].author}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {testimonials[testimonialIndex].role}
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="flex gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === testimonialIndex ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
