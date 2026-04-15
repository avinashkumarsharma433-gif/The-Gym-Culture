import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Users, Trophy, Activity, Zap, Shield, Award, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import CustomSelect from '../components/CustomSelect';

const Franchise = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phone: '', city: '', investment: '', message: '' };

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

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formState.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    if (!formState.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formState.investment) {
      newErrors.investment = 'Please select an investment range';
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
    
    if (!validateForm()) return;

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formState,
        type: 'franchise',
        created_at: new Date().toISOString()
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormState({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
      setErrors({ name: '', email: '', phone: '', city: '', investment: '', message: '' });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const benefits = [
    { title: "Proven Business Model", desc: "A scalable, high-margin model that has been tested and refined across 15+ locations.", icon: Shield },
    { title: "Marketing Support", desc: "Comprehensive digital and local marketing strategies to drive member acquisition from day one.", icon: Zap },
    { title: "Operational Training", desc: "Full training for your staff and management on our proprietary systems and culture.", icon: Users },
    { title: "Equipment Sourcing", desc: "Direct access to our network of top-tier equipment manufacturers at exclusive rates.", icon: Activity },
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Partner With Us</span>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-12 leading-none">
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                Start Your Own
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-brand block"
              >
                Gym Culture
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="max-w-3xl text-xl text-paper/60 font-light leading-relaxed"
            >
              Join India's fastest-growing fitness network. We are looking for passionate partners to help us reach our goal of 100 locations in 5 years.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden glass"
            >
              <img 
                src="https://images.unsplash.com/photo-1563122870-6b0b48a0af09?q=80&w=1000&auto=format&fit=crop" 
                alt="Gym Founder" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10">
                <p className="font-display text-4xl uppercase tracking-wide text-white mb-2">John Doe</p>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand font-bold">Founder & CEO</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-6 block font-bold">The Vision</span>
              <h2 className="font-display text-6xl uppercase tracking-tight mb-8 leading-none">
                Building a <br /> Legacy
              </h2>
              <div className="space-y-6 text-paper/60 font-light text-lg leading-relaxed">
                <p>
                  "When I started The Gym Culture, my goal wasn't just to open another fitness center. I wanted to create an environment where people felt empowered, supported, and driven to achieve their absolute best."
                </p>
                <p>
                  "Our franchise model is built on this exact philosophy. We don't just hand you a manual; we partner with you to build a community hub that transforms lives. Your success as a franchise owner is the true measure of our brand's strength."
                </p>
              </div>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-[2px] bg-brand" />
                <span className="font-display text-2xl uppercase tracking-widest text-white">Join the Family</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">The Advantage</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-6">Why Partner With Us?</h2>
            <p className="text-paper/60 font-light max-w-2xl mx-auto text-lg leading-relaxed">
              We don't just offer a franchise; we offer a proven ecosystem designed for rapid growth, high retention, and industry-leading profitability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Large Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass p-10 md:p-12 rounded-[3rem] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Shield className="w-12 h-12 text-brand mb-8 relative z-10" />
              <h3 className="font-display text-4xl uppercase mb-4 tracking-wide relative z-10">Proven Business Model</h3>
              <p className="text-paper/60 font-light text-lg leading-relaxed max-w-xl relative z-10">
                Our scalable, high-margin model has been tested and refined across multiple locations. We've optimized every aspect of the gym business, from floor layout to membership tiers, ensuring you have a clear path to profitability.
              </p>
            </motion.div>

            {/* Square Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass p-10 rounded-[3rem] relative overflow-hidden group hover:bg-brand/5 transition-all"
            >
              <Zap className="w-12 h-12 text-brand mb-8" />
              <h3 className="font-display text-3xl uppercase mb-4 tracking-wide">Marketing Power</h3>
              <p className="text-paper/60 font-light leading-relaxed">
                Comprehensive digital and local marketing strategies to drive member acquisition from day one.
              </p>
            </motion.div>

            {/* Square Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-10 rounded-[3rem] relative overflow-hidden group hover:bg-brand/5 transition-all"
            >
              <Users className="w-12 h-12 text-brand mb-8" />
              <h3 className="font-display text-3xl uppercase mb-4 tracking-wide">Elite Training</h3>
              <p className="text-paper/60 font-light leading-relaxed">
                Full training for your staff and management on our proprietary systems and culture.
              </p>
            </motion.div>

            {/* Large Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 glass p-10 md:p-12 rounded-[3rem] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:opacity-20 transition-opacity duration-500" />
              <Activity className="w-12 h-12 text-brand mb-8 relative z-10" />
              <h3 className="font-display text-4xl uppercase mb-4 tracking-wide relative z-10">Premium Equipment</h3>
              <p className="text-paper/60 font-light text-lg leading-relaxed max-w-xl relative z-10">
                Direct access to our network of top-tier equipment manufacturers at exclusive rates. We ensure your facility is outfitted with the best gear in the industry, maximizing member satisfaction and retention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment & Form */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="font-display text-7xl uppercase leading-none mb-10 tracking-tight">Investment <br /> Opportunity</h2>
              <p className="text-xl font-light mb-12 text-paper/60 leading-relaxed">
                We offer multiple franchise models ranging from compact neighborhood gyms to large-scale flagship facilities. Our team will guide you through site selection, design, and launch.
              </p>
              
              <div className="space-y-6 mb-16">
                {["Low Initial Investment", "Fast ROI (18-24 Months)", "Comprehensive Site Support", "Exclusive Territory Rights"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 glass rounded-full flex items-center justify-center text-brand">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-lg font-light text-paper/80">{item}</span>
                  </div>
                ))}
              </div>

              <div className="glass p-12 rounded-[3rem] border-brand/20">
                <h4 className="font-display text-3xl uppercase mb-4">Ready to start?</h4>
                <p className="text-paper/50 font-light mb-8">Fill out the form and our franchise development team will get in touch with you within 48 hours.</p>
                <div className="flex items-center gap-4 text-brand font-mono text-xs uppercase tracking-widest font-bold">
                  franchise@thegymculture.in <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-[4rem] shadow-2xl relative">
              <h3 className="font-display text-4xl uppercase mb-6 tracking-wide">Franchise Inquiry</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formState.phone}
                      onChange={(e) => {
                        setFormState({...formState, phone: e.target.value});
                        if (errors.phone) setErrors({...errors, phone: ''});
                      }}
                      placeholder="+91 98765 43210"
                      className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all text-base ${errors.phone ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                    />
                    {errors.phone && <p className="text-brand text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Target City</label>
                    <input 
                      type="text" 
                      value={formState.city}
                      onChange={(e) => {
                        setFormState({...formState, city: e.target.value});
                        if (errors.city) setErrors({...errors, city: ''});
                      }}
                      placeholder="Mumbai"
                      className={`w-full glass-dark border-white/5 rounded-2xl px-6 py-2.5 focus:outline-none transition-all text-base ${errors.city ? 'border-brand/50 focus:border-brand' : 'focus:border-white/20'}`}
                    />
                    {errors.city && <p className="text-brand text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Investment Range</label>
                  <CustomSelect 
                    value={formState.investment}
                    onChange={(value) => {
                      setFormState({...formState, investment: value});
                      if (errors.investment) setErrors({...errors, investment: ''});
                    }}
                    options={[
                      { value: '20-50', label: '₹20L - ₹50L' },
                      { value: '50-100', label: '₹50L - ₹1Cr' },
                      { value: '100+', label: '₹1Cr+' }
                    ]}
                    placeholder="Select Range"
                    error={!!errors.investment}
                  />
                  {errors.investment && <p className="text-brand text-xs mt-1">{errors.investment}</p>}
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold">Message / Background</label>
                  <textarea 
                    rows={3}
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({...formState, message: e.target.value});
                      if (errors.message) setErrors({...errors, message: ''});
                    }}
                    placeholder="Tell us about your business experience..."
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
                    <>Inquiry Sent <Check className="w-7 h-7" /></>
                  ) : (
                    <>Submit Inquiry <ArrowRight className="w-7 h-7" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Franchise;
