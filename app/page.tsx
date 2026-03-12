import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import EventsSection from "@/components/EventsSection";
import FooterSection from "@/components/FooterSection";
import PageLayout from "@/components/PageLayout";
import { events } from "@/data/events";

export default function Home() {
  return (
    <PageLayout>
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <EventsSection events={events} />
        <FooterSection />
      </main>
    </PageLayout>
  );
}
