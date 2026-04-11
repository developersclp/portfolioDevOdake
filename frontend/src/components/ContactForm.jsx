import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { sendContactMessage } from '../services/api';
import SectionTitle from './SectionTitle';
import { useProfile } from '../context/ProfileContext';

function ContactForm() {
  const { profile, loading } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const { ref, isVisible } = useScrollAnimation();

  if (loading || !profile) return null;

  const socialLinks = [
    { icon: FaGithub, href: profile.github_url, label: 'GitHub' },
    { icon: FaLinkedin, href: profile.linkedin_url, label: 'LinkedIn' },
  ].filter(link => link.href);

  const contactInfo = [
    { icon: HiMail, text: profile.email, label: 'Email' },
    { icon: HiLocationMarker, text: 'Brasil', label: 'Local' },
    { icon: HiPhone, text: 'Disponível para propostas', label: 'Status' },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err.response?.data?.detail?.[0]?.msg ||
        err.response?.data?.detail ||
        'Erro ao enviar mensagem. Tente novamente.'
      );
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-container" ref={ref}>
        <SectionTitle
          title="Entre em Contato"
          subtitle="Tem um projeto em mente? Vamos conversar sobre como posso ajudar"
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Vamos trabalhar juntos?
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Estou sempre aberto a discutir novos projetos, ideias criativas
                ou oportunidades de colaboração.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center
                                flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-text-primary font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-text-muted text-sm mb-4 uppercase tracking-wider">Me encontre em</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card flex items-center justify-center
                             hover:border-accent/30 hover:text-accent text-text-secondary
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-glow/10"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-text-secondary text-sm mb-2 font-medium">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome"
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-text-secondary text-sm mb-2 font-medium">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-text-secondary text-sm mb-2 font-medium">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Conte-me sobre seu projeto..."
                  className="input-field resize-none"
                />
              </div>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-accent-secondary/10 border border-accent-secondary/20
                           text-accent-secondary text-sm font-medium"
                >
                  ✅ Mensagem enviada com sucesso! Retornarei em breve.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20
                           text-red-400 text-sm font-medium"
                >
                  ❌ {errorMsg}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gradient w-full flex items-center justify-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <HiMail className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
