import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject, getTechnologies, uploadProjectImage, deleteProjectImage } from '../../services/api';
import { FaTrash, FaEdit, FaPlus, FaRocket, FaImage, FaImages, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

function MeusProjetos() {
  const [projects, setProjects] = useState([]);
  const [availableTechs, setAvailableTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    github_url: '', 
    demo_url: '', 
    featured: false, 
    order: 0,
    technology_ids: [] 
  });

  const fetchData = async () => {
    try {
      const [p, t] = await Promise.all([getProjects(), getTechnologies()]);
      setProjects(Array.isArray(p) ? p : []);
      setAvailableTechs(Array.isArray(t) ? t : []);
    } catch (err) { 
      console.error('Erro ao carregar projetos/tecnologias:', err);
      setProjects([]);
      setAvailableTechs([]);
    }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...form,
        short_description: form.description.substring(0, 80) + '...'
      };

      let project;
      if (editingProject) {
        project = await updateProject(editingProject.id, projectData);
      } else {
        project = await createProject(projectData);
      }

      if (mainImage) {
        await uploadProjectImage(project.id, mainImage, true);
      }

      for (const img of galleryImages) {
        await uploadProjectImage(project.id, img, false);
      }

      setForm({ title: '', description: '', github_url: '', demo_url: '', featured: false, order: 0, technology_ids: [] });
      setMainImage(null);
      setGalleryImages([]);
      setEditingProject(null);
      fetchData();
    } catch (err) { 
      console.error(err);
      alert('Erro ao criar projeto ou enviar imagens'); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir este projeto?')) return;
    try {
      await deleteProject(id);
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      featured: project.featured,
      order: project.order,
      technology_ids: project.technologies.map(t => t.id)
    });
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setForm({ title: '', description: '', github_url: '', demo_url: '', featured: false, order: 0, technology_ids: [] });
    setMainImage(null);
    setGalleryImages([]);
  };

  const toggleTech = (id) => {
    setForm(prev => ({
        ...prev,
        technology_ids: prev.technology_ids.includes(id)
            ? prev.technology_ids.filter(i => i !== id)
            : [...prev.technology_ids, id]
    }));
  };

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Gerenciar Projetos</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaRocket className="text-accent" /> {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                className="input-field w-full" 
                placeholder="Título do Projeto" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                required 
              />
              <textarea 
                className="input-field w-full h-32" 
                placeholder="Descrição Completa" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                required 
              />
              <input 
                className="input-field w-full" 
                placeholder="GitHub URL" 
                value={form.github_url} 
                onChange={e => setForm({...form, github_url: e.target.value})} 
              />
              <input 
                className="input-field w-full" 
                placeholder="Demo URL (Online)" 
                value={form.demo_url} 
                onChange={e => setForm({...form, demo_url: e.target.value})} 
              />
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Tecnologias Usadas</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {availableTechs.map(tech => (
                        <button
                            key={tech.id}
                            type="button"
                            onClick={() => toggleTech(tech.id)}
                            className={`text-left px-3 py-2 rounded text-xs transition-all border ${
                                form.technology_ids.includes(tech.id)
                                ? 'bg-accent/20 border-accent text-white font-bold'
                                : 'bg-white/5 border-white/5 text-text-muted hover:border-white/20'
                            }`}
                        >
                            {tech.name}
                        </button>
                    ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-glass-border">
                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 mb-2">
                    <FaImage className="text-accent" /> Imagem Principal (Capa)
                  </label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => setMainImage(e.target.files[0])}
                    className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30 transition-all cursor-pointer"
                  />
                  {mainImage && <p className="text-xs text-text-muted mt-1">{mainImage.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2 mb-2">
                    <FaImages className="text-accent" /> Outras Imagens (Galeria)
                  </label>
                  <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={e => setGalleryImages(Array.from(e.target.files))}
                    className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
                  />
                  {galleryImages.length > 0 && <p className="text-xs text-text-muted mt-1">{galleryImages.length} selecionadas</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                    type="checkbox" 
                    id="featured" 
                    checked={form.featured} 
                    onChange={e => setForm({...form, featured: e.target.checked})}
                    className="accent-accent"
                />
                <label htmlFor="featured" className="text-sm text-text-secondary select-none">Projeto em Destaque</label>
              </div>

              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn-gradient flex-1 py-3">
                  {editingProject ? 'Salvar Alterações' : 'Criar Projeto'}
                </button>
                {editingProject && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl transition-all"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          {projects.map((proj, index) => (
            <motion.div 
              key={proj.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-5 flex items-center justify-between group hover:border-white/20 transition-all"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-white truncate">{proj.title}</h3>
                    {proj.featured && <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded uppercase font-bold tracking-tighter">Destaque</span>}
                </div>
                <p className="text-sm text-text-muted truncate mb-2">{proj.short_description}</p>
                <div className="flex flex-wrap gap-1">
                    {proj.technologies?.map(t => (
                        <span key={t.id} className="text-[9px] bg-white/5 text-text-muted px-1.5 py-0.5 rounded">{t.name}</span>
                    ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  onClick={() => handleEdit(proj)}
                  className="p-3 text-accent hover:bg-accent/10 rounded-full transition-all"
                  title="Editar projeto"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(proj.id)}
                  className="p-3 text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                  title="Excluir projeto"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeusProjetos;
