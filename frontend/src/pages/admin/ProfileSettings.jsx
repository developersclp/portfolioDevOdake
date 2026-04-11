import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FaUserCircle, FaSave, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

function ProfileSettings() {
  const [form, setForm] = useState({
    username: '',
    full_name: '',
    job_title: '',
    email: '',
    github_url: '',
    linkedin_url: '',
    biography: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/users/me')
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/users/me', form);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Configurações de Perfil</h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
            <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center">
                <FaUserCircle className="w-10 h-10 text-accent" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">{form.full_name || 'Usuário'}</h2>
                <p className="text-text-muted">{form.job_title || 'Desenvolvedor'}</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Nome Completo</label>
              <input 
                className="input-field w-full" 
                value={form.full_name} 
                onChange={e => setForm({...form, full_name: e.target.value})} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Cargo / Especialidade</label>
              <input 
                className="input-field w-full" 
                value={form.job_title} 
                onChange={e => setForm({...form, job_title: e.target.value})} 
              />
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1 flex items-center gap-2">
                <FaEnvelope className="w-3 h-3" /> E-mail de Contato
              </label>
              <input 
                className="input-field w-full" 
                type="email"
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1 flex items-center gap-2">
                <FaGithub className="w-3 h-3" /> GitHub URL
              </label>
              <input 
                className="input-field w-full" 
                value={form.github_url} 
                onChange={e => setForm({...form, github_url: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1 flex items-center gap-2">
                <FaLinkedin className="w-3 h-3" /> LinkedIn URL
              </label>
              <input 
                className="input-field w-full" 
                value={form.linkedin_url} 
                onChange={e => setForm({...form, linkedin_url: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider pl-1">Biografia</label>
            <textarea 
              className="input-field w-full h-32" 
              value={form.biography} 
              onChange={e => setForm({...form, biography: e.target.value})} 
            />
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="btn-gradient w-fit px-12 py-3 flex items-center gap-2"
          >
            {saving ? 'Salvando...' : <><FaSave /> Salvar Alterações</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ProfileSettings;
