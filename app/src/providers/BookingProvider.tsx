import React, { createContext, useContext, useState } from 'react';
import BookingModal from '@/components/BookingModal';
import { AnimatePresence } from 'framer-motion';

interface BookingContextType {
  openBooking: () => void;
  closeBooking: () => void;
  isOpen: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <BookingModal isOpen={isOpen} onClose={closeBooking} />
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
