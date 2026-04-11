import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const ProfileContext = createContext();

const defaultProfile = {
  full_name: 'Pedro Odake',
  job_title: 'Full Stack Developer',
  biography: 'Desenvolvedor apaixonado por criar aplicações web modernas e escaláveis com React e Python.',
  email: 'contato@pedroodake.com',
  github_url: 'https://github.com',
  linkedin_url: 'https://linkedin.com'
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(defaultProfile); // start with default
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/me');
      if (res.data) {
        // Remove null values so we don't overwrite defaults with nulls
        const safeData = Object.fromEntries(Object.entries(res.data).filter(([_, v]) => v != null));
        setProfile((prev) => ({ ...prev, ...safeData }));
      }
    } catch (err) {
      console.error('Error fetching profile, using fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
