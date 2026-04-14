import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationsData } from '../data/locations';

const Locations = () => {
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
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Find Your Culture</span>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-8">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="block"
              >
                Our Locations
              </motion.span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {locationsData.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-[3rem] overflow-hidden group flex flex-col h-full"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={loc.image} 
                    alt={loc.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 glass px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold">
                    {loc.hours}
                  </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                  <h3 className="font-display text-4xl uppercase mb-6 tracking-wide group-hover:text-brand transition-colors">{loc.name}</h3>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    <div className="flex gap-4 text-paper/50">
                      <MapPin className="w-5 h-5 text-brand flex-shrink-0" />
                      <p className="text-sm font-light leading-relaxed">{loc.address}</p>
                    </div>
                    <div className="flex gap-4 text-paper/50">
                      <Phone className="w-5 h-5 text-brand flex-shrink-0" />
                      <p className="text-sm font-light">{loc.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-grow bg-brand text-white py-4 rounded-xl font-display text-xl uppercase tracking-widest hover:scale-[1.02] transition-all shadow-lg shadow-brand/20">
                      Join This Gym
                    </button>
                    <Link 
                      to={`/locations/${loc.id}`}
                      className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass h-[600px] rounded-[4rem] overflow-hidden relative border-brand/20">
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm z-10 flex items-center justify-center text-center p-10 pointer-events-none">
              <div className="max-w-md">
                <MapPin className="w-16 h-16 text-brand mx-auto mb-8 animate-bounce" />
                <h2 className="font-display text-5xl uppercase mb-4">Interactive Map</h2>
                <p className="text-paper/60 font-light">Explore all 15+ locations across the country and find the one nearest to you.</p>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.96253456789!2d72.8345678!3d19.2045678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6d65656565b%3A0x5656565656565656!2sKandivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              className="grayscale opacity-50"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
