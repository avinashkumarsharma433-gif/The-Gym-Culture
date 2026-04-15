import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationsData, LocationData } from '../data/locations';

const Locations = () => {
  const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);

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

      {/* Interactive Map Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass h-[600px] rounded-[4rem] overflow-hidden relative border-brand/20">
            {/* Abstract Map Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink/80"></div>
            
            {/* Map Markers */}
            {locationsData.map((loc) => (
              loc.coordinates && (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(loc)}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
                >
                  <div className={`relative flex items-center justify-center w-12 h-12 transition-transform duration-300 ${activeLocation?.id === loc.id ? 'scale-125' : 'hover:scale-110'}`}>
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${activeLocation?.id === loc.id ? 'bg-brand' : 'bg-white'}`}></div>
                    <MapPin className={`w-8 h-8 drop-shadow-lg ${activeLocation?.id === loc.id ? 'text-brand' : 'text-white group-hover:text-brand transition-colors'}`} />
                  </div>
                  <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 glass-dark rounded-full text-xs font-mono font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {loc.name}
                  </span>
                </button>
              )
            ))}

            {/* Active Location Popup */}
            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30"
                >
                  <div className="glass-dark rounded-3xl p-6 border border-brand/30 shadow-2xl shadow-black/50 relative overflow-hidden">
                    <button 
                      onClick={() => setActiveLocation(null)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex gap-6 items-center">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={activeLocation.image} alt={activeLocation.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl uppercase tracking-wide mb-2">{activeLocation.name}</h3>
                        <p className="text-paper/60 text-sm mb-4 line-clamp-2">{activeLocation.address}</p>
                        <Link 
                          to={`/locations/${activeLocation.id}`}
                          className="inline-flex items-center gap-2 text-brand text-sm font-bold uppercase tracking-wider hover:text-white transition-colors"
                        >
                          View Details <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Initial Prompt (shows when no location is selected) */}
            <AnimatePresence>
              {!activeLocation && (
                <motion.div 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center text-center p-10 pointer-events-none"
                >
                  <div className="max-w-md bg-ink/40 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                    <MapPin className="w-12 h-12 text-brand mx-auto mb-6 animate-bounce" />
                    <h2 className="font-display text-3xl uppercase mb-3">Interactive Map</h2>
                    <p className="text-paper/60 font-light text-sm">Click on any marker to explore our locations across the country.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
