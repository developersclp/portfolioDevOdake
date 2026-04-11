import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* Background Decorative */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
        </div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 w-full max-w-md relative z-10 shadow-glow"
        >
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Admin Login</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-500 text-sm rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-text-secondary mb-1">Usuário</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-text-secondary mb-1">Senha</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field w-full"
                        required
                    />
                </div>
                
                <button type="submit" className="btn-gradient w-full mt-4 flex items-center justify-center">
                    Entrar
                </button>

                <p className="text-center text-sm text-text-muted mt-6">
                    Apenas para uso administrativo. <a href="/" className="text-accent underline">Voltar</a>
                </p>
            </form>
        </motion.div>
    </div>
  );
}

export default Login;
