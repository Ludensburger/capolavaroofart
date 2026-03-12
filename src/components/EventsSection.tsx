"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import type { WorkshopEvent } from '@/data/events';
import Link from 'next/link';

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

interface EventsSectionProps {
  events: WorkshopEvent[];
}

const EventsSection: React.FC<EventsSectionProps> = ({ events }) => {
  // Find the nearest upcoming event
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const featuredEvent = sortedEvents.find(event => new Date(event.date) > new Date());
  const otherEvents = sortedEvents.filter(event => new Date(event.date) > new Date()).slice(1);

  return (
    <section id="events" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <span className="section-label">Events</span>
          <h2 className="heading-l2 text-foreground mt-2">Workshops & Talks</h2>
        </motion.div>

        {/* Featured Event */}
        {featuredEvent && (
          <motion.div
            className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-medium uppercase tracking-wide">
                  {featuredEvent.category}
                </span>
                {featuredEvent.spotsLeft <= 5 && (
                  <span className="text-red-500 text-xs font-medium">
                    Only {featuredEvent.spotsLeft} spots left
                  </span>
                )}
              </div>
              <h3 className="heading-l3 text-foreground">{featuredEvent.title}</h3>
              <p className="text-muted-foreground mt-1">{featuredEvent.subtitle}</p>
              
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{featuredEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{featuredEvent.capacity} max · {featuredEvent.spotsLeft} spots available</span>
                </div>
              </div>

              <p className="mt-4 body-prose text-foreground/80">{featuredEvent.description}</p>

              <div className="mt-6 flex items-center gap-4">
                <Link href={`/events/${featuredEvent.id}`}>
                  <Button variant="hero" size="lg">
                    Register — {featuredEvent.price}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Events Grid */}
        {otherEvents.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-sm font-medium tracking-wide uppercase text-muted-foreground mb-6">
              Upcoming Events
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="group border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: 0.1 + index * 0.05 }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-primary font-medium uppercase tracking-wide">
                        {event.category}
                      </span>
                      <span className="text-xs text-muted-foreground tnum">{event.date}</span>
                    </div>
                    <h4 className="font-display font-medium text-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{event.subtitle}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{event.price}</span>
                      <Link href={`/events/${event.id}`}>
                        <Button variant="secondary" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;