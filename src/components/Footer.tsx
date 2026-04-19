import React from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Globe,
  MapPin,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationsData } from '../data/locations';

const Footer = () => {
  return (
    <footer className="pt-32 pb-12 relative z-10 glass-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-6 gap-16 mb-24">
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <img 
                src="https://thegymculture.in/wp-content/uploads/2026/03/THE-GYM-CULTURE-LOGO-SVG.png" 
                alt="The Gym Culture Logo" 
                className="h-10 md:h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-paper/40 text-base font-light leading-relaxed mb-8 max-w-xs">
              Redefining fitness through community, accessibility, and high-performance environments.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all group">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 min-w-fit">
            <h4 className="font-display text-xl uppercase mb-8 tracking-widest text-white flex items-center gap-3 whitespace-nowrap">
              <Globe className="w-5 h-5 text-brand shrink-0" /> Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Franchise', path: '/franchise' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact', path: '/contact' },
                { name: 'Employee Login', path: '/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-paper/40 hover:text-brand transition-colors font-mono text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 min-w-fit">
            <h4 className="font-display text-xl uppercase mb-8 tracking-widest text-white flex items-center gap-3 whitespace-nowrap">
              <MapPin className="w-5 h-5 text-brand shrink-0" /> Locations
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {locationsData.map((loc) => (
                <li key={loc.id}>
                  <Link to={`/locations/${loc.id}`} className="text-paper/40 hover:text-brand transition-colors font-mono text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1 min-w-fit">
            <h4 className="font-display text-xl uppercase mb-8 tracking-widest text-white flex items-center gap-3 whitespace-nowrap">
              <FileText className="w-5 h-5 text-brand shrink-0" /> Policies
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Terms of Service', path: '/terms-of-service' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-paper/40 hover:text-brand transition-colors font-mono text-[10px] uppercase tracking-widest font-bold whitespace-nowrap">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-paper/30 font-mono text-[10px] tracking-[0.2em] font-medium">
            copyright © 2026 | THE GYM CULTURE | All Rights Reserved
          </p>
          <div className="flex items-center gap-2 text-paper/20 font-mono text-[9px] uppercase tracking-[0.2em]">
            <span>Developed by</span>
            <span className="text-paper/40 font-bold hover:text-brand transition-colors cursor-default">Avinash Sharma</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
