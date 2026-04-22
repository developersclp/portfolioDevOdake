import { useState, useEffect } from 'react';
import { getEducation, createEducation, deleteEducation } from '../../services/api';
import { FaTrash, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Formacao() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    institution: '',
    course: '',
    level: 'Técnico',
    start_date: '',
    end_date: '',
    description: '',
    order: 0,
  });

  const fetchData = async () => {
    try {
      const data = await getEducation();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar formações:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEducation(form);
      setForm({ institution: '', course: '', level: 'Técnico', start_date: '', end_date: '', description: '', order: 0 });
      fetchData();
    } catch (err) {
      alert('Erro ao criar formação');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta formação?')) return;
    try {
      await deleteEducation(id);
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Gerenciar Formação</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FaGraduationCap className="text-accent" /> Nova Formação
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="input-field w-full"
                placeholder="Instituição"
                value={form.institution}
                onChange={e => setForm({ ...form, institution: e.target.value })}
                required
              />
              <input
                className="input-field w-full"
                placeholder="Curso"
                value={form.course}
                onChange={e => setForm({ ...form, course: e.target.value })}
                required
              />
              <select
                className="input-field w-full bg-primary-200"
                value={form.level}
                onChange={e => setForm({ ...form, level: e.target.value })}
              >
                <option value="Técnico">Técnico</option>
                <option value="Graduação">Graduação</option>
                <option value="Pós-Graduação">Pós-Graduação</option>
                <option value="MBA">MBA</option>
                <option value="Mestrado">Mestrado</option>
                <option value="Doutorado">Doutorado</option>
                <option value="Curso Livre">Curso Livre</option>
              </select>
              <input
                className="input-field w-full"
                placeholder="Data Início (ex: 03/2024)"
                value={form.start_date}
                onChange={e => setForm({ ...form, start_date: e.target.value })}
                required
              />
              <input
                className="input-field w-full"
                placeholder="Data Fim (vazio = Em andamento)"
                value={form.end_date}
                onChange={e => setForm({ ...form, end_date: e.target.value })}
              />
              <textarea
                className="input-field w-full resize-none"
                placeholder="Descrição (opcional)"
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <button type="submit" className="btn-gradient w-full py-3 mt-2">Adicionar</button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-text-muted italic text-center py-8">Nenhuma formação cadastrada.</p>
            ) : (
              items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-all"
                >
                  <div>
                    <p className="font-medium text-text-primary">{item.course}</p>
                    <p className="text-sm text-text-secondary">{item.institution}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                        {item.level}
                      </span>
                      <span className="text-xs text-text-muted">
                        {item.start_date} — {item.end_date || 'Em andamento'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400/50 hover:text-red-400 transition-colors ml-4">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formacao;
