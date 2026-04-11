import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';
import { useProjects } from '../hooks/useProjects';
import { getTechnologies } from '../services/api';

function Projects() {
  const { projects, loading, error } = useProjects();
  const [technologies, setTechnologies] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const data = await getTechnologies();
        setTechnologies(data);
      } catch (err) {
        console.error('Error fetching technologies:', err);
      }
    };
    fetchTech();
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get unique tech names for filter
  const techFilters = [...new Set(
    projects.flatMap((p) => p.technologies?.map((t) => t.name) || [])
  )].sort();

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) =>
        p.technologies?.some((t) => t.name === activeFilter)
      );

  return (
    <div className="pt-24">
      <div className="section-container">
        <SectionTitle
          title="Todos os Projetos"
          subtitle="Explore todos os projetos que desenvolvi — do conceito ao deploy"
        />

        {/* Tech Filters */}
        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${activeFilter === 'all'
                  ? 'bg-gradient-accent text-white shadow-glow'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-accent/20'
                }`}
            >
              Todos ({projects.length})
            </button>
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeFilter === tech
                    ? 'bg-gradient-accent text-white shadow-glow'
                    : 'glass-card text-text-secondary hover:text-text-primary hover:border-accent/20'
                  }`}
              >
                {tech}
              </button>
            ))}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">Não foi possível carregar os projetos.</p>
            <p className="text-text-muted text-sm mt-2">Verifique se o backend está rodando.</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isVisible={true}
              />
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">Nenhum projeto encontrado com esse filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
