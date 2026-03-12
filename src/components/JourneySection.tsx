import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import profileImg from "@/assets/profile.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork8 from "@/assets/artwork-8.jpg";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface VignetteProps {
  label: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const Vignette = ({ label, title, text, image, imageAlt, reverse }: VignetteProps) => (
  <motion.div
    className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ ...spring, duration: 0.6 }}
  >
    <div className={reverse ? "md:[direction:ltr]" : ""}>
      <span className="section-label">{label}</span>
      <h3 className="heading-l2 text-foreground mt-2">{title}</h3>
      <p className="body-prose text-foreground/80 mt-4">{text}</p>
    </div>
    <div className={`frame-artwork ${reverse ? "md:[direction:ltr]" : ""}`}>
      <img src={image} alt={imageAlt} className="w-full h-auto block" loading="lazy" />
    </div>
  </motion.div>
);

const JourneySection = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: profileRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="journey" className="px-6">
      <div className="max-w-5xl mx-auto space-y-[20vh]">
        <Vignette
          label="Beginnings"
          title="Roots in Raw Material"
          text="Growing up surrounded by the quiet intensity of Midwestern landscapes, she found her voice through charcoal before she could articulate it in words. Early works—raw, unresolved, urgent—emerged from a basement studio with nothing but compressed sticks and salvaged paper. These formative pieces laid the groundwork for a lifelong exploration of gesture and restraint."
          image={artwork2}
          imageAlt="Early botanical study"
        />

        <Vignette
          label="Breakthroughs"
          title="Recognition and Resolve"
          text="A solo exhibition at the Crane Arts Building in 2019 marked a turning point. Critics noted the 'architectural intensity' of her large-scale charcoal works, and the Museum of Contemporary Drawing acquired Untitled I for its permanent collection. The Ford Foundation Fellowship followed, enabling a year of uninterrupted studio practice that produced the acclaimed 'Threshold' series."
          image={artwork5}
          imageAlt="Nocturne in Red"
          reverse
        />

        <div ref={profileRef}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...spring, duration: 0.6 }}
          >
            <div>
              <span className="section-label">Studio Now</span>
              <h3 className="heading-l2 text-foreground mt-2">Present Tense</h3>
              <p className="body-prose text-foreground/80 mt-4">
                Working from a converted warehouse in Red Hook, Brooklyn, she divides her time between
                large-scale charcoal works and intimate painted studies. The studio practice is methodical:
                mornings for drawing, afternoons for painting, evenings for looking. Current work explores
                the tension between material presence and pictorial absence—surfaces that hold the memory
                of every mark, even those erased.
              </p>
            </div>
            <div className="overflow-hidden rounded-sm">
              <motion.img
                src={profileImg}
                alt="Artist in studio"
                className="w-full h-auto block grayscale"
                style={{ y }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
