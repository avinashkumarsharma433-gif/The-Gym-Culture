import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Check, 
  ChevronDown
} from 'lucide-react';
import { locationsData } from '../data/locations';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CustomSelect from './CustomSelect';

const Contact = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '', location: '' });

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

            <div className="glass h-[400px] rounded-[3rem] overflow-hidden relative border-brand/20">
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
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
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
                  placeholder="Membership Inquiry"
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
                  placeholder="Select a Location"
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
                  placeholder="Tell us how we can help..."
                  className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all resize-none text-base leading-relaxed ${errors.message ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                ></textarea>
                {errors.message && <p className="text-brand text-xs mt-1">{errors.message}</p>}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-4 rounded-2xl font-display text-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${isSubmitted ? 'bg-emerald-500 text-white' : 'bg-brand text-white hover:scale-[1.02] shadow-2xl shadow-brand/20'}`}
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
      </div>
    </section>
  );
};

export default Contact;
