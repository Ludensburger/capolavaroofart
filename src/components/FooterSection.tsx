import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };

const FooterSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", medium: "" });
  const [newsletter, setNewsletter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log("Inquiry submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          {/* Inquiry Form */}
          <div>
            <span className="section-label">Inquire</span>
            <h2 className="heading-l2 text-foreground mt-2">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-display font-medium tracking-wide uppercase text-muted-foreground block mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-display font-medium tracking-wide uppercase text-muted-foreground block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-display font-medium tracking-wide uppercase text-muted-foreground block mb-1.5">
                  Interest
                </label>
                <select
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select a category</option>
                  <option value="acquisition">Acquisition</option>
                  <option value="commission">Commission</option>
                  <option value="exhibition">Exhibition</option>
                  <option value="press">Press</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-display font-medium tracking-wide uppercase text-muted-foreground block mb-1.5">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  required
                />
              </div>
              <Button variant="hero" size="lg" type="submit" className="mt-4">
                Send Inquiry
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

          {/* Links & Newsletter */}
          <div>
            <div>
              <span className="section-label">Shop</span>
              <div className="mt-4 space-y-3">
                <a
                  href="#"
                  className="block font-display text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Limited Edition Prints →
                </a>
                <a
                  href="#"
                  className="block font-display text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Original Works on Paper →
                </a>
                <a
                  href="#"
                  className="block font-display text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Exhibition Catalogues →
                </a>
              </div>
            </div>

            <div className="mt-12">
              <span className="section-label">Newsletter</span>
              <p className="body-prose text-muted-foreground mt-2 text-sm">
                Studio updates, exhibition announcements, and new work—delivered quarterly.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={newsletter}
                  onChange={(e) => setNewsletter(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent border-b border-border py-2 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-colors"
                />
                <Button variant="hero" size="default">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="mt-12">
              <span className="section-label">Connect</span>
              <div className="mt-4 flex gap-6">
                <a href="#" className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-sm font-display font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Studio Visits
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © <span className="tnum">2024</span> Elena Marchetti. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            All artwork images are protected under copyright law.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
