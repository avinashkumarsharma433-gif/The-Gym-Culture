import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
// @ts-ignore
import { GestureHandling } from 'leaflet-gesture-handling';
import { locationsData, LocationData } from '../data/locations';

// Attach gesture handling to Leaflet Map
L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);

// Custom MapPin Icon using Lucide React's SVG path
const customIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div class="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 hover:scale-110">
          <div class="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-lg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Component to handle map interactions and bounds
const MapController = ({ activeLocation }: { activeLocation: LocationData | null }) => {
  const map = useMap();

  useEffect(() => {
    if (activeLocation && activeLocation.coordinates) {
      map.flyTo([activeLocation.coordinates.lat, activeLocation.coordinates.lng], 14, {
        duration: 1.5
      });
    }
  }, [activeLocation, map]);

  return null;
};

const Locations = () => {
  const [activeLocation, setActiveLocation] = useState<LocationData | null>(null);

  // India bounds
  const indiaBounds = L.latLngBounds(
    L.latLng(6.5, 68.1), // South-West
    L.latLng(35.5, 97.3) // North-East
  );

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
          <div className="glass h-[600px] rounded-[4rem] overflow-hidden relative border-brand/20 z-0">
            <MapContainer 
              center={[20.5937, 78.9629]} // Center of India
              zoom={5} 
              minZoom={5}
              maxZoom={14}
              maxBounds={indiaBounds}
              maxBoundsViscosity={1.0}
              scrollWheelZoom={true}
              gestureHandling={true}
              className="w-full h-full z-0"
              style={{ background: '#0a0a0a' }} // Match dark theme
            >
              {/* CartoDB Dark Matter Base Map - Only outlines, roads, and major labels */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              
              <MapController activeLocation={activeLocation} />

              {locationsData.map((loc) => (
                loc.coordinates && (
                  <Marker 
                    key={loc.id}
                    position={[loc.coordinates.lat, loc.coordinates.lng]}
                    icon={customIcon}
                    eventHandlers={{
                      click: () => setActiveLocation(loc),
                    }}
                  >
                  </Marker>
                )
              ))}
            </MapContainer>

            {/* Active Location Popup Overlay */}
            <AnimatePresence>
              {activeLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[1000] pointer-events-auto"
                >
                  <div className="glass-dark rounded-3xl p-6 border border-brand/30 shadow-2xl shadow-black/50 relative overflow-hidden bg-ink/90 backdrop-blur-xl">
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
                        <h3 className="font-display text-2xl uppercase tracking-wide mb-2 text-white">{activeLocation.name}</h3>
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
                  className="absolute top-10 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
                >
                  <div className="bg-ink/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-2xl">
                    <p className="text-white/80 font-light text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand" />
                      Click on any marker to explore our locations
                    </p>
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
