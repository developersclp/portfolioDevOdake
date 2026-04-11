import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaFolderOpen, FaTools, FaUserCircle, FaEnvelope, FaExternalLinkAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', icon: FaChartPie, path: '/admin' },
  { name: 'Meus Projetos', icon: FaFolderOpen, path: '/admin/projects' },
  { name: 'Skills', icon: FaTools, path: '/admin/skills' },
  { name: 'Sobre Mim', icon: FaUserCircle, path: '/admin/profile' },
  { name: 'Mensagens', icon: FaEnvelope, path: '/admin/messages' },
];

function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-primary-300 border-r border-white/10 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 text-white font-bold text-xl mb-8">
            <span className="text-accent">{'</>'}</span>
            <span>Portfolio</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-text-muted'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2 border-t border-white/5">
        <a 
          href="/" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-white rounded-lg transition-colors"
        >
          <FaExternalLinkAlt className="w-4 h-4" />
          <span>Ver Site</span>
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
