import { FaRegBell, FaUser } from 'react-icons/fa';
import { useProfile } from '../../context/ProfileContext';

function AdminHeader() {
  const { profile, loading } = useProfile();

  return (
    <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-primary-200/50 backdrop-blur-md sticky top-0 z-40">
      <h1 className="text-xl font-semibold text-white">Painel</h1>
      
      <div className="flex items-center gap-6">
        <button className="text-text-muted hover:text-white relative p-2 transition-colors">
          <FaRegBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border-2 border-primary-200"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">
              {loading ? 'Carregando...' : (profile?.full_name || profile?.username || 'Usuário')}
            </p>
            <p className="text-xs text-text-muted underline decoration-accent/30 lowercase">
              {profile?.email || 'configurando perfil...'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold border border-white/20 overflow-hidden">
            {profile?.username ? profile.username.substring(0, 1).toUpperCase() : <FaUser className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
