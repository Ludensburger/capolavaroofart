"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FramedArtwork from "./FramedArtwork";
import { artworks, type Artwork } from "@/data/artworks";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const filters = ["All", "Dry Media", "Paintings"];
const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedWork, setSelectedWork] = useState<Artwork | null>(null);

  const filtered = activeFilter === "All"
    ? artworks
    : artworks.filter((a) => a.series === activeFilter);

  return (
    <section id="gallery" className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <h2 className="section-label">Selected Works</h2>
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant="secondary"
                size="sm"
                onClick={() => setActiveFilter(f)}
                className={activeFilter === f ? "bg-foreground text-background" : ""}
              >
                {f}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Most Recent - Full Width */}
        {activeFilter === "All" && filtered.length > 0 && (
          <motion.div
            className="mb-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring }}
          >
            <span className="section-label mb-4 block self-start">Most Recent</span>
            <FramedArtwork
              src={filtered[0].url}
              alt={filtered[0].title}
              onClick={() => setSelectedWork(filtered[0])}
              className="max-h-[55vh] lg:max-h-[70vh] w-auto mx-auto object-contain"
            />
            <div className="mt-4 px-2 text-center w-full">
              <p className="font-display text-lg font-medium text-foreground">{filtered[0].title}</p>
              <p className="text-sm text-muted-foreground tnum">{filtered[0].year} · {filtered[0].medium}</p>
              <p className="text-xs text-muted-foreground/60 tnum mt-1">{filtered[0].dimensions}</p>
            </div>
          </motion.div>
        )}

        {/* Rest of artworks */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {(activeFilter === "All" ? filtered.slice(1) : filtered).map((work, i) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.06 }}
              className="break-inside-avoid"
            >
              <FramedArtwork
                src={work.url}
                alt={work.title}
                onClick={() => setSelectedWork(work)}
              />
              <div className="mt-3 px-1">
                <p className="font-display text-sm font-medium text-foreground">{work.title}</p>
                <p className="text-xs text-muted-foreground tnum">{work.year} · {work.medium}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedWork(null)}
            />
            <motion.div
              className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={spring}
            >
              <FramedArtwork
                src={selectedWork.url}
                alt={selectedWork.title}
                className="w-full"
              />
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-0 right-0 md:top-2 md:right-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="heading-l2 text-foreground">{selectedWork.title}</h3>
                <p className="mt-2 text-muted-foreground font-body tnum">
                  {selectedWork.year} · {selectedWork.medium}
                </p>
                <p className="mt-1 text-muted-foreground/60 font-body text-sm tnum">
                  {selectedWork.dimensions}
                </p>
                <p className="mt-6 body-prose text-foreground/80">{selectedWork.story}</p>
                <Button variant="hero" size="lg" className="mt-8 self-start">
                  Inquire About This Work
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
