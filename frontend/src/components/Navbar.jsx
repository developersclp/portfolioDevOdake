import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../context/ProfileContext';

function Navbar() {
  const { profile, loading } = useProfile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Skills', href: '/#tech' },
    { name: 'Formação', href: '/#education' },
    { name: 'Certificados', href: '/#certificates' },
    { name: 'Projetos', href: '/#projects' },
    { name: 'Currículo', href: '/#curriculo' },
    { name: 'Contato', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (location.pathname !== '/') {
        window.location.href = href;
      }
      setIsMobileOpen(false);
    }
  };

  const initials = profile?.full_name ? profile.full_name.split(' ').map(n => n?.[0] || '').join('').substring(0, 2).toUpperCase() : 'PO';
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'Pedro';
  const lastName = profile?.full_name ? profile.full_name.split(' ').slice(1).join(' ') : 'Odake';

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-primary-200/80 backdrop-blur-xl border-b border-glass-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center
                          group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-white font-bold text-lg">{initials}</span>
            </div>
            <span className="text-text-primary font-bold text-xl hidden sm:block">
              {firstName}<span className="gradient-text">{lastName}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/projects"
              className="btn-gradient text-sm px-5 py-2.5"
            >
              Ver Todos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-200/95 backdrop-blur-xl border-b border-glass-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-text-secondary hover:text-text-primary
                           text-base font-medium py-2 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <Link
                to="/projects"
                className="block btn-gradient text-center text-sm mt-4"
              >
                Ver Todos os Projetos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
