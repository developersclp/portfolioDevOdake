import { FaGithub, FaLinkedin, FaLock, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

function Footer() {
  const { profile, loading } = useProfile();
  const currentYear = new Date().getFullYear();

  if (loading) return null;

  const socialLinks = [
    { icon: FaGithub, href: profile?.github_url, label: 'GitHub' },
    { icon: FaLinkedin, href: profile?.linkedin_url, label: 'LinkedIn' },
  ].filter(link => link.href);

  return (
    <footer className="relative z-10 bg-primary-200/50 border-t border-glass-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {profile?.full_name ? profile.full_name.split(' ').map(n => n?.[0] || '').join('').substring(0, 2).toUpperCase() : 'PO'}
                </span>
              </div>
              <span className="text-text-primary text-xl font-bold tracking-tight">
                {profile?.full_name ? profile.full_name.split(' ')[0] : 'Pedro'}
                <span className="gradient-text">{profile?.full_name ? profile.full_name.split(' ').slice(1).join(' ') : 'Odake'}</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              {profile?.job_title || 'Desenvolvedor focado em criar aplicações escaláveis.'}
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-6 uppercase tracking-wider text-sm">Navegação Rápida</h3>
            <ul className="space-y-3">
              {['Home', 'Sobre', 'Tecnologias', 'Projetos', 'Contato'].map((item) => (
                <li key={item}>
                  <a href={`/#${item.toLowerCase()}`} className="text-text-muted hover:text-accent text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-text-primary font-semibold mb-6 uppercase tracking-wider text-sm">Contato</h3>
            <ul className="space-y-4">
              {profile?.email && (
                <li className="flex items-center gap-3 text-text-muted text-sm hover:text-text-primary transition-colors">
                  <FaEnvelope className="w-4 h-4 text-accent/70" />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
              )}
              <li className="flex items-center gap-3 text-text-muted text-sm">
                <FaMapMarkerAlt className="w-4 h-4 text-accent/70" />
                <span>Brasil</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-glass-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm text-center md:text-left">
            © {currentYear} {profile?.full_name || 'Pedro Odake'}. Todos os direitos reservados.
          </p>
          
          <Link 
            to="/admin" 
            className="flex items-center gap-2 text-xs font-medium text-text-muted/60 hover:text-accent transition-colors px-3 py-1.5 rounded-full hover:bg-accent/10 border border-transparent hover:border-accent/20"
            title="Acesso Restrito"
          >
            <FaLock className="w-3 h-3" />
            <span>Painel Administrativo</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

