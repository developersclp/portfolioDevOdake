import { useState, useEffect } from 'react';
import { getContactMessages, markMessageAsRead } from '../../services/api';
import { FaEnvelope, FaEnvelopeOpen, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Mensagens() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setError(null);
      const res = await getContactMessages();
      setMessages(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
      setError('Não foi possível carregar as mensagens. Verifique se você está autenticado.');
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const updated = await markMessageAsRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: updated.is_read } : m));
    } catch (err) {
      console.error('Erro ao marcar mensagem como lida:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-white">Mensagens Recebidas</h1>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
              <div className="h-3 bg-white/10 rounded w-1/4 mb-6" />
              <div className="h-3 bg-white/5 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Mensagens Recebidas</h1>
        {messages.length > 0 && (
          <span className="text-sm text-text-muted">
            {messages.filter(m => !m.is_read).length} não lida(s) de {messages.length}
          </span>
        )}
      </div>

      {error && (
        <div className="glass-card p-6 border-l-4 border-l-red-500 flex items-start gap-4">
          <FaExclamationCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium">Erro ao carregar mensagens</p>
            <p className="text-text-muted text-sm mt-1">{error}</p>
            <button
              onClick={fetchMessages}
              className="mt-3 text-sm text-accent hover:underline"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!error && messages.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <FaEnvelope className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
            <p className="text-text-muted italic">Nenhuma mensagem recebida ainda.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`glass-card p-6 border-l-4 transition-all ${
                msg.is_read ? 'border-l-white/10 opacity-70' : 'border-l-accent'
              }`}
            >
              <div className="flex justify-between items-start mb-4 gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  {msg.is_read
                    ? <FaEnvelopeOpen className="w-4 h-4 text-text-muted/50 mt-1 shrink-0" />
                    : <FaEnvelope className="w-4 h-4 text-accent mt-1 shrink-0" />
                  }
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">{msg.name}</h3>
                    <p className="text-accent text-sm">{msg.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-text-muted text-xs bg-white/5 py-1 px-3 rounded-full">
                    <FaClock className="w-3 h-3" />
                    {new Date(msg.created_at).toLocaleString('pt-BR')}
                  </div>
                  {!msg.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="text-xs text-accent/70 hover:text-accent border border-accent/20 hover:border-accent/50 px-3 py-1 rounded-full transition-all whitespace-nowrap"
                    >
                      Marcar como lida
                    </button>
                  )}
                  {msg.is_read && (
                    <span className="text-xs text-text-muted/50 border border-white/10 px-3 py-1 rounded-full">
                      Lida
                    </span>
                  )}
                </div>
              </div>

              <p className="text-text-secondary bg-white/5 p-4 rounded-lg border border-white/5 italic leading-relaxed whitespace-pre-wrap break-words">
                {msg.message}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Mensagens;
