import { useState, useEffect } from 'react';
import { getTechnologies, createTechnology, deleteTechnology } from '../../services/api';
import { FaTrash, FaPlus, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', category: 'frontend', order: 0 });
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getTechnologies();
      setSkills(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error('Erro ao pesquisar habilidades:', err);
      setSkills([]);
    }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
        alert('Por favor, selecione uma imagem');
        return;
    }
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('order', form.order);
    formData.append('image', imageFile);

    try {
      await createTechnology(formData);
      setForm({ name: '', category: 'frontend', order: 0 });
      setImageFile(null);
      fetchData();
    } catch (err) { alert('Erro ao criar habilidade'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta habilidade?')) return;
    try {
      await deleteTechnology(id);
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Gerenciar Habilidades</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaTools className="text-green-500" /> Nova Skill
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                className="input-field w-full" 
                placeholder="Nome (Ex: React)" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
              />
              <select 
                className="input-field w-full bg-primary-200" 
                value={form.category} 
                onChange={e => setForm({...form, category: e.target.value})}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
              </select>
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted font-bold uppercase">Imagem (Ícone)</label>
                <input 
                    type="file" 
                    accept="image/*"
                    className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 transition-all cursor-pointer"
                    onChange={e => setImageFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn-gradient w-full py-3 mt-2">Adicionar</button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-2">
            {['frontend', 'backend', 'database', 'devops'].map(category => (
                <div key={category} className="space-y-2 mb-6">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest pl-2 mb-3">{category}</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {skills.filter(s => s.category === category).map(skill => (
                            <div key={skill.id} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-all">
                                <span className="text-sm text-text-secondary font-medium">{skill.name}</span>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded overflow-hidden bg-black/20 flex items-center justify-center p-1">
                                        {skill.image_url ? (
                                            <img src={`${(import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '')}${skill.image_url}`} alt={skill.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-xs text-center text-text-muted">Sem Imagem</span>
                                        )}
                                    </div>
                                    <button onClick={() => handleDelete(skill.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                                        <FaTrash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;
