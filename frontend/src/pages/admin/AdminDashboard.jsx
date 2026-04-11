import { useState, useEffect } from 'react';
import { getProjects, getTechnologies, getContactMessages } from '../../services/api';
import { FaFolderOpen, FaTools, FaEnvelope, FaPlus, FaUserEdit, FaExternalLinkAlt } from 'react-icons/fa';
import StatCard from '../../components/admin/StatCard';
import QuickAction from '../../components/admin/QuickAction';
import { motion } from 'framer-motion';

function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, s, m] = await Promise.all([
          getProjects(),
          getTechnologies(),
          getContactMessages()
        ]);
        setStats({
          projects: p.length,
          skills: s.length,
          messages: m.length
        });
        setRecentProjects(p.slice(0, 5));
        setRecentMessages(m.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-accent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end mb-4">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-text-muted">Bem-vindo de volta ao seu painel administrativo.</p>
        </div>
        <div className="text-right text-xs text-text-muted font-mono uppercase bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Projetos" count={stats.projects} icon={FaFolderOpen} colorClass="bg-blue-500" />
        <StatCard title="Habilidades" count={stats.skills} icon={FaTools} colorClass="bg-green-500" />
        <StatCard title="Novas Mensagens" count={stats.messages} icon={FaEnvelope} colorClass="bg-accent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaFolderOpen className="text-blue-400" /> Projetos Recentes
            </h2>
            <button className="text-accent hover:underline text-sm font-medium">Ver todos</button>
          </div>
          <div className="space-y-4">
            {recentProjects.length === 0 ? (
                <p className="text-text-muted italic text-center py-8">Nenhum projeto cadastrado.</p>
            ) : (
                recentProjects.map(proj => (
                    <div key={proj.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-all">
                        <span className="font-medium text-text-secondary">{proj.title}</span>
                        <div className="flex gap-1">
                            {proj.technologies?.slice(0, 3).map(tech => (
                                <span key={tech.id} className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                            ))}
                        </div>
                    </div>
                ))
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaEnvelope className="text-accent" /> Mensagens Recentes
            </h2>
            <button className="text-accent hover:underline text-sm font-medium">Ver todas</button>
          </div>
          <div className="space-y-4">
            {recentMessages.length === 0 ? (
                <p className="text-text-muted italic text-center py-8">Nenhuma mensagem nova.</p>
            ) : (
                recentMessages.map(msg => (
                <div key={msg.id} className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-text-primary">{msg.name}</span>
                        <span className="text-[10px] text-text-muted uppercase">{new Date(msg.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-text-muted line-clamp-1">{msg.message}</p>
                </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-accent rounded-full shadow-[0_0_8px_rgba(30,215,96,0.6)]"></span>
            Ações Rápidas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <QuickAction title="Novo Projeto" icon={FaPlus} path="/admin/projects" color="bg-blue-600 shadow-blue-600/20" />
          <QuickAction title="Nova Skill" icon={FaPlus} path="/admin/skills" color="bg-green-600 shadow-green-600/20" />
          <QuickAction title="Editar Perfil" icon={FaUserEdit} path="/admin/profile" color="bg-purple-600 shadow-purple-600/20" />
          <QuickAction title="Ver Site" icon={FaExternalLinkAlt} path="/" color="bg-gray-600 shadow-gray-600/20" />
        </div>
      </section>
    </motion.div>
  );
}

export default AdminDashboard;
