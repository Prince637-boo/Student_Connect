import api from './api';

export const getUserProfile = async () => {
    try {
        const response = await api.get('/user/me');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors de la récupération du profil");
    }
};

export const updateUserProfile = async (formData) => {
    try {
        const response = await api.put('/user/me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Erreur lors de la mise à jour du profil");
    }
};
