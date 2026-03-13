"use client";

import { motion } from "framer-motion";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0.3 };

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="min-h-[85vh] md:min-h-svh flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background opacity-60" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center md:text-left order-2 md:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <motion.p 
              className="section-label mb-3 md:mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.3 }}
            >
              Visual Artist
            </motion.p>
            
            <motion.h1 
              className="heading-l1 text-foreground mb-3 md:mb-4 leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.4 }}
            >
              Art Jan Elaine<br className="md:hidden" /> A. Ylanan
            </motion.h1>
            
            <motion.div 
              className="flex flex-col md:flex-row items-center md:gap-3 gap-1 text-muted-foreground"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.5 }}
            >
              <span className="font-body text-base md:text-lg">Cebu City, Philippines</span>
              <span className="hidden md:inline text-muted-foreground/40">•</span>
              <span className="font-body text-sm md:text-base text-muted-foreground/70">Based in PH</span>
            </motion.div>

            <motion.p 
              className="mt-6 md:mt-8 text-muted-foreground/80 font-body text-sm md:text-base max-w-md mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...spring, delay: 0.6 }}
            >
              Creating evocative artworks that blend emotion with visual storytelling.
            </motion.p>

            {/* Decorative line */}
            <motion.div 
              className="mt-6 md:mt-8 w-12 md:w-16 h-0.5 bg-primary/60 mx-auto md:mx-0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.3 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <motion.div 
                className="absolute -inset-3 md:-inset-4 rounded-full border border-primary/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              
              {/* Image container */}
              <motion.div
                className="relative w-36 h-36 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/media/artjan.jpg"
                  alt="Art Jan Elaine A. Ylanan - Visual Artist"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
