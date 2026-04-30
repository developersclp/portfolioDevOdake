import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { FaDownload } from 'react-icons/fa';

function Resume() {
  return (
    <section id="curriculo" className="relative py-20 pb-28">
      <div className="section-container">
        <SectionTitle
          title="Meu Currículo"
          subtitle="Faça o download do meu currículo profissional atualizado"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto mt-10"
        >
          <div className="glass-card p-8 md:p-12 text-center shadow-[0_0_30px_rgba(108,99,255,0.05)] border-accent/20 w-full">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8 text-accent">
              <FaDownload className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Currículo em PDF</h3>
            <p className="text-text-secondary text-base mb-10 leading-relaxed max-w-lg mx-auto">
              Clique no botão abaixo para baixar a versão mais recente do meu currículo profissional contendo minhas habilidades, experiências e projetos.
            </p>
            
            <a
              href="/CV - Pedro Odake.pdf"
              download="CV_Pedro_Odake.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient w-full md:w-2/3 inline-flex items-center justify-center gap-3 px-10 py-4 group shimmer-btn relative overflow-hidden shadow-lg hover:shadow-accent/40 rounded-xl mx-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 font-bold uppercase tracking-wider text-sm">
                Baixar Currículo
              </span>
              <FaDownload className="w-5 h-5 relative z-10 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Resume;
