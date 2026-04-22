import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope, FaCode, FaCoffee, FaRocket } from 'react-icons/fa';
import { useProfile } from '../context/ProfileContext';

function About() {
  const { profile, loading } = useProfile();
  
  if (loading || !profile) return null;

  return (
    <section id="sobre" className="relative py-24 overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-accent-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionTitle
          title="Sobre Mim"
          subtitle="Um pouco sobre minha jornada, paixões e o que construo com código"
        />

        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start mt-12">
          
          {/* Lado Esquerdo - Foto Destacada com Design Moderno */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-5/12 flex flex-col items-center"
          >
            <div className="relative group perspective-1000 w-full max-w-sm">
              {/* Efeito Glow Pulsante */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-accent via-accent-secondary to-accent rounded-3xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-700 animate-pulse" />
              
              {/* Box Principal da Foto */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-glass/50 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-transparent to-transparent z-10" />
                <img 
                  src="/foto.jpg" 
                  alt={profile.full_name} 
                  className="w-full h-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://ui-avatars.com/api/?name=" + profile.full_name + "&background=6c63ff&color=fff&size=512";
                  }}
                />
                
                {/* Etiqueta Flutuante Sobreposição */}
                <div className="absolute bottom-6 left-6 right-6 z-20 glass-card p-4 flex items-center justify-between border-white/10">
                  <div>
                    <p className="text-white font-bold text-lg leading-tight tracking-wide">{profile.full_name}</p>
                    <p className="text-accent text-sm font-medium">{profile.job_title}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <FaCode className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Redes Sociais Livres Abaixo da Foto */}
            <div className="flex items-center gap-4 mt-8">
              {profile.github_url && (
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-accent hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {profile.linkedin_url && (
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-[#0077b5] hover:border-[#0077b5] hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-white hover:text-red-400 hover:border-red-400 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  <FaEnvelope className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Lado Direito - Apresentação Dinâmica */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-7/12 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 w-max mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-accent text-xs font-bold uppercase tracking-wider">Buscando Constante Evolução</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-white leading-tight mb-6">
              Transformando ideias vagas em <span className="gradient-text">soluções práticas.</span>
            </h2>

            <div className="space-y-4 text-text-secondary text-base lg:text-lg leading-relaxed mb-10 border-l-4 border-accent/30 pl-5">
              <p>
                Sou desenvolvedor com formação técnica em Desenvolvimento de Sistemas pelo <strong className="text-white">SENAI</strong> e atualmente curso o tecnólogo em Desenvolvimento de Software Multiplataforma pela <strong className="text-white">FATEC</strong>.
              </p>
              <p>
                Meu foco é continuar evoluindo na área de desenvolvimento tecnológico, criando aplicações cada vez mais completas, funcionais e eficientes que contribuam diretamente para o meu crescimento e o da equipe.
              </p>
            </div>

            {/* Caixas de Destaque Pessoais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="glass-card p-5 group hover:border-accent/30 transition-all shadow-md">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <FaCode className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold">Código Limpo</h4>
                </div>
                <p className="text-text-secondary text-sm">Busco sempre escrever um código claro, funcional e bem estruturado, focado em alta manutenção e boas práticas.</p>
              </div>

              <div className="glass-card p-5 group hover:border-accent/30 transition-all shadow-md">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <FaCoffee className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold">Trabalho em Equipe</h4>
                </div>
                <p className="text-text-secondary text-sm">Valorizo a organização, comunicação e acredito profundamente que bons resultados nascem da colaboração contínua.</p>
              </div>
            </div>

            {/* Chamada para Ação */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="#curriculo" 
                className="btn-gradient px-8 py-3.5 flex items-center gap-3 text-sm font-bold uppercase tracking-wide group"
              >
                Detalhes do Currículo
                <FaDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a 
                href="https://wa.me/5511949694654"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline px-8 py-3.5 flex items-center gap-3 text-sm font-bold uppercase tracking-wide"
              >
                Falar no WhatsApp
              </a>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
