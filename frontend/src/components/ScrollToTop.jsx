import { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-accent rounded-full
                     shadow-glow hover:shadow-glow-lg transition-shadow duration-300
                     hover:scale-110 active:scale-95"
          aria-label="Voltar ao topo"
        >
          <HiArrowUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
