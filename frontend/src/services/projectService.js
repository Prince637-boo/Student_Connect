import api from './api';

export const getAllProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors de la récupération des projets");
    }
};

export const createProject = async (formData) => {
    try {
        const response = await api.post('/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors de la création du projet");
    }
};

export const likeProject = async (id) => {
    try {
        const response = await api.post(`/projects/${id}/like`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors du like");
    }
};

export const addComment = async (id, content) => {
    try {
        const response = await api.post(`/projects/${id}/comment`, { content });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors de l'ajout du commentaire");
    }
};

export const trackView = async (id) => {
    try {
        const response = await api.post(`/projects/${id}/view`);
        return response.data;
    } catch (error) {
        console.error("Erreur tracking vue:", error);
    }
};
