import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const CustomDatePicker = ({ value, onChange, placeholder = "Select Date" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value && !isOpen) {
      setCurrentMonth(new Date(value));
    }
  }, [value, isOpen]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleSelectDate = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const dd = String(newDate.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const isSelected = (day: number) => {
    if (!value) return false;
    const [y, m, d] = value.split('-').map(Number);
    return y === currentMonth.getFullYear() && m === currentMonth.getMonth() + 1 && d === day;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === currentMonth.getFullYear() && 
           today.getMonth() === currentMonth.getMonth() && 
           today.getDate() === day;
  }

  const displayValue = value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : placeholder;

  return (
    <div className="relative" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer bg-transparent text-sm text-paper/80 font-mono tracking-wider w-[120px] sm:w-[130px] hover:text-white transition-colors select-none"
      >
        <span className="truncate">{displayValue}</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed md:absolute inset-x-4 md:inset-auto md:top-[120%] md:left-0 top-1/2 -translate-y-[50vh] md:-translate-y-0 mt-[50vh] md:mt-0 z-[100] bg-ink border border-white/10 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-[calc(100%-2rem)] max-w-[300px] md:w-72 mx-auto"
            >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl uppercase tracking-wider text-white flex items-center gap-2">
                {monthNames[currentMonth.getMonth()]} <span className="text-brand">{currentMonth.getFullYear()}</span>
              </span>
              <div className="flex items-center gap-1 glass rounded-lg border-white/5 overflow-hidden">
                <button onClick={handlePrevMonth} className="p-1.5 hover:bg-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button onClick={handleNextMonth} className="p-1.5 hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {days.map(d => (
                <div key={d} className="text-center font-mono text-[10px] text-paper/40 uppercase tracking-widest font-bold">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-8"></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const active = isSelected(day);
                const current = isToday(day);
                return (
                  <button
                    key={day}
                    onClick={() => handleSelectDate(day)}
                    className={`h-8 flex items-center justify-center rounded-lg text-sm font-mono tracking-widest transition-all relative
                      ${active ? 'bg-brand text-white shadow-[0_4px_12px_rgba(233,1,2,0.4)] scale-105 z-10' : 'text-paper/80 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    {day}
                    {current && !active && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full"></div>}
                  </button>
                )
              })}
            </div>
            
            <div className="mt-5 flex justify-between pt-4 border-t border-white/10">
              <button 
                onClick={(e) => { e.stopPropagation(); onChange(''); setIsOpen(false); }}
                className="text-xs font-mono uppercase tracking-widest text-paper/40 hover:text-white transition-colors"
               >
                Clear
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  const today = new Date();
                  onChange(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
                  setIsOpen(false);
                }}
                className="text-xs font-mono uppercase tracking-widest text-brand hover:text-white transition-colors"
               >
                Today
              </button>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDatePicker;
