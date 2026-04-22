import Hero from '../components/Hero';
import About from '../components/About';
import TechStack from '../components/TechStack';
import Education from '../components/Education';
import Certificates from '../components/Certificates';
import ProjectCard from '../components/ProjectCard';
import Resume from '../components/Resume';
import ContactForm from '../components/ContactForm';
import SectionTitle from '../components/SectionTitle';
import { useProjects } from '../hooks/useProjects';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

function Home() {
  const { projects, loading, error } = useProjects(true); // Featured only

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Education />
      <Certificates />

      <section id="projects" className="relative py-20 bg-primary/30">
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
                  />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center mt-12"
              >
                <Link
                  to="/projects"
                  className="btn-outline inline-flex items-center gap-2 group shimmer-btn relative overflow-hidden"
                >
                  <span className="relative z-10">Ver Todos os Projetos</span>
                  <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <Resume />
      <ContactForm />
    </>
  );
}

export default Home;
