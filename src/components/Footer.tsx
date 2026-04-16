import React from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 relative z-10 glass-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-20 mb-32">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-10 group">
              <img 
                src="https://thegymculture.in/wp-content/uploads/2026/03/THE-GYM-CULTURE-LOGO-SVG.png" 
                alt="The Gym Culture Logo" 
                className="h-10 md:h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-paper/40 text-xl font-light leading-relaxed mb-12 max-w-md">
              Redefining fitness through community, accessibility, and high-performance environments. Join the movement today.
            </p>
            <div className="flex gap-6">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all group">
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
                { name: 'Employee Login', path: '/login' },
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
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-paper/40 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2026 The Gym Culture. All Rights Reserved.
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
