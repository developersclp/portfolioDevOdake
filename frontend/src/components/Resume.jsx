import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FaDownload, FaMapMarkerAlt, FaEnvelope, FaCode, FaGraduationCap, FaBriefcase, FaCertificate, FaGlobe } from 'react-icons/fa';
import { getEducation, getProjects, getCertificates, getTechnologies } from '../services/api';
import { useProfile } from '../context/ProfileContext';

function Resume() {
  const { profile } = useProfile();
  const resumeRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const [data, setData] = useState({
    education: [],
    projects: [],
    certificates: [],
    technologies: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [e, p, c, t] = await Promise.all([
          getEducation(),
          getProjects(),
          getCertificates(),
          getTechnologies()
        ]);

        setData({
          education: Array.isArray(e) ? e : [],
          projects: Array.isArray(p) ? p.filter(proj => proj.is_featured).slice(0, 4) : [],
          certificates: Array.isArray(c) ? c : [],
          technologies: Array.isArray(t) ? t : []
        });
      } catch (err) {
        console.error('Erro ao buscar dados para currículo:', err);
      } finally {
        setLoading(false);
      }
    };

    if (profile) fetchData();
  }, [profile]);

  const handleExportPDF = async () => {
    if (!resumeRef.current || exporting) return;
    setExporting(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const options = {
        margin: [0, 0, 0, 0],
        filename: `${profile?.full_name?.replace(/\s+/g, '_') || 'curriculo'}_Curriculo.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: {
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: '#0f1117',
          windowWidth: 800,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };
      await html2pdf().set(options).from(resumeRef.current).save();
    } catch (err) {
      console.error('Erro ao exportar PDF:', err);
    } finally {
      setExporting(false);
    }
  };

  if (!profile || loading) return null;

  return (
    <section id="curriculo" className="relative py-20 pb-28">
      <div className="section-container">
        <SectionTitle
          title="Meu Currículo"
          subtitle="Gere uma apresentação formal das minhas melhores experiências"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start max-w-6xl mx-auto"
        >
          {/* Painel de Controles (Ações / Info) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-28 z-20">
            <div className="glass-card p-6 md:p-8 text-center lg:text-left shadow-[0_0_30px_rgba(108,99,255,0.05)] border-accent/20">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto lg:mx-0 mb-6 text-accent">
                <FaDownload className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Versão em PDF</h3>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                Um currículo atualizado dinamicamente com as competências, projetos em destaque, histórico acadêmico e certificações cadastradas diretamente do meu portfólio.
              </p>
              
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="btn-gradient w-full flex items-center justify-center gap-3 group shimmer-btn relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-accent/40"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-wider text-sm">
                  {exporting ? 'Gerando Arquivo...' : 'Baixar Currículo'}
                </span>
                <FaDownload className={`w-4 h-4 relative z-10 transition-transform ${exporting ? 'animate-bounce' : 'group-hover:translate-y-0.5'}`} />
              </button>
              
              <div className="mt-6 pt-6 border-t border-glass-border flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-text-muted">A4 Otimizado</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-text-muted">Dark Mode</span>
              </div>
            </div>
          </div>

          {/* Preview Box - Currículo Renderizado */}
          <div className="w-full lg:w-2/3">
            <div className="text-center mb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-accent/80 font-bold">
                — Prévia do Documento —
              </span>
            </div>
            
            <div className="bg-glass/30 rounded-2xl p-3 sm:p-5 border border-glass-border overflow-x-auto custom-scrollbar shadow-2xl">
              <div className="min-w-[700px] w-full transform origin-top mx-auto">
                {/* INÍCIO DO CV PARA PDF */}
                <div
                  ref={resumeRef}
                  className="bg-[#0f1117] text-sm leading-relaxed overflow-hidden"
                  style={{ width: '100%', minHeight: '297mm' }}
                >
                  {/* CV Header Centralizado */}
                  <div className="text-center px-10 pt-16 pb-8">
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-2 uppercase">
                      {profile.full_name}
                    </h2>
                    <h3 className="text-xl text-accent font-black uppercase tracking-[0.3em] mb-6">
                      {profile.job_title}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-sm font-medium">
                      {profile.email && (
                        <div className="flex items-center justify-center gap-2">
                          <FaEnvelope className="text-accent text-base" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                      {profile.location && (
                        <div className="flex items-center justify-center gap-2">
                          <FaMapMarkerAlt className="text-accent text-base" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                      {profile.github_url && (
                        <div className="flex items-center justify-center gap-2">
                          <FaCode className="text-accent text-base" />
                          <span>{profile.github_url.replace('https://', '')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-10 pb-16 pt-2 space-y-10">

                    {/* Divider Line Horizontal */}
                    <div className="w-full h-px bg-white/10 mb-8"></div>

                    {/* Resumo Profissional Alinhado a Esquerda */}
                    {profile.biography && (
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-3 w-full mb-6">
                          <FaCode className="text-accent text-xl" />
                          <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Resumo Profissional
                          </h4>
                          <div className="flex-1 h-px bg-white/20 ml-4"></div>
                        </div>
                        <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                          {profile.biography}
                        </p>
                      </div>
                    )}

                    {/* Educação Alinhada a Esquerda */}
                    {data.education.length > 0 && (
                      <div className="flex flex-col text-left pt-2">
                        <div className="flex items-center gap-3 w-full mb-6">
                          <FaGraduationCap className="text-accent text-xl" />
                          <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Educação
                          </h4>
                          <div className="flex-1 h-px bg-white/20 ml-4"></div>
                        </div>
                        <div className="space-y-6 w-full">
                          {data.education.map(edu => (
                            <div key={edu.id} className="flex flex-col text-left relative pl-6 border-l-2 border-white/10 pb-2">
                              <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent"></span>
                              <p className="font-bold text-white text-base mb-1">{edu.course}</p>
                              <p className="text-accent text-xs md:text-sm font-semibold tracking-wide">
                                {edu.institution} {edu.level ? ` • ${edu.level}` : ''} <span className="text-text-muted font-normal ml-1">• {edu.start_date} — {edu.end_date || 'Em Andamento'}</span>
                              </p>
                              {edu.description && (
                                <p className="text-text-secondary text-xs md:text-sm mt-3 border-l px-3 border-white/10 italic">
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certificações Alinhadas a Esquerda */}
                    {data.certificates.length > 0 && (
                      <div className="flex flex-col text-left pt-2">
                        <div className="flex items-center gap-3 w-full mb-6">
                          <FaCertificate className="text-accent text-xl" />
                          <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Certificações
                          </h4>
                          <div className="flex-1 h-px bg-white/20 ml-4"></div>
                        </div>
                        <div className="space-y-6 w-full">
                          {data.certificates.map(cert => (
                            <div key={cert.id} className="flex flex-col text-left relative pl-6 border-l-2 border-white/10 pb-1">
                              <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent"></span>
                              <p className="font-bold text-white text-base mb-1">{cert.name}</p>
                              <p className="text-text-secondary text-sm font-medium">
                                <span className="text-accent/80">{cert.issuer}</span>
                                {cert.date ? ` • ${cert.date}` : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projetos Alinhados a Esquerda */}
                    {data.projects.length > 0 && (
                      <div className="flex flex-col text-left pt-2">
                        <div className="flex items-center gap-3 w-full mb-6">
                          <FaBriefcase className="text-accent text-xl" />
                          <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Projetos de Destaque
                          </h4>
                          <div className="flex-1 h-px bg-white/20 ml-4"></div>
                        </div>
                        <div className="space-y-6 w-full">
                          {data.projects.map(proj => (
                            <div key={proj.id} className="flex flex-col text-left">
                              <div className="flex items-center gap-3 mb-2">
                                <h5 className="font-bold text-white text-base">{proj.title}</h5>
                                {proj.demo_url && (
                                  <a href={proj.demo_url} className="text-accent text-[10px] underline" target="_blank" rel="noopener noreferrer">Live Demo</a>
                                )}
                              </div>
                              <p className="text-text-secondary text-sm mb-3 leading-relaxed">{proj.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {proj.technologies?.map(tech => (
                                  <span key={tech.id} className="text-[10px] uppercase font-bold text-accent bg-accent/5 px-2 py-1 rounded border border-white/5">
                                    {tech.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tecnologias & Habilidades Alinhadas a Esquerda */}
                    {data.technologies.length > 0 && (
                      <div className="flex flex-col text-left pt-2">
                        <div className="flex items-center gap-3 w-full mb-6">
                          <FaCode className="text-accent text-xl" />
                          <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                            Tecnologias & Habilidades
                          </h4>
                          <div className="flex-1 h-px bg-white/20 ml-4"></div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {data.technologies.map(t => (
                            <span key={t.id} className="text-xs font-semibold text-text-primary bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Idiomas Alinhados a Esquerda */}
                    <div className="flex flex-col text-left pt-2 pb-4">
                      <div className="flex items-center gap-3 w-full mb-6">
                        <FaGlobe className="text-accent text-xl" />
                        <h4 className="text-lg font-black text-white uppercase tracking-widest whitespace-nowrap">
                          Idiomas
                        </h4>
                        <div className="flex-1 h-px bg-white/20 ml-4"></div>
                      </div>
                      <div className="flex gap-8 text-sm md:text-base">
                        <span><strong className="text-white">Português</strong> <span className="text-accent/80">— Nativo</span></span>
                        <span><strong className="text-white">Inglês</strong> <span className="text-accent/80">— Intermediário</span></span>
                      </div>
                    </div>

                  </div>
                </div>
                {/* FIM DO CV */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Resume;
