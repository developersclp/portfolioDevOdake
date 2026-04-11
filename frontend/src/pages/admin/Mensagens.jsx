import { useState, useEffect } from 'react';
import { getContactMessages } from '../../services/api';
import { FaEnvelope, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Mensagens() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContactMessages()
      .then(res => {
        setMessages(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-white">Mensagens Recebidas</h1>

      <div className="space-y-4">
        {messages.length === 0 ? (
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
              className="glass-card p-6 border-l-4 border-l-accent"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                  <p className="text-accent text-sm">{msg.email}</p>
                </div>
                <div className="flex items-center gap-2 text-text-muted text-xs bg-white/5 py-1 px-3 rounded-full">
                  <FaClock className="w-3 h-3" />
                  {new Date(msg.created_at).toLocaleString('pt-BR')}
                </div>
              </div>
              <p className="text-text-secondary bg-white/5 p-4 rounded-lg border border-white/5 italic">
                "{msg.message}"
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Mensagens;
