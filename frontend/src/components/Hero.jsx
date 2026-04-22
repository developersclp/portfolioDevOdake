import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown, HiMail } from 'react-icons/hi';
import { useProfile } from '../context/ProfileContext';

function Hero() {
  const { profile, loading } = useProfile();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  // Parallax setup
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  // Canvas ref for particles
  const canvasRef = useRef(null);

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

  // Particle network effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(Math.floor(window.innerWidth / 20), 80);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isTealTheme = getComputedStyle(document.documentElement).getPropertyValue('--is-teal').trim() === 'true';
      const colorRGB = isTealTheme ? '20, 184, 166' : '108, 99, 255'; // Use current accent color
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRGB}, 0.3)`;
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colorRGB}, ${0.15 - dist/800})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      {/* Canvas Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      />

      {/* Decorative Elements with Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] mix-blend-screen" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-secondary/20 rounded-full blur-[100px] mix-blend-screen animation-delay-300" />
        <motion.div style={{ y: y3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] mix-blend-screen" />
        
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center',
            maskImage: 'radial-gradient(ellipse at center, white, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, white, transparent 80%)'
          }}
        />
      </div>

      <div className="relative z-10 section-container text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium shadow-[0_0_15px_rgba(108,99,255,0.2)] backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
            Disponível para novos projetos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight relative"
        >
          <span className="text-text-primary drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{firstName} </span>
          <span className="gradient-text drop-shadow-[0_0_20px_rgba(108,99,255,0.3)] shimmer-text">{lastName}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 h-10"
        >
          <span className="text-xl md:text-2xl lg:text-3xl font-mono text-accent font-medium bg-primary-200/50 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-sm inline-flex items-center gap-2 shadow-inner">
            <span className="text-text-muted">{'<'}</span>
            <span>{displayText}</span>
            <span className="text-text-muted">{'/>'}</span>
            <span className="inline-block w-[3px] h-6 md:h-7 bg-accent ml-1 animate-[blink-caret_0.8s_step-end_infinite]" />
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
          <button onClick={scrollToProjects} className="btn-gradient flex items-center gap-2 group shimmer-btn relative overflow-hidden">
            <span className="relative z-10">Ver Projetos</span>
            <HiArrowDown className="w-4 h-4 animate-bounce-subtle relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 bg-glass backdrop-blur-sm">
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          )}

          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center gap-2 bg-glass backdrop-blur-sm">
              <FaLinkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          )}

          <button onClick={scrollToContact} className="btn-outline flex items-center gap-2 bg-glass backdrop-blur-sm">
            <HiMail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
