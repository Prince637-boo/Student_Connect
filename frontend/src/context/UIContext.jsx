import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const openPublishModal = () => setIsPublishModalOpen(true);
    const closePublishModal = () => setIsPublishModalOpen(false);

    return (
        <UIContext.Provider value={{ isPublishModalOpen, openPublishModal, closePublishModal }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
