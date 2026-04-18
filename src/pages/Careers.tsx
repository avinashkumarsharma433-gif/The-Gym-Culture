import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, ArrowRight, Star, Heart, Zap } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';

const Careers = () => {
  const [formState, setFormState] = useState({ 
    name: '', email: '', phone: '', city: '', experience: '', interest: '', link: '', message: '' 
  });
  const benefits = [
    { title: "Competitive Salary", desc: "Top-tier compensation packages with performance bonuses.", icon: Star },
    { title: "Health & Wellness", desc: "Free premium gym membership for you and a family member.", icon: Heart },
    { title: "Career Growth", desc: "Regular training, certifications, and clear progression paths.", icon: Zap },
    { title: "Great Culture", desc: "Work with passionate, driven individuals in an energetic environment.", icon: Briefcase },
  ];

  const positions = [
    { title: "Senior Fitness Trainer", location: "Mumbai (Multiple Locations)", type: "Full-time" },
    { title: "Gym Manager", location: "Borivali, Mumbai", type: "Full-time" },
    { title: "Front Desk Executive", location: "Haridwar, Uttarakhand", type: "Full-time" },
    { title: "Group Class Instructor (Zumba)", location: "Kandivali, Mumbai", type: "Part-time" },
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
            className="text-center"
          >
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Join Our Team</span>
            <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-8">
              Build Your <span className="text-brand">Career</span><br /> With Us
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-paper/60 font-light leading-relaxed">
              We are always looking for passionate, driven individuals to join The Gym Culture family. If you live and breathe fitness, we want you on our side.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 border-y border-white/5 relative z-10 glass-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl uppercase tracking-tight mb-4">Why Work With Us?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] text-center group transition-all"
              >
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-8 mx-auto transition-all">
                  <benefit.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-display text-xl uppercase mb-4 tracking-wide">{benefit.title}</h3>
                <p className="text-paper/50 font-light text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Hiring Now</span>
            <h2 className="font-display text-6xl uppercase tracking-tight">Open Positions</h2>
          </div>
          
          <div className="space-y-6">
            {positions.map((pos, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand/30 transition-all group cursor-pointer"
              >
                <div>
                  <h3 className="font-display text-3xl uppercase mb-2 group-hover:text-brand transition-colors">{pos.title}</h3>
                  <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-paper/60">{pos.location}</span>
                    <span className="text-brand px-3 py-1 bg-brand/10 rounded-full">{pos.type}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand group-hover:text-white transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 border-t border-white/5 relative z-10 glass-dark">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl uppercase tracking-tight mb-6">Don't see your role?</h2>
          <p className="text-paper/60 font-light text-lg mb-12">
            Send us your resume anyway. We are always on the lookout for great talent.
          </p>
          <div className="glass p-8 md:p-12 rounded-[3rem] text-left">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Full Name</label>
                  <input type="text" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light" placeholder="John Doe" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Email Address</label>
                  <input type="email" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Phone Number</label>
                  <input type="tel" value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Current City</label>
                  <input type="text" value={formState.city} onChange={e => setFormState({...formState, city: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light" placeholder="Mumbai" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Area of Interest</label>
                  <CustomSelect 
                    value={formState.interest}
                    onChange={(value) => setFormState({...formState, interest: value})}
                    options={[
                      { value: 'Personal Trainer', label: 'Personal Trainer' },
                      { value: 'Gym Manager', label: 'Gym Manager' },
                      { value: 'Sales & Marketing', label: 'Sales & Marketing' },
                      { value: 'Front Desk / Admin', label: 'Front Desk / Admin' },
                      { value: 'Other', label: 'Other' }
                    ]}
                    placeholder="Select Role"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Years of Experience</label>
                  <CustomSelect 
                    value={formState.experience}
                    onChange={(value) => setFormState({...formState, experience: value})}
                    options={[
                      { value: 'Fresher', label: 'Fresher (0 years)' },
                      { value: '1-3 Years', label: '1-3 Years' },
                      { value: '3-5 Years', label: '3-5 Years' },
                      { value: '5+ Years', label: '5+ Years' }
                    ]}
                    placeholder="Select Experience"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Link to Resume / LinkedIn</label>
                <input type="url" value={formState.link} onChange={e => setFormState({...formState, link: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light" placeholder="https://..." />
              </div>
              
              <div>
                <label className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30 font-bold ml-4 mb-2 block">Why do you want to join us?</label>
                <textarea rows={3} value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} className="w-full glass-dark border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand transition-colors font-light resize-none" placeholder="Tell us about yourself and why you're a good fit..."></textarea>
              </div>

              <button className="btn-glow w-full py-5 rounded-2xl font-display text-xl uppercase tracking-widest transition-all mt-4">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
