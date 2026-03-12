import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  Package,
} from "lucide-react";
import { events } from "@/data/events";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const spring = { type: "spring" as const, duration: 0.5, bounce: 0 };

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="heading-l2 text-foreground">Event not found</h1>
          <Link to="/" className="text-primary font-display text-sm mt-4 inline-block hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration:", { event: event.id, ...form });
    setSubmitted(true);
    toast({
      title: "Registration received!",
      description: `You're signed up for ${event.title}. We'll send confirmation to ${form.email}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/#events"
            className="inline-flex items-center gap-1.5 text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          {/* Category badge */}
          <span className="inline-block text-[10px] font-display font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
            {event.category}
          </span>

          <h1 className="heading-l1 text-foreground mt-4">{event.title}</h1>
          <p className="text-lg text-muted-foreground font-body mt-2">
            {event.subtitle}
          </p>

          {/* Key info grid */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: CalendarDays, label: "Date", value: event.date },
              { icon: Clock, label: "Time", value: event.time },
              { icon: MapPin, label: "Location", value: event.location },
              { icon: Users, label: "Spots Left", value: `${event.spotsLeft} of ${event.capacity}` },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-muted/50 rounded-lg p-4 border border-border"
              >
                <item.icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-[10px] font-display font-medium tracking-[0.08em] uppercase text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-display font-medium text-foreground mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Price banner */}
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-display font-medium tracking-[0.08em] uppercase text-muted-foreground">
                Registration Fee
              </p>
              <p className="text-2xl font-display font-bold text-primary mt-0.5">
                {event.price}
              </p>
            </div>
            <p className="text-xs text-muted-foreground font-body">
              {event.address}
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left: Details */}
          <motion.div
            className="md:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.1 }}
          >
            <div>
              <h2 className="heading-l2 text-foreground text-xl">About This Event</h2>
              <p className="body-prose text-muted-foreground mt-3">
                {event.description}
              </p>
            </div>

            <div>
              <h3 className="font-display text-sm font-medium tracking-wide uppercase text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                What We'll Cover
              </h3>
              <ul className="mt-3 space-y-2">
                {event.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground font-body pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-primary/40"
                  >
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-medium tracking-wide uppercase text-foreground flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                What to Bring
              </h3>
              <ul className="mt-3 space-y-2">
                {event.whatToBring.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground font-body pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-muted-foreground/30"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Registration form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
          >
            <div className="sticky top-8 bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-base font-medium text-foreground">
                Register Now
              </h3>
              <p className="text-xs text-muted-foreground font-body mt-1">
                {event.spotsLeft} spots remaining
              </p>

              {submitted ? (
                <div className="mt-6 text-center py-8">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto" />
                  <p className="font-display text-sm font-medium text-foreground mt-3">
                    You're registered!
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-1">
                    Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "phone", label: "Phone (optional)", type: "tel" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="text-[10px] font-display font-medium tracking-[0.08em] uppercase text-muted-foreground block mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) =>
                          setForm({ ...form, [field.key]: e.target.value })
                        }
                        className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                        required={field.key !== "phone"}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-display font-medium tracking-[0.08em] uppercase text-muted-foreground block mb-1">
                      Notes (optional)
                    </label>
                    <textarea
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      rows={3}
                      className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    type="submit"
                    className="w-full mt-3"
                  >
                    Register — {event.price}
                  </Button>
                  <p className="text-[10px] text-muted-foreground font-body text-center mt-2">
                    You'll receive a confirmation email with payment details.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
