"use client";

import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";
import FramedArtwork from "./FramedArtwork";
import { artworks } from "@/data/artworks";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const HeroSection = () => {
  return (
    <section id="hero" className="min-h-svh flex items-center justify-center relative px-6 py-24">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <div>
            <h1 className="heading-l1 text-foreground">Art Jan Elaine A. Ylanan</h1>
            <p className="mt-2 text-muted-foreground font-body text-lg">
              Artist
            </p>
            <p className="text-muted-foreground/60 font-body text-sm tnum mt-1">
              Cebu City, PH
            </p>
          </div>

          <motion.div
            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <img
              src={profileImg.src}
              alt="Artist portrait"
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
