import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ProjectModal({ project, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine image_url with project.images to create a unified gallery
  const allImages = [];
  if (project.image_url) {
    allImages.push(project.image_url);
  }
  if (project.images && project.images.length > 0) {
    // avoid duplicating the main image if it's already in the images array
    project.images.forEach(img => {
      const url = img.image_url || img;
      if (!allImages.includes(url)) {
        allImages.push(url);
      }
    });
  }

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, allImages.length]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-20 md:pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[80vh] z-10 border border-white/10 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Content Container (Scrollable) */}
            <div className="overflow-y-auto overflow-x-hidden w-full h-full flex flex-col">
              
              {/* Carousel Section */}
              <div className="relative w-full h-64 sm:h-80 md:h-[450px] bg-black flex-shrink-0 group">
                {allImages.length > 0 ? (
                  <img
                    src={`${API_BASE}${allImages[currentImageIndex]}`}
                    alt={`${project.title} - imagem ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-black/50"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary-50 flex items-center justify-center">
                     <span className="text-white/50">Sem imagens</span>
                  </div>
                )}

                {/* Carousel Controls */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-accent/80 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-accent/80 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <FaChevronRight className="w-5 h-5" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {allImages.map((_, idx) => (
                        <div
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                            idx === currentImageIndex ? 'bg-accent w-4' : 'bg-white/50 hover:bg-white/80'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
                      {project.title}
                    </h2>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies?.map((tech) => (
                        <span key={tech.id || tech.name} className="tech-badge">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-text-primary transition-all font-medium whitespace-nowrap"
                      >
                        <FaGithub className="w-5 h-5" />
                        Código
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/90 hover:bg-accent text-white transition-all font-medium shadow-lg shadow-accent/20 whitespace-nowrap"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Sobre o Projeto</h3>
                  <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
