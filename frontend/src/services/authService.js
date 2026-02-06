import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    // Si mon backend renvoie un token, je le stocke
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    // On renvoie l'erreur pour que le composant puisse l'afficher
    throw error.response ? error.response.data : new Error("Erreur serveur");
  }
};