import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <footer className="bg-ink pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_20px_#FF0000]">
                <Dumbbell className="text-white w-7 h-7" />
              </div>
              <span className="font-display text-4xl uppercase tracking-tighter text-white">The Gym <span className="text-brand">Culture</span></span>
            </Link>
            <p className="text-paper/40 text-xl font-light leading-relaxed mb-12 max-w-md">
              Redefining fitness through community, accessibility, and high-performance environments. Join the movement today.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-brand hover:text-white transition-all group">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-2xl uppercase mb-10 tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-6">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Locations', path: '/locations' },
                { name: 'Franchise', path: '/franchise' },
                { name: 'Contact', path: '/contact' },
                { name: 'Admin Dashboard', path: '/admin' },
                { name: 'Privacy Policy', path: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-paper/40 hover:text-brand transition-colors font-mono text-xs uppercase tracking-widest font-bold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-2xl uppercase mb-10 tracking-widest text-white">Newsletter</h4>
            <p className="text-paper/40 font-light mb-8">Get the latest fitness tips and gym updates.</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email" 
                className="w-full glass-dark border-white/5 rounded-xl px-6 py-5 focus:outline-none focus:border-brand transition-all font-light"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 w-12 h-12 bg-brand text-white rounded-lg flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-brand/20"
              >
                {subscribed ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-paper/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2024 The Gym Culture. All Rights Reserved.
          </p>
          <div className="flex gap-10">
            <span className="text-paper/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold cursor-pointer hover:text-brand transition-colors">Terms of Service</span>
            <span className="text-paper/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold cursor-pointer hover:text-brand transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
