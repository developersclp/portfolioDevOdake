import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './SectionTitle';
import { HiCode, HiLightningBolt, HiGlobe, HiAcademicCap } from 'react-icons/hi';
import { useProfile } from '../context/ProfileContext';

function About() {
  const { profile, loading } = useProfile();
  const { ref, isVisible } = useScrollAnimation();

  const highlights = [
    { icon: HiCode, title: 'Clean Code', description: 'Foco em código limpo, testável e manutenível.' },
    { icon: HiLightningBolt, title: 'Performance', description: 'Aplicações otimizadas para carregar extremamente rápido.' },
    { icon: HiGlobe, title: 'Web Escalável', description: 'Arquiteturas projetadas para escalar com a nuvem.' },
    { icon: HiAcademicCap, title: 'Aprendizado Contínuo', description: 'Sempre explorando novas fronteiras da tecnologia.' },
  ];

  if (loading || !profile) return null;

  return (
    <section id="about" className="relative">
      <div className="section-container" ref={ref}>
        <SectionTitle
          title="Sobre Mim"
          subtitle="Conheça minha trajetória e o que me diferencia como desenvolvedor"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              Olá! Sou <span className="text-text-primary font-semibold">{profile.full_name}</span>,
              {" "}{profile.job_title || 'Desenvolvedor Full Stack'} com experiência na construção de aplicações web modernas
              e escaláveis.
            </p>
            <div className="text-text-secondary text-lg leading-relaxed whitespace-pre-wrap">
              {profile.biography}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '50+', label: 'Projetos' },
                { value: '3+', label: 'Anos Exp.' },
                { value: '15+', label: 'Tecnologias' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center glass-card p-4"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="glass-card p-6 group hover:border-accent/20 transition-all duration-300
                         hover:shadow-glow/10"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center
                              mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-text-primary font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
