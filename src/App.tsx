import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Locations from './pages/Locations';
import Franchise from './pages/Franchise';
import LocationDetail from './pages/LocationDetail';
import Admin from './pages/Admin';
import ContactPage from './pages/ContactPage';
import Login from './pages/Login';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-brand">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  useEffect(() => {
    let ticking = false;
    let currentX = 0;
    let currentY = 0;
    let currentElement: HTMLElement | null = null;
    let rafId: number;

    const updateGlow = () => {
      if (currentElement) {
        currentElement.style.setProperty('--x', `${currentX}`);
        currentElement.style.setProperty('--y', `${currentY}`);
      }
      ticking = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest glowing element
      const glowElement = target.closest('.glass, .glass-dark, .btn-glow, .glass-input') as HTMLElement;
      if (glowElement) {
        const rect = glowElement.getBoundingClientRect();
        currentX = e.clientX - rect.left;
        currentY = e.clientY - rect.top;
        currentElement = glowElement;

        if (!ticking) {
          rafId = requestAnimationFrame(updateGlow);
          ticking = true;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen selection:bg-brand selection:text-white relative">
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/locations" element={<PageWrapper><Locations /></PageWrapper>} />
              <Route path="/locations/:id" element={<PageWrapper><LocationDetail /></PageWrapper>} />
              <Route path="/franchise" element={<PageWrapper><Franchise /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <PageWrapper><Admin /></PageWrapper>
                </ProtectedRoute>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
