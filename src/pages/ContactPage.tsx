import React from 'react';
import { motion } from 'motion/react';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Connect With Us</span>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-8">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="block"
              >
                Get In Touch
              </motion.span>
            </h1>
            <p className="max-w-2xl mx-auto text-paper/40 font-light text-xl">
              Have questions about memberships, franchises, or our facilities? Our team is here to help you on your fitness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Component */}
      <Contact />
    </div>
  );
};

export default ContactPage;
