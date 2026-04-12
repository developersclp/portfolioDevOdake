import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  // Não definimos Content-Type globalmente para permitir que o Axios
  // defina automaticamente 'multipart/form-data' (com boundary) para FormData
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Se o body for FormData, garante que o Content-Type NÃO seja forçado
  // para que o Axios defina automaticamente 'multipart/form-data' com o boundary correto
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    // JSON requests precisam do Content-Type explícito
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// Interceptor para lidar com erros de autenticação (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Se o token for inválido/expirado, remove e força login
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Projects
export const getProjects = async (featured = null) => {
  const params = featured !== null ? { featured } : {};
  const response = await api.get('/projects/', { params });
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
};

// Technologies
export const getTechnologies = async (category = null) => {
  const params = category ? { category } : {};
  const response = await api.get('/technologies/', { params });
  return response.data;
};

// Contact
export const sendContactMessage = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

// Admin Auth
export const adminLogin = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

// Admin CRUD
export const createProject = async (data) => {
  const response = await api.post('/projects/', data);
  return response.data;
};
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/projects/${id}`, data);
  return response.data;
};

export const uploadProjectImage = async (projectId, file, isMain = false) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('is_main', isMain);

  // Remove explicit headers so Axios can automatically generate the correct boundary
  const response = await api.post(`/projects/${projectId}/images`, formData);
  return response.data;
};

export const deleteProjectImage = async (imageId) => {
  const response = await api.delete(`/projects/images/${imageId}`);
  return response.data;
};

export const createTechnology = async (data) => {
  // Remove explicit headers so Axios can automatically generate the correct boundary
  const response = await api.post('/technologies/', data);
  return response.data;
};
export const deleteTechnology = async (id) => {
  const response = await api.delete(`/technologies/${id}`);
  return response.data;
};

export const getContactMessages = async () => {
  const response = await api.get('/contact/');
  return response.data;
};

export default api;
