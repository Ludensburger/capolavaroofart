import artworkHero from "@/assets/artwork-hero.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";
import artwork6 from "@/assets/artwork-6.jpg";
import artwork7 from "@/assets/artwork-7.jpg";
import artwork8 from "@/assets/artwork-8.jpg";

export interface Artwork {
  id: string;
  url: string;
  title: string;
  year: string;
  medium: string;
  series: string;
  dimensions: string;
  story: string;
}

export const artworks: Artwork[] = [
  {
    id: "1",
    url: artworkHero,
    title: "Untitled III",
    year: "2024",
    medium: "Charcoal and gesso on linen",
    series: "Dry Media",
    dimensions: "72 × 96 in.",
    story: "This piece emerged from a period of sustained mark-making, each gesture responding to the last. The linen ground absorbs and resists in equal measure, creating a dialogue between control and surrender.",
  },
  {
    id: "2",
    url: artwork2,
    title: "Botanical Study IV",
    year: "2023",
    medium: "Ink and watercolor on paper",
    series: "Paintings",
    dimensions: "24 × 30 in.",
    story: "Part of an ongoing investigation into organic form. The ink finds its own paths through the wet pigment, and I follow rather than lead.",
  },
  {
    id: "3",
    url: artwork3,
    title: "Meridian",
    year: "2024",
    medium: "Oil on canvas",
    series: "Paintings",
    dimensions: "48 × 64 in.",
    story: "Inspired by the light over desert landscapes at the boundary between day and night. The horizon line dissolves into pure color.",
  },
  {
    id: "4",
    url: artwork4,
    title: "Still Life with Shadows",
    year: "2023",
    medium: "Charcoal and conté on paper",
    series: "Dry Media",
    dimensions: "30 × 40 in.",
    story: "The vase becomes a vessel for exploring negative space. Each form casts a shadow that creates its own composition.",
  },
  {
    id: "5",
    url: artwork5,
    title: "Nocturne in Red",
    year: "2024",
    medium: "Acrylic on canvas",
    series: "Paintings",
    dimensions: "60 × 60 in.",
    story: "A meditation on darkness and warmth. The crimson field pulses between depth and surface, inviting prolonged looking.",
  },
  {
    id: "6",
    url: artwork6,
    title: "Verdant Memory",
    year: "2023",
    medium: "Watercolor and gouache on paper",
    series: "Paintings",
    dimensions: "22 × 28 in.",
    story: "Memory of a garden, filtered through time. The colors soften as they recede, like a landscape viewed through frosted glass.",
  },
  {
    id: "7",
    url: artwork7,
    title: "Gesture VII",
    year: "2024",
    medium: "Sumi ink on rice paper",
    series: "Dry Media",
    dimensions: "36 × 48 in.",
    story: "Each stroke is a single breath. The ink's viscosity and the paper's absorbency determine the final form as much as the hand that guides the brush.",
  },
  {
    id: "8",
    url: artwork8,
    title: "Fault Line",
    year: "2023",
    medium: "Encaustic and oil on panel",
    series: "Paintings",
    dimensions: "40 × 52 in.",
    story: "The crackled surface echoes geological time. Layers of wax and pigment build up and fracture, revealing strata of color beneath.",
  },
];
