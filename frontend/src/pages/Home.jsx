import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import SectionTitle from '../components/SectionTitle';
import { useProjects } from '../hooks/useProjects';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

function Home() {
  const { projects, loading, error } = useProjects(true); // Featured only
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Featured Projects Section */}
      <section id="projects" className="relative" ref={projectsRef}>
        <div className="section-container">
          <SectionTitle
            title="Projetos Destacados"
            subtitle="Alguns dos projetos que desenvolvi recentemente"
          />

          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">Não foi possível carregar os projetos.</p>
              <p className="text-text-muted text-sm mt-2">Verifique se o backend está rodando.</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isVisible={projectsVisible}
                  />
                ))}
              </div>

              {/* View All Projects Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={projectsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center mt-12"
              >
                <Link
                  to="/projects"
                  className="btn-outline inline-flex items-center gap-2 group"
                >
                  Ver Todos os Projetos
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />
    </>
  );
}

export default Home;
