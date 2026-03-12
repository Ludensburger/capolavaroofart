import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { Button } from "./ui/button";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const categoryColors: Record<string, string> = {
  workshop: "bg-primary text-primary-foreground",
  exhibition: "bg-foreground text-background",
  talk: "bg-muted text-foreground",
};

const EventsSection = () => {
  return (
    <section id="events" className="py-24 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">Workshops & Events</span>
          <h2 className="heading-l2 text-foreground mt-2">
            Learn, Create, Connect
          </h2>
          <p className="body-prose text-muted-foreground mt-4 max-w-xl">
            Intimate workshops and talks designed to deepen your practice.
            Small groups, hands-on guidance, real studio experience.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...spring, delay: i * 0.1 }}
            >
              <Link
                to={`/events/${event.id}`}
                className="group block bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span
                      className={`inline-block text-[10px] font-display font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${categoryColors[event.category]}`}
                    >
                      {event.category}
                    </span>
                    <h3 className="font-display text-lg font-medium text-foreground mt-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mt-1">
                      {event.subtitle}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-lg font-bold text-primary">
                      {event.price}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground font-body">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {event.spotsLeft} spots left
                  </span>
                </div>

                <p className="mt-4 text-sm text-muted-foreground font-body line-clamp-2">
                  {event.description}
                </p>

                <div className="mt-5 flex items-center gap-1 text-xs font-display font-medium tracking-wide uppercase text-primary group-hover:gap-2 transition-all">
                  See Details & Register
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
