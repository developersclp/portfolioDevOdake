import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { getCertificates } from '../services/api';

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await getCertificates();
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => {
            const yearA = parseInt(String(a.date || '').match(/\d{4}/)?.[0] || '0');
            const yearB = parseInt(String(b.date || '').match(/\d{4}/)?.[0] || '0');
            if (yearA !== yearB) return yearB - yearA;
            return String(b.date || '').localeCompare(String(a.date || ''));
          });
          setCertificates(sorted);
        } else {
          setCertificates([]);
        }
      } catch (err) {
        console.error('Erro ao carregar certificados:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return null;

  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="certificates" className="relative py-20">
      <div className="section-container">
        <SectionTitle
          title="Certificações"
          subtitle="Validações do meu conhecimento e habilidades contínuas"
        />

        {certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FaCertificate className="w-14 h-14 text-accent/20 mb-4" />
            <p className="text-text-muted text-lg font-medium">Nenhum certificado cadastrado ainda.</p>
            <p className="text-text-muted/60 text-sm mt-1">Adicione certificados pelo painel administrativo.</p>
          </div>
        ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <motion.div 
              key={cert.id} 
              variants={itemVariants}
              className="glass-card group overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Imagem (Opcional) no topo ou Ícone grande */}
                <div className="h-32 bg-primary-300/50 flex items-center justify-center p-4 relative overflow-hidden group-hover:bg-primary-300 transition-colors">
                  {/* Decorativo de fundo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {cert.image_url ? (
                    <img 
                      src={`${API_BASE}${cert.image_url}`} 
                      alt={cert.name} 
                      className="max-h-full object-contain relative z-10 filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all"
                    />
                  ) : (
                    <FaCertificate className="w-16 h-16 text-accent/20 group-hover:text-accent/40 group-hover:scale-110 transition-all duration-300 relative z-10" />
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors leading-snug">
                      {cert.name}
                    </h3>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <div>
                      <p className="text-text-primary text-sm font-medium">{cert.issuer}</p>
                      {cert.date && <p className="text-text-muted text-xs mt-0.5">{cert.date}</p>}
                    </div>
                    
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(108,99,255,0.4)] transition-all"
                        aria-label="Ver certificado"
                      >
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}
      </div>
    </section>
  );
}

export default Certificates;
