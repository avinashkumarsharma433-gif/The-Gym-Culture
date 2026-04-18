import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Trophy, Activity, Zap, Heart, Shield, Award } from 'lucide-react';

const About = () => {
  const values = [
    { title: "Accessibility", desc: "Fitness should be available to everyone, regardless of their location or budget.", icon: Zap },
    { title: "Quality", desc: "We never compromise on the quality of our equipment or the expertise of our trainers.", icon: Shield },
    { title: "Community", desc: "We foster a supportive environment where members motivate each other to succeed.", icon: Users },
    { title: "Innovation", desc: "We constantly update our facilities with the latest fitness technology.", icon: Activity },
  ];

  const certifications = [
    "ACE Certified Professional Trainers",
    "ISSA Fitness Nutrition Specialists",
    "CrossFit Level 1 & 2 Affiliates",
    "National Strength & Conditioning Assoc. (NSCA)",
    "Recognized 'Best emerging chain' 2025"
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
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Our Story</span>
            <h1 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-12">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="block"
              >
                More Than Just
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="block"
              >
                A <span className="text-brand">Gym</span>
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="max-w-3xl text-xl text-paper/60 font-light leading-relaxed"
            >
              Founded in 2024, The Gym Culture was born out of a simple realization: high-quality fitness facilities were becoming an elite luxury. We set out to change that by creating a brand that combines state-of-the-art equipment with an affordable, community-focused culture.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-y border-white/5 relative z-10 glass-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass p-12 rounded-[3rem] relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-48 opacity-20 z-0">
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000" alt="Mission" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink"></div>
              </div>
              <div className="relative z-10 pt-16">
                <h2 className="font-display text-5xl uppercase mb-8 tracking-wide">Our Mission</h2>
                <p className="text-paper/60 font-light text-lg leading-relaxed">
                  To democratize fitness by providing top-tier training environments at prices that make health accessible to every neighborhood across the country.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass p-12 rounded-[3rem] relative overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-48 opacity-20 z-0">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000" alt="Vision" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink"></div>
              </div>
              <div className="relative z-10 pt-16">
                <h2 className="font-display text-5xl uppercase mb-8 tracking-wide text-brand">Our Vision</h2>
                <p className="text-paper/60 font-light text-lg leading-relaxed">
                  To become India's largest and most trusted fitness network, with 100 locations serving over 1 million members by 2029.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-6xl uppercase tracking-tight mb-4">Our Core Values</h2>
            <p className="text-paper/40 font-light">The principles that drive every decision we make.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[2.5rem] text-center group transition-all"
              >
                <div className="w-16 h-16 glass rounded-full flex items-center justify-center mb-8 mx-auto transition-all">
                  <value.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-display text-2xl uppercase mb-4 tracking-wide">{value.title}</h3>
                <p className="text-paper/50 font-light text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements / Certifications */}
      <section className="py-24 px-6 relative z-10 glass-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl uppercase tracking-tight mb-4 text-brand">Achievements & Certifications</h2>
            <p className="text-paper/60 font-light">Industry recognized standards for your safety and results.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="glass p-8 rounded-3xl flex items-center gap-4 hover:border-brand/30 transition-all group"
              >
                <Award className="w-8 h-8 text-brand shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-display uppercase text-lg leading-tight">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 border-t border-white/5 relative z-10 glass-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-6 block font-bold">The Leadership</span>
              <h2 className="font-display text-7xl uppercase leading-none mb-10 tracking-tight text-white">
                Led by <br /> Experts
              </h2>
              <p className="text-xl font-light mb-12 text-paper/60 leading-relaxed">
                Our leadership team brings together decades of experience in fitness management, athlete training, and community building. We are united by a single goal: your success.
              </p>
              <button className="btn-glow px-10 py-5 uppercase tracking-widest inline-flex max-w-max">
                Join Our Team
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] glass rounded-3xl overflow-hidden relative group">
                  <img 
                    src={`https://picsum.photos/seed/trainer${i}/400/600`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    <p className="font-display text-xl uppercase">Expert Trainer</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">Certified Professional</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
