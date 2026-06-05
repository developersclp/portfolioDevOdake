import { useState, useEffect } from 'react';
import { getTechnologies, createTechnology, deleteTechnology, reorderTechnologies } from '../../services/api';
import { FaTrash, FaPlus, FaTools } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    const reorderedSkills = Array.from(skills);
    const [movedSkill] = reorderedSkills.splice(source.index, 1);
    reorderedSkills.splice(destination.index, 0, movedSkill);

    // Atualiza localmente
    const withNewOrders = reorderedSkills.map((s, idx) => ({ ...s, order: idx }));
    setSkills(withNewOrders);

    try {
      await reorderTechnologies(withNewOrders.map(s => s.id));
    } catch (err) {
      console.error('Erro ao reordenar habilidades:', err);
      alert('Erro ao salvar nova ordenação no servidor');
      fetchData();
    }
  };

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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="skills">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 min-h-[200px] bg-white/[0.02] p-3 rounded-lg border border-dashed border-white/5"
                >
                  {skills.length === 0 ? (
                    <p className="text-text-muted italic text-center py-8">Nenhuma habilidade cadastrada.</p>
                  ) : (
                    skills.map((skill, index) => (
                      <Draggable key={skill.id} draggableId={String(skill.id)} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center justify-between p-3 rounded-lg hover:border-white/10 transition-all select-none ${
                              snapshot.isDragging 
                              ? 'bg-accent/20 border border-accent shadow-lg shadow-accent/10' 
                              : 'bg-white/5 border border-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-text-secondary font-medium">{skill.name}</span>
                              <span className="text-[10px] bg-white/5 text-text-muted px-2 py-0.5 rounded uppercase font-bold tracking-tight">
                                {skill.category}
                              </span>
                            </div>
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
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>

  );
}


export default Skills;
