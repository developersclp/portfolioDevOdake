import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown, HiMail } from 'react-icons/hi';
import { useProfile } from '../context/ProfileContext';

function Hero() {
  const { profile, loading } = useProfile();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = profile?.job_title ? [profile.job_title, 'Full Stack Developer', 'Backend Specialist'] : ['Full Stack Developer', 'Backend Engineer'];

  useEffect(() => {
    if (loading || !profile) return;
    const currentTitle = titles[titleIndex] || titles[0] || '';
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex, loading, profile]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return null;

  const firstName = profile?.full_name?.split(' ')[0] || 'Pedro';
  const lastName = profile?.full_name?.split(' ').slice(1).join(' ') || 'Odake';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Decorative Elements omitted for brevity in thought, but included in action */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/5 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 section-container text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            <span className="w-2 h-2 bg-accent-secondary rounded-full animate-pulse" />
            Disponível para novos projetos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
        >
          <span className="text-text-primary">{firstName} </span>
          <span className="gradient-text">{lastName}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 h-10"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-mono text-accent font-medium">
            {'> '}
            <span>{displayText}</span>
            <span className="inline-block w-0.5 h-6 md:h-7 bg-accent ml-1 animate-pulse" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {profile?.biography || 'Desenvolvedor apaixonado por criar aplicações web modernas e escaláveis.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button onClick={scrollToProjects} className="btn-gradient flex items-center gap-2">
            <span>Ver Projetos</span>
            <HiArrowDown className="w-4 h-4 animate-bounce-subtle" />
          </button>

          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          )}

          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2">
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          )}

          <button onClick={scrollToContact} className="btn-outline flex items-center gap-2">
            <HiMail className="w-5 h-5" />
            <span>Contato</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 border-2 border-text-muted/30 rounded-full flex justify-center pt-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-1 bg-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
