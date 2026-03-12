import { motion } from "framer-motion";
import FramedArtwork from "./FramedArtwork";
import profileImg from "@/assets/profile.jpg";
import { artworks } from "@/data/artworks";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const HeroSection = () => {
  const heroWork = artworks[0];

  return (
    <section id="hero" className="min-h-svh flex items-center justify-center relative px-6 py-24">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, duration: 0.8 }}
        >
          <FramedArtwork
            src={heroWork.url}
            alt={heroWork.title}
            enableTilt
            className="max-w-4xl mx-auto"
          />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          <div>
            <h1 className="heading-l1 text-foreground">{heroWork.title}</h1>
            <p className="mt-2 text-muted-foreground font-body text-lg">
              <span className="tnum">{heroWork.year}</span>. {heroWork.medium}
            </p>
            <p className="text-muted-foreground/60 font-body text-sm tnum mt-1">{heroWork.dimensions}</p>
          </div>

          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <img
              src={profileImg}
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
