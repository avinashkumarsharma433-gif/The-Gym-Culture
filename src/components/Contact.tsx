import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { locationsData, LocationData } from '../data/locations';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CustomSelect from './CustomSelect';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom MapPin Icon
const customIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `<div class="relative flex items-center justify-center w-10 h-10 transition-transform duration-300 hover:scale-110">
          <div class="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand"></div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E90102" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-lg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const Contact = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '', location: '' });

  // India bounds
  const indiaBounds = L.latLngBounds(
    L.latLng(6.5, 68.1), // South-West
    L.latLng(35.5, 97.3) // North-East
  );

  useEffect(() => {
    if (location.state && location.state.selectedLocation) {
      setFormState(prev => ({ ...prev, location: location.state.selectedLocation }));
      
      // Smooth scroll to form section
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '', location: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', subject: '', message: '', location: '' };

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formState.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formState.location) {
      newErrors.location = 'Please select a location';
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, 'inquiries'), {
          ...formState,
          type: 'contact',
          created_at: new Date().toISOString()
        });
        
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
        setFormState({ name: '', email: '', subject: '', message: '', location: '' });
        setErrors({ name: '', email: '', subject: '', message: '', location: '' });
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("There was an error submitting your form. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-6 block font-bold">Get in touch</span>
            <h2 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-8 leading-none">Contact <br /> Us</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-2xl uppercase mb-2 tracking-wide">Main HQ</h4>
                  <p className="text-paper/40 font-light text-lg leading-relaxed">
                    Sector 8, Kandivali,<br /> Mumbai, Maharashtra 400067
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-2xl uppercase mb-2 tracking-wide">Call Us</h4>
                  <p className="text-paper/40 font-light text-lg">+91 98765 43210</p>
                  <p className="text-paper/40 font-light text-lg">+91 98765 43211</p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all duration-500">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-2xl uppercase mb-2 tracking-wide">Email Us</h4>
                  <p className="text-paper/40 font-light text-lg">info@thegymculture.in</p>
                  <p className="text-paper/40 font-light text-lg">support@thegymculture.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="font-display text-4xl uppercase mb-6 tracking-wide">Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Full Name</label>
                <input 
                  type="text" 
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({...formState, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  placeholder="Your Name"
                  className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all text-base ${errors.name ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                />
                {errors.name && <p className="text-brand text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Email Address</label>
                <input 
                  type="email" 
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({...formState, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  placeholder="Your Email"
                  className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all text-base ${errors.email ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                />
                {errors.email && <p className="text-brand text-xs mt-1">{errors.email}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Subject</label>
                <input 
                  type="text" 
                  value={formState.subject}
                  onChange={(e) => {
                    setFormState({...formState, subject: e.target.value});
                    if (errors.subject) setErrors({...errors, subject: ''});
                  }}
                  placeholder="Your Subject"
                  className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all text-base ${errors.subject ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                />
                {errors.subject && <p className="text-brand text-xs mt-1">{errors.subject}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Preferred Location</label>
                <CustomSelect 
                  value={formState.location}
                  onChange={(value) => {
                    setFormState({...formState, location: value});
                    if (errors.location) setErrors({...errors, location: ''});
                  }}
                  options={locationsData.map(loc => ({ value: loc.name, label: loc.name }))}
                  placeholder="Select Your Location"
                  error={!!errors.location}
                />
                {errors.location && <p className="text-brand text-xs mt-1">{errors.location}</p>}
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Message</label>
                <textarea 
                  rows={3}
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({...formState, message: e.target.value});
                    if (errors.message) setErrors({...errors, message: ''});
                  }}
                  placeholder="Your Message"
                  className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all resize-none text-base leading-relaxed ${errors.message ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                ></textarea>
                {errors.message && <p className="text-brand text-xs mt-1">{errors.message}</p>}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-4 font-display text-xl md:text-2xl uppercase tracking-widest transition-all gap-4 ${isSubmitted ? 'bg-emerald-500/80 rounded-full backdrop-blur-md text-white border-emerald-500/50 box-shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center' : 'btn-glow'}`}
              >
                {isSubmitted ? (
                  <>Message Sent <Check className="w-7 h-7" /></>
                ) : (
                  <>Send Message <ArrowRight className="w-7 h-7" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass h-[500px] rounded-[3rem] overflow-hidden relative border-brand/20 z-0 w-full"
        >
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            minZoom={5}
            maxZoom={14}
            maxBounds={indiaBounds}
            maxBoundsViscosity={1.0}
            scrollWheelZoom={true}
            gestureHandling={true}
            className="w-full h-full z-0"
            style={{ background: '#0a0a0a' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {locationsData.map((loc) => (
              loc.coordinates && (
                <Marker 
                  key={loc.id}
                  position={[loc.coordinates.lat, loc.coordinates.lng]}
                  icon={customIcon}
                />
              )
            ))}
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
