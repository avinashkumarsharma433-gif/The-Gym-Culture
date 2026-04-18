import React from 'react';
import { motion } from 'motion/react';
import Contact from '../components/Contact';
import { locationsData } from '../data/locations';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

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

      {/* Locations List */}
      <section className="py-16 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="font-display text-5xl uppercase tracking-tight">Our Locations</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationsData.map((loc) => (
               <a 
                 key={loc.id} 
                 href={`/locations/${loc.id}`}
                 className="glass p-8 rounded-3xl group border-transparent hover:border-brand/30 transition-all block"
               >
                 <h3 className="font-display text-2xl uppercase mb-4 tracking-wide group-hover:text-brand transition-colors">{loc.name}</h3>
                 <div className="space-y-3 font-light text-sm text-paper/60 mb-8">
                   <div className="flex gap-2 items-start"><MapPin className="w-4 h-4 shrink-0 text-white/40 group-hover:text-brand" /> {loc.address}</div>
                   <div className="flex gap-2 items-start"><Phone className="w-4 h-4 shrink-0 text-white/40 group-hover:text-brand" /> {loc.phone}</div>
                   <div className="flex gap-2 items-start"><Clock className="w-4 h-4 shrink-0 text-white/40 group-hover:text-brand" /> {loc.hours}</div>
                 </div>
                 <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-widest font-bold">
                   Visit Branch <ArrowRight className="w-4 h-4" />
                 </div>
               </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Component */}
      <Contact />
    </div>
  );
};

export default ContactPage;
