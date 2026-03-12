export interface WorkshopEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: string;
  capacity: number;
  spotsLeft: number;
  description: string;
  details: string[];
  whatToBring: string[];
  image: string;
  category: "workshop" | "exhibition" | "talk";
}

export const events: WorkshopEvent[] = [
  {
    id: "dry-media-fundamentals",
    title: "Dry Media Fundamentals",
    subtitle: "Charcoal, Graphite & Conte",
    date: "April 12, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Studio Marchetti",
    address: "Via della Pergola 24, Florence, Italy",
    price: "€120",
    capacity: 12,
    spotsLeft: 4,
    description:
      "A full-day immersion into the expressive power of dry media. Explore mark-making, tonal range, and composition through charcoal, graphite, and conté crayon on large-format paper.",
    details: [
      "Morning: Material properties & mark-making exercises",
      "Midday: Still life study — building form through value",
      "Afternoon: Expressive drawing from live model reference",
      "Closing: Group critique & portfolio discussion",
    ],
    whatToBring: [
      "Sketchbook (any size)",
      "Comfortable clothing (charcoal is messy!)",
      "Lunch — coffee & snacks provided",
    ],
    image: "/placeholder.svg",
    category: "workshop",
  },
  {
    id: "color-theory-in-practice",
    title: "Color Theory in Practice",
    subtitle: "Oil & Acrylic Painting",
    date: "May 3, 2026",
    time: "11:00 AM – 5:00 PM",
    location: "Galleria Novecento",
    address: "Piazza Santa Croce 8, Florence, Italy",
    price: "€150",
    capacity: 10,
    spotsLeft: 7,
    description:
      "Unlock the language of color. This workshop bridges classical color theory with contemporary painting techniques, using limited palettes to achieve rich, vibrant compositions.",
    details: [
      "Color mixing masterclass — from primaries to complex hues",
      "Temperature, value, and saturation exercises",
      "Painting session: landscape from photographic reference",
      "Individual feedback and next-steps coaching",
    ],
    whatToBring: [
      "Apron or old clothes",
      "Reference photos (optional)",
      "All materials provided",
    ],
    image: "/placeholder.svg",
    category: "workshop",
  },
  {
    id: "gallery-talk-process",
    title: "Artist Talk: Process & Intention",
    subtitle: "An evening with Art Jan Elaine A. Ylanan",
    date: "April 25, 2026",
    time: "7:00 PM – 9:00 PM",
    location: "Libreria Brac",
    address: "Via dei Vagellai 18r, Florence, Italy",
    price: "Free",
    capacity: 40,
    spotsLeft: 18,
    description:
      "Join Elena for an intimate evening discussing her creative process, the role of materiality in her work, and navigating the contemporary art world as an independent artist.",
    details: [
      "40-minute presentation with slides of recent work",
      "Behind-the-scenes studio footage",
      "Open Q&A with the audience",
      "Wine & networking after",
    ],
    whatToBring: ["Curiosity", "Questions welcome"],
    image: "/placeholder.svg",
    category: "talk",
  },
  {
    id: "summer-intensive",
    title: "Summer Drawing Intensive",
    subtitle: "5-Day Studio Residency",
    date: "June 15–19, 2026",
    time: "9:00 AM – 3:00 PM daily",
    location: "Studio Marchetti",
    address: "Via della Pergola 24, Florence, Italy",
    price: "€480",
    capacity: 8,
    spotsLeft: 2,
    description:
      "A week-long deep dive into observational drawing. Small group, intensive mentorship, daily critiques. Ideal for intermediate to advanced artists seeking focused studio time.",
    details: [
      "Day 1: Gesture & proportion — building a drawing practice",
      "Day 2: Light & shadow — tonal drawing techniques",
      "Day 3: Texture & surface — mixed dry media approaches",
      "Day 4: Composition & narrative — creating visual stories",
      "Day 5: Personal project development & final critique",
    ],
    whatToBring: [
      "Personal drawing supplies (list provided upon registration)",
      "Lunch each day",
      "Portfolio for review (optional)",
    ],
    image: "/placeholder.svg",
    category: "workshop",
  },
];
