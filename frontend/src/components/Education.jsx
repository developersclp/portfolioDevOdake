import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { getEducation } from '../services/api';

function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await getEducation();
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => {
            const yearA = parseInt(String(a.start_date || '').match(/\d{4}/)?.[0] || '0');
            const yearB = parseInt(String(b.start_date || '').match(/\d{4}/)?.[0] || '0');
            if (yearA !== yearB) return yearA - yearB;
            return String(a.start_date || '').localeCompare(String(b.start_date || ''));
          });
          setEducation(sorted);
        } else {
          setEducation([]);
        }
      } catch (err) {
        console.error('Erro ao carregar formação:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading) return null;

  return (
    <section id="education" className="relative py-20 bg-primary-200/30">
      <div className="section-container">
        <SectionTitle
          title="Minha Formação"
          subtitle="Meus estudos e capacitações acadêmicas"
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Linha vertical central animada */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent -translate-x-1/2 rounded-full"
          ></motion.div>

          {education.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FaGraduationCap className="w-14 h-14 text-accent/20 mb-4" />
              <p className="text-text-muted text-lg font-medium">Nenhuma formação cadastrada ainda.</p>
              <p className="text-text-muted/60 text-sm mt-1">Adicione formações pelo painel administrativo.</p>
            </div>
          ) : (
          <div className="space-y-12">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex md:justify-between items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Ponto na timeline */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary border-4 border-accent -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(108,99,255,0.4)]">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>

                  {/* Espaçador invisível na metade */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* Card de Conteúdo */}
                  <div className="w-full md:w-5/12 pl-12 md:pl-0">
                    <div className="glass-card p-6 border border-white/5 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)] transition-all duration-300 relative group overflow-hidden">
                      {/* Efeito de brilho hover */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          <FaGraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-1">
                            {item.level}
                          </span>
                          <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{item.course}</h3>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <p className="text-text-primary font-medium text-base">{item.institution}</p>
                        <div className="flex items-center gap-2 text-text-muted text-sm border-t border-white/5 pt-3">
                          <FaCalendarAlt className="text-accent/70" />
                          <span>{item.start_date} — {item.end_date || 'Em andamento'}</span>
                        </div>
                        {item.description && (
                          <p className="text-text-secondary text-sm mt-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Education;
