import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Users, 
  MapPin, 
  ArrowRight, 
  Check, 
  Star, 
  Zap,
  Target,
  Trophy,
  Activity,
  ChevronLeft,
  ChevronRight,
  Flame,
  Dna,
  Plus,
  Minus,
  X,
  Play
} from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 smooth-gradient-b z-10" />
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale opacity-60"
          alt="Gym Background"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: y1, opacity }}
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
              className="h-[2px] bg-brand shadow-[0_0_15px_#FF0000]" 
            />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-brand font-mono text-sm tracking-[0.4em] uppercase font-bold"
            >
              The Culture of Fitness
            </motion.span>
          </div>
          <h1 className="font-display text-7xl md:text-8xl lg:text-[11vw] leading-[0.8] uppercase mb-10 tracking-tighter">
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="block"
            >
              Achieve Your
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-stroke text-white opacity-90 block"
            >
              Best Self
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="max-w-xl text-lg md:text-xl text-paper/60 mb-12 leading-relaxed font-light"
          >
            Affordable, accessible, and high-quality fitness for every neighborhood. Join a community that pushes you to be better every single day.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-wrap gap-4 md:gap-6 items-center"
          >
            <button className="btn-glow h-12 md:h-14 !px-6 md:!px-8 rounded-full font-display text-sm md:text-base uppercase tracking-widest group flex items-center justify-center m-0">
              Start Free Trial <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3" />
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="glass h-12 md:h-14 px-6 md:px-8 rounded-full font-display text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-3 group hover:bg-white/10 transition-all border border-white/20 m-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_#FF0000] shrink-0">
                <Play className="w-3 h-3 md:w-4 md:h-4 fill-white text-white ml-0.5" />
              </div>
              Watch film
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-ink/95 backdrop-blur-2xl px-4"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-h-[90vh] max-w-[calc(90vh*9/16)] aspect-[9/16] glass rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 z-10 mx-auto"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all z-50 group border border-white/20"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                <video 
                  src="/tgc-universal-video.mp4" 
                  poster="/Home Page Video _Thumbnail.webp"
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Badge */}
      <motion.div 
        initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{ delay: 2, duration: 1, type: "spring" }}
        className="absolute top-40 right-[15%] hidden xl:flex w-32 h-32 bg-brand rounded-full items-center justify-center text-center p-4 shadow-2xl shadow-brand/40 z-30"
      >
        <span className="font-display text-white text-lg uppercase leading-none tracking-tighter">Join The Culture Today</span>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/20">Scroll Down</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-brand to-transparent" />
      </motion.div>

      <div className="absolute right-10 bottom-20 hidden lg:block z-20">
        <span className="writing-vertical-rl rotate-180 font-mono text-xs tracking-[0.6em] uppercase text-paper/20">
          EST. 2024 — REDEFINED & BOLD
        </span>
      </div>
    </section>
    </>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Active Members', value: '200+', icon: Users },
    { label: 'Certified Trainers', value: '50+', icon: Target },
    { label: 'Locations', value: '7', icon: MapPin },
    { label: 'Success Stories', value: '150+', icon: Trophy },
  ];

  return (
    <section className="py-24 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 glass rounded-[2rem] flex items-center justify-center mb-8 border border-white/5 group-hover:bg-brand group-hover:text-white transition-all duration-500 text-brand">
                <stat.icon className="w-10 h-10" />
              </div>
              <span className="font-display text-6xl md:text-8xl mb-4 text-white tracking-tighter">{stat.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-paper/40 group-hover:text-brand transition-colors">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Personal Training",
      desc: "One-on-one sessions tailored to your specific goals and fitness level.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
      icon: Target
    },
    {
      title: "Group Classes",
      desc: "High-energy sessions ranging from HIIT to Yoga in a supportive environment.",
      image: "https://images.unsplash.com/photo-1571388208497-71bedc66e932?q=80&w=2070&auto=format&fit=crop",
      icon: Users
    },
    {
      title: "Functional Training",
      desc: "Workouts designed to improve your daily movements and overall strength.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
      icon: Activity
    },
    {
      title: "Cardio & Endurance",
      desc: "State-of-the-art equipment to boost your heart health and stamina.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
      icon: Zap
    }
  ];

  return (
    <section id="services" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-6 block font-bold">What we offer</span>
            <h2 className="font-display text-6xl md:text-9xl uppercase tracking-tight leading-none">Featured <br /> Services</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-sm text-paper/40 font-light leading-relaxed text-lg"
          >
            We provide everything you need to reach your peak performance, from elite equipment to expert guidance.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-[2rem] glass"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 smooth-gradient-t" />
              
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <h3 className="font-display text-5xl uppercase mb-4 tracking-wide group-hover:-translate-y-2 transition-transform duration-500">{service.title}</h3>
                <p className="text-paper/60 font-light max-w-sm text-lg leading-relaxed group-hover:-translate-y-2 transition-transform duration-500">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isJoining, setIsJoining] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "999",
      features: ["Access to Gym Floor", "Locker Room Access", "Free Wi-Fi", "1 Guest Pass/Mo"],
      details: "Perfect for those who want a straightforward gym experience. Our Basic plan gives you access to all the essential equipment and facilities you need to maintain your fitness routine.",
      recommended: false
    },
    {
      name: "Pro",
      price: "1999",
      features: ["All Basic Features", "Unlimited Group Classes", "Personalized Workout Plan", "4 Guest Passes/Mo"],
      details: "Our most popular choice. The Pro plan is designed for fitness enthusiasts who want to take their training to the next level with group classes and personalized guidance.",
      recommended: true
    },
    {
      name: "Elite",
      price: "3499",
      features: ["All Pro Features", "Personal Trainer (2/Mo)", "Nutrition Coaching", "Priority Support"],
      details: "The ultimate fitness experience. Get personalized attention from our elite trainers, customized nutrition plans, and priority access to all our premium services and facilities.",
      recommended: false
    }
  ];

  return (
    <section id="pricing" className="py-24 text-paper relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-7xl md:text-9xl uppercase tracking-tight mb-6">Membership Plans</h2>
          <p className="text-paper/40 font-light text-xl">Quality fitness shouldn't break the bank.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`p-12 rounded-[3rem] flex flex-col glass relative overflow-hidden cursor-pointer group ${plan.recommended ? 'border-brand/40 shadow-2xl shadow-brand/10' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.recommended && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-8 right-8 bg-brand text-white px-4 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold"
                >
                  Most Popular
                </motion.div>
              )}
              <div className="mb-12">
                <h3 className="font-display text-3xl uppercase mb-6 tracking-wide group-hover:text-brand transition-colors">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-brand">₹</span>
                  <span className="text-8xl font-display leading-none">{plan.price}</span>
                  <span className="text-sm opacity-40 font-mono uppercase tracking-widest">/mo</span>
                </div>
              </div>

              <div className="flex-grow space-y-6 mb-16">
                {plan.features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-6 h-6 glass rounded-full flex items-center justify-center text-brand">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-lg font-light text-paper/70">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <button className={`w-full py-6 rounded-2xl font-display text-2xl uppercase tracking-widest transition-all ${plan.recommended ? 'bg-brand text-white hover:scale-[1.02] shadow-xl shadow-brand/20' : 'glass hover:bg-brand hover:text-white'}`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Plan Details Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-12 md:p-16">
                <div className="mb-12">
                  <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Membership Details</span>
                  <h3 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-6">{selectedPlan.name} Plan</h3>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-xl font-bold text-brand">₹</span>
                    <span className="text-7xl md:text-8xl font-display leading-none">{selectedPlan.price}</span>
                    <span className="text-sm opacity-40 font-mono uppercase tracking-widest">/mo</span>
                  </div>
                  <p className="text-paper/60 font-light text-lg leading-relaxed">
                    {selectedPlan.details}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h4 className="font-display text-xl uppercase mb-6 tracking-widest text-white">Included Features</h4>
                    <div className="space-y-4">
                      {selectedPlan.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-brand" />
                          <span className="text-paper/60 font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="glass p-8 rounded-3xl border-brand/20">
                      <p className="text-paper/40 text-sm font-light mb-4 italic">
                        "The best investment I've made for my health. The {selectedPlan.name} plan gives me everything I need."
                      </p>
                      <p className="text-white font-display text-sm uppercase tracking-widest">— Happy Member</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <button 
                    onClick={() => {
                      setIsJoining(true);
                      setTimeout(() => {
                        setIsJoining(false);
                        setSelectedPlan(null);
                      }, 2000);
                    }}
                    disabled={isJoining}
                    className={`flex-1 py-4 font-display text-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${isJoining ? 'bg-emerald-500/80 rounded-full text-white' : 'btn-glow'}`}
                  >
                    {isJoining ? 'Processing...' : 'Join Now'}
                  </button>
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="flex-1 glass hover:bg-white/10 py-4 rounded-full font-display text-2xl uppercase tracking-widest transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = [
    { 
      name: "Rahul Sharma", 
      role: "Member for 2 years", 
      text: "The best gym in the neighborhood. The trainers are actually helpful and the equipment is top-notch.",
      result: "Lost 15kg in 6 months",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop"
    },
    { 
      name: "Priya Patel", 
      role: "Athlete", 
      text: "Love the community here. It's not just a gym, it's a culture. Highly recommend the group classes!",
      result: "Improved marathon time by 20m",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
    },
    { 
      name: "Amit Verma", 
      role: "Weightlifter", 
      text: "Affordable pricing without compromising on quality. The 24/7 access is a lifesaver for my schedule.",
      result: "Increased deadlift by 50kg",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop"
    }
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="testimonials" className="py-24 overflow-hidden border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Success Stories</span>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter">Real Results <br /> Real People</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-4">
              <div className="flex text-brand">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-paper/50">4.9/5 Google Rating</span>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={next}
                className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative h-[450px] md:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  next();
                } else if (info.offset.x > swipeThreshold) {
                  prev();
                }
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                <div className="relative aspect-square md:aspect-video rounded-[3rem] overflow-hidden glass">
                  <img 
                    src={reviews[currentIndex].image.replace('w=200&h=200', 'w=800&h=600')} 
                    alt={reviews[currentIndex].name} 
                    className="w-full h-full object-cover grayscale opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 smooth-gradient-t opacity-90" />
                  <div className="absolute bottom-10 left-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand block mb-2">Achievement</span>
                    <span className="font-display text-4xl uppercase text-white">{reviews[currentIndex].result}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand/20">
                      <img src={reviews[currentIndex].image} alt={reviews[currentIndex].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h4 className="font-display text-2xl uppercase tracking-wide">{reviews[currentIndex].name}</h4>
                      <p className="text-paper/40 font-mono text-xs uppercase tracking-widest">{reviews[currentIndex].role}</p>
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-light leading-relaxed text-paper/80 italic mb-8">
                    "{reviews[currentIndex].text}"
                  </p>
                  <div className="flex gap-2">
                    {reviews.map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 bg-brand' : 'w-4 bg-white/10'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    { title: "HIIT Blast", icon: Flame, color: "text-orange-500", desc: "High-intensity interval training to torch calories and boost metabolism." },
    { title: "Zen Yoga", icon: Activity, color: "text-emerald-500", desc: "Find your balance and flexibility with our expert-led yoga sessions." },
    { title: "MMA Core", icon: Target, color: "text-red-500", desc: "Master self-defense and build functional strength with MMA training." },
    { title: "Elite Strength", icon: Dumbbell, color: "text-blue-500", desc: "Traditional weightlifting and powerlifting for maximum muscle growth." },
    { title: "Pilates Flow", icon: Dna, color: "text-purple-500", desc: "Core-focused movements to improve posture and lean muscle tone." },
    { title: "Cardio Pro", icon: Zap, color: "text-yellow-500", desc: "Advanced endurance training using the latest cardio technology." }
  ];

  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Specialized Training</span>
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight">Elite Programs</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2.5rem] hover:bg-white/5 transition-all group cursor-pointer border border-white/5 hover:border-brand/20"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${prog.color}`}>
                <prog.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-3xl uppercase mb-4 tracking-wide group-hover:text-brand transition-colors">{prog.title}</h3>
              <p className="text-paper/40 font-light leading-relaxed">{prog.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-brand font-mono text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Amenities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const amenities = [
    {
      title: "Steam Room",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
      locations: ["Borivali", "Malad East", "Orlem"]
    },
    {
      title: "Luxury Lockers",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
      locations: ["All Locations"]
    },
    {
      title: "Protein Bar",
      image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?q=80&w=2070&auto=format&fit=crop",
      locations: ["Borivali", "Kandivali", "Sundar Nagar"]
    },
    {
      title: "Sauna",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop",
      locations: ["Malad East", "Orlem"]
    },
    {
      title: "Free Wi-Fi",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
      locations: ["All Locations"]
    },
    {
      title: "Parking",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070&auto=format&fit=crop",
      locations: ["Borivali", "Malad East", "Kandivali"]
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + amenities.length) % amenities.length);
  };

  return (
    <section className="py-24 overflow-hidden border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Premium Experience</span>
            <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight">World-Class <br /> Amenities</h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-[600px] md:h-[700px] max-w-7xl mx-auto px-6">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 px-6"
          >
            <div className="relative h-full rounded-[3rem] overflow-hidden group">
              <img 
                src={amenities[currentIndex].image} 
                alt={amenities[currentIndex].title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 smooth-gradient-t" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
                <div className="max-w-3xl">
                  <h3 className="font-display text-5xl md:text-7xl uppercase mb-6 text-white leading-none">
                    {amenities[currentIndex].title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities[currentIndex].locations.map((loc, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-brand text-white text-[10px] font-mono uppercase rounded-full font-bold tracking-wider">
                        {loc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-12">
        {amenities.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-12 bg-brand' : 'w-4 bg-white/10 hover:bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "What are the gym timings?", a: "Most of our locations are open 24/7. However, some specific branches might have timing restrictions on Sundays. Please check the individual location page for exact details." },
    { q: "Do you offer personal training?", a: "Yes, we have a team of certified expert trainers who provide personalized workout and nutrition plans tailored to your goals." },
    { q: "Can I access all locations with one membership?", a: "Our Elite and Pro memberships offer multi-club access, allowing you to work out at any Gym Culture location across the country." },
    { q: "Is there a free trial available?", a: "Absolutely! We offer a 3-day free trial for all new members to experience our facilities and community before committing." },
    { q: "What amenities do you provide?", a: "Our gyms feature luxury lockers, steam/sauna rooms, protein bars, high-speed Wi-Fi, and state-of-the-art equipment from top global brands." }
  ];

  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Got Questions?</span>
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tight">Common FAQs</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-3xl overflow-hidden border border-white/5">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-white/5 transition-all"
              >
                <span className="font-display text-2xl uppercase tracking-wide flex items-center gap-4">
                  <Plus className={`w-6 h-6 transition-transform ${openIndex === i ? 'rotate-45 text-brand' : 'text-paper/40'}`} />
                  {faq.q}
                </span>
                {openIndex === i ? <Minus className="w-6 h-6 text-brand" /> : <ChevronRight className="w-6 h-6 opacity-20" />}
              </button>
              {openIndex === i && (
                <div className="px-8 pb-8 pl-16 text-paper/60 font-light leading-relaxed text-lg animate-in fade-in slide-in-from-top-2 duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoWeHelp = () => {
  const demographics = [
    { title: "Beginners", desc: "Start your journey in a judgment-free, supportive environment.", icon: Dumbbell },
    { title: "Weight Loss", desc: "Customized fat-loss programs that actually work.", icon: Activity },
    { title: "Bodybuilding", desc: "Heavy lifting zones and elite equipment for serious gains.", icon: Zap },
    { title: "Athletes", desc: "Functional and sport-specific training to boost performance.", icon: Target },
  ];
  return (
    <section className="py-24 border-t border-white/5 relative z-10 glass-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Fitness for All</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Who We Help</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demographics.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[2.5rem] flex flex-col items-center text-center group border border-white/5 hover:border-brand/30 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-brand" />
              </div>
              <h3 className="font-display text-2xl uppercase mb-4">{item.title}</h3>
              <p className="text-paper/60 font-light text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { step: "01", title: "Book Free Trial", desc: "Claim your 3-day pass online." },
    { step: "02", title: "Get Your Plan", desc: "Consult with our expert trainers." },
    { step: "03", title: "Transform", desc: "Hit the floor and see real results." },
  ];
  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Simple Process</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] relative border border-white/5 text-center group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-brand rounded-full flex items-center justify-center font-display text-2xl text-white outline outline-4 outline-ink">
                {item.step}
              </div>
              <h3 className="font-display text-3xl uppercase mb-4 mt-4">{item.title}</h3>
              <p className="text-paper/60 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocationsPreview = () => {
  return (
    <section className="py-24 border-t border-white/5 relative z-10 glass-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">Our Presence</span>
        <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight mb-8">7 Premium Locations</h2>
        <p className="text-paper/60 max-w-2xl mx-auto text-lg mb-12">
          From Borivali to Haridwar, find a Gym Culture branch near you.
        </p>
        <a href="/locations" className="btn-glow px-10 py-5 rounded-full font-display text-xl uppercase inline-flex items-center gap-3">
          Explore All Locations <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

const TrainersPreview = () => {
  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-mono text-brand text-xs tracking-[0.4em] uppercase mb-4 block font-bold">The Experts</span>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tight">Meet Our Top Trainers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
             <div key={i} className="aspect-[3/4] glass rounded-3xl overflow-hidden relative group">
               <img 
                 src={`https://picsum.photos/seed/hometrainer${i}/400/600`} 
                 alt="Trainer" 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-duration-700"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 smooth-gradient-t opacity-80" />
               <div className="absolute bottom-6 left-6">
                 <p className="font-display text-xl uppercase mb-1">Elite Coach</p>
                 <p className="font-mono text-[10px] uppercase tracking-widest text-brand">Certified</p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-brand">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tight text-white mb-8">
          Start Your Fitness Journey Today
        </h2>
        <a href="/contact" className="bg-white text-brand hover:bg-gray-100 px-10 py-5 rounded-full font-display text-2xl uppercase inline-flex items-center gap-3 transition-transform hover:scale-105 shadow-2xl">
          Join Now <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <WhoWeHelp />
      <Stats />
      <Services />
      <Amenities />
      <Testimonials />
      <HowItWorks />
      <LocationsPreview />
      <TrainersPreview />
      <Pricing />
      <FAQ />
      <CTASection />
    </>
  );
};

export default Home;
