import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Dumbbell, ArrowRight, ChevronDown } from 'lucide-react';
import { locationsData } from '../data/locations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationsDropdownOpen, setIsLocationsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsLocationsDropdownOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Locations', path: '/locations', hasDropdown: true },
    { name: 'Franchise', path: '/franchise' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass-dark rounded-2xl px-8 py-4 flex items-center justify-between border-white/5 transition-all duration-500 ${isScrolled ? 'shadow-2xl shadow-black/50' : ''}`}>
          <NavLink to="/" className="flex items-center gap-3 group">
            <img 
              src="https://thegymculture.in/wp-content/uploads/2026/03/THE-GYM-CULTURE-LOGO-SVG.png" 
              alt="The Gym Culture Logo" 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </NavLink>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group/nav"
                onMouseEnter={() => link.hasDropdown && setIsLocationsDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsLocationsDropdownOpen(false)}
              >
                <NavLink 
                  to={link.path}
                  className={({ isActive }) => `flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all hover:text-brand ${isActive && !link.path.includes('#') ? 'text-brand' : 'text-paper/60'}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLocationsDropdownOpen ? 'rotate-180' : ''}`} />}
                </NavLink>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {isLocationsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                      >
                        <div className="bg-ink/90 backdrop-blur-3xl rounded-xl border border-white/10 p-4 shadow-2xl overflow-hidden">
                          <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                            <Link 
                              to="/locations"
                              className="px-4 py-3 rounded-lg hover:bg-brand/10 hover:text-brand transition-all font-mono text-xs uppercase tracking-widest border-b border-white/5 mb-2"
                            >
                              All Locations
                            </Link>
                            {locationsData.map((loc) => (
                              <Link
                                key={loc.id}
                                to={`/locations/${loc.id}`}
                                className="px-4 py-2 rounded-lg hover:bg-white/5 hover:text-brand transition-all font-mono text-[11px] uppercase tracking-widest text-paper/60"
                              >
                                {loc.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Link 
              to="/contact"
              className="bg-brand text-white px-6 py-3 rounded-lg font-display text-lg uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand/20"
            >
              Join Now
            </Link>
          </div>

          <button 
            className="lg:hidden text-white p-2 glass rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-6 pt-4 lg:hidden"
          >
            <div className="glass-dark rounded-3xl p-10 flex flex-col gap-6 border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <NavLink 
                      to={link.path}
                      className={({ isActive }) => `font-display text-4xl uppercase tracking-tight ${isActive && !link.path.includes('#') ? 'text-brand' : 'text-white'}`}
                    >
                      {link.name}
                    </NavLink>
                    {link.hasDropdown && (
                      <button 
                        onClick={() => setIsLocationsDropdownOpen(!isLocationsDropdownOpen)}
                        className="p-2 glass rounded-lg"
                      >
                        <ChevronDown className={`w-6 h-6 transition-transform ${isLocationsDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {link.hasDropdown && isLocationsDropdownOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex flex-col gap-4 pl-6 border-l border-brand/20"
                    >
                      <Link 
                        to="/locations"
                        className="font-display text-2xl uppercase tracking-tight text-paper/40"
                      >
                        All Locations
                      </Link>
                      {locationsData.map((loc) => (
                        <Link
                          key={loc.id}
                          to={`/locations/${loc.id}`}
                          className="font-display text-2xl uppercase tracking-tight text-paper/40 hover:text-brand"
                        >
                          {loc.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <Link 
                to="/contact"
                className="bg-brand text-white w-full py-6 rounded-2xl font-display text-2xl uppercase tracking-widest flex items-center justify-center gap-4 mt-4"
              >
                Join Now <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
