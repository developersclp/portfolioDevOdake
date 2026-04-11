import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { getTechnologies } from '../services/api';
import SectionTitle from './SectionTitle';

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps & Tools',
};



function TechStack() {
  const [technologies, setTechnologies] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, isVisible } = useScrollAnimation();
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const data = await getTechnologies();
        setTechnologies(data);
      } catch (err) {
        console.error('Error fetching technologies:', err);
        // Fallback static data
        setTechnologies([]);
      }
    };
    fetchTech();
  }, []);

  const categories = ['all', ...Object.keys(categoryLabels)];
  const filtered = activeCategory === 'all'
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="tech" className="relative">
      <div className="section-container" ref={ref}>
        <SectionTitle
          title="Tech Stack"
          subtitle="Tecnologias e ferramentas que domino para criar soluções completas"
        />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-gradient-accent text-white shadow-glow'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-accent/20'
                }`}
            >
              {cat === 'all' ? 'Todas' : categoryLabels[cat]}
            </button>
          ))}
        </motion.div>

        {/* Tech Carousel */}
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-6 z-10 p-2 sm:p-3 rounded-full bg-primary-200/90 text-white shadow-xl border border-white/10 hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 hidden sm:flex"
            aria-label="Anterior"
          >
            <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 scroll-smooth scrollbar-hide"
          >
            {filtered.map((tech, index) => {
              const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '');
              return (
                <motion.div
                  key={tech.id || tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-card p-5 flex flex-col items-center justify-center gap-4 group
                           hover:border-accent/40 hover:shadow-card-hover transition-all duration-300
                           hover:-translate-y-2 snap-center shrink-0 w-36 h-36 md:w-44 md:h-44"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300">
                    {tech.image_url ? (
                      <img 
                        src={`${API_BASE}${tech.image_url}`} 
                        alt={tech.name} 
                        className="w-full h-full object-contain" 
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 rounded-xl flex items-center justify-center text-text-muted">
                        Sem img
                      </div>
                    )}
                  </div>
                  <span className="text-text-primary text-sm md:text-base font-semibold text-center group-hover:text-accent transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
            
            {filtered.length === 0 && (
                <div className="w-full flex justify-center p-8 text-text-muted">
                    Nenhuma tecnologia encontrada.
                </div>
            )}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-6 z-10 p-2 sm:p-3 rounded-full bg-primary-200/90 text-white shadow-xl border border-white/10 hover:bg-accent transition-colors opacity-0 group-hover:opacity-100 hidden sm:flex"
            aria-label="Próximo"
          >
            <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
