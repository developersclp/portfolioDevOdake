import { useState, useEffect } from 'react';
import { getCertificates, createCertificate, deleteCertificate } from '../../services/api';
import { FaTrash, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Certificados() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', issuer: '', date: '', link: '', order: 0 });
  const [imageFile, setImageFile] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getCertificates();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar certificados:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('issuer', form.issuer);
    formData.append('date', form.date);
    formData.append('link', form.link);
    formData.append('order', form.order);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await createCertificate(formData);
      setForm({ name: '', issuer: '', date: '', link: '', order: 0 });
      setImageFile(null);
      fetchData();
    } catch (err) {
      alert('Erro ao criar certificado');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir este certificado?')) return;
    try {
      await deleteCertificate(id);
      fetchData();
    } catch (err) { console.error(err); }
  };

  if (loading) return null;

  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1').replace('/api/v1', '');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Gerenciar Certificados</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FaCertificate className="text-yellow-500" /> Novo Certificado
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="input-field w-full"
                placeholder="Nome do Certificado"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="input-field w-full"
                placeholder="Emissor (ex: AWS, Google)"
                value={form.issuer}
                onChange={e => setForm({ ...form, issuer: e.target.value })}
                required
              />
              <input
                className="input-field w-full"
                placeholder="Data (ex: Fev 2026)"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
              <input
                className="input-field w-full"
                placeholder="Link do Certificado"
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
              />
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted font-bold uppercase">Imagem (opcional)</label>
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
          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="text-text-muted italic text-center py-8">Nenhum certificado cadastrado.</p>
            ) : (
              items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {item.image_url && (
                      <div className="w-10 h-10 rounded overflow-hidden bg-black/20 flex items-center justify-center p-1 shrink-0">
                        <img src={`${API_BASE}${item.image_url}`} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-text-muted">{item.issuer}</span>
                        {item.date && <span className="text-xs text-text-muted">• {item.date}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4 shrink-0">
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-accent/50 hover:text-accent transition-colors">
                        <FaExternalLinkAlt className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button onClick={() => handleDelete(item.id)} className="text-red-400/50 hover:text-red-400 transition-colors">
                      <FaTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificados;
