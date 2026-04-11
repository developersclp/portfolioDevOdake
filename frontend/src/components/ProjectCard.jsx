import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiStar } from 'react-icons/hi';
import ProjectModal from './ProjectModal';

function ProjectCard({ project, index = 0, isVisible = true }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={() => setIsModalOpen(true)}
      className="glass-card overflow-hidden group hover:border-accent/20 cursor-pointer
                 hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
    >
      {/* Project Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-200/90 z-10" />

        {project.image_url ? (
          <img 
            src={`${(import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '')}${project.image_url}`} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${
            index % 4 === 0 ? 'from-accent/20 via-primary-50 to-accent-secondary/20' :
            index % 4 === 1 ? 'from-blue-500/20 via-primary-50 to-purple-500/20' :
            index % 4 === 2 ? 'from-emerald-500/20 via-primary-50 to-cyan-500/20' :
            'from-orange-500/20 via-primary-50 to-rose-500/20'
          } group-hover:scale-110 transition-transform duration-700`}>
            {/* Abstract shapes as project visual */}
            <div className="w-full h-full flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="grid grid-cols-3 gap-2 p-8 w-full max-w-xs">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`h-8 rounded-lg ${
                    i % 3 === 0 ? 'bg-accent/40' :
                    i % 3 === 1 ? 'bg-accent-secondary/40' :
                    'bg-white/10'
                  }`} />
                ))}
              </div>
            </div>
          </div>
        )}


        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5
                        bg-accent/90 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
            <HiStar className="w-3.5 h-3.5" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent
                      transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
          {project.short_description || project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies?.slice(0, 5).map((tech) => (
            <span key={tech.id || tech.name} className="tech-badge">
              {tech.name}
            </span>
          ))}
          {project.technologies?.length > 5 && (
            <span className="tech-badge opacity-60">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-glass-border">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary
                       transition-colors duration-300 text-sm font-medium"
            >
              <FaGithub className="w-4 h-4" />
              Código
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-accent hover:text-accent-light
                       transition-colors duration-300 text-sm font-medium ml-auto"
            >
              <FaExternalLinkAlt className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
    <ProjectModal project={project} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default ProjectCard;
