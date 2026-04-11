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
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar projetos');
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
