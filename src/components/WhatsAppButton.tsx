import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href="https://wa.me/919594591313"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-brand text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-brand/30 transition-all cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="w-8 h-8" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
