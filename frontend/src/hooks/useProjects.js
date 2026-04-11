import { useState, useEffect } from 'react';
import { getProjects } from '../services/api';

export function useProjects(featured = null) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjects(featured);
        // Garante que projects sempre seja um array para evitar erro de .map()
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Erro ao carregar projetos');
        setProjects([]); // Fallback para array vazio em caso de erro
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [featured]);

  return { projects, loading, error };
}

export default useProjects;
