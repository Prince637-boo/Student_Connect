import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    // Si mon backend renvoie un token, je le stocke
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    // Store user data for easy access
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    // On renvoie l'erreur pour que le composant puisse l'afficher
    throw error.response ? error.response.data : new Error("Erreur serveur");
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Erreur serveur");
  }
};