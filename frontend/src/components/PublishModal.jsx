import React, { useState } from 'react';
import { X, Upload, Video, Link as LinkIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { createProject } from '../services/projectService';

const PublishModal = () => {
    const { isPublishModalOpen, closePublishModal } = useUI();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        youtubeLink: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    if (!isPublishModalOpen) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('youtubeLink', formData.youtubeLink);
        if (file) {
            data.append('file', file); // Multer attend 'file'
        }

        try {
            await createProject(data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                closePublishModal();
                setFormData({ title: '', category: '', description: '', youtubeLink: '' });
                setFile(null);
                setPreview(null);
                window.location.reload(); // Recharger pour voir le nouveau projet
            }, 2000);
        } catch (err) {
            alert(err.error || "Erreur lors de la publication");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-black">Publier une <span className="text-[#D4AF37]">Réalisation</span></h2>
                        <p className="text-gray-500 text-sm">Partagez votre travail avec la communauté étudiante.</p>
                    </div>
                    <button onClick={closePublishModal} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                        <X size={24} />
                    </button>
                </div>

                {success ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                            <CheckCircle2 size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-black mb-2">Projet Publié !</h3>
                        <p className="text-gray-500">Votre réalisation est maintenant visible sur le fil d'actualité.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Titre */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Titre du Projet</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                    placeholder="Ex: Refonte Dashboard SaaS"
                                />
                            </div>

                            {/* Catégorie */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Catégorie</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                >
                                    <option value="">Sélectionner...</option>
                                    <option value="Design">Design</option>
                                    <option value="Développement">Développement</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Business">Business</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Description</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none h-32"
                                placeholder="Expliquez votre projet, les technos utilisées..."
                            />
                        </div>

                        {/* Media Upload */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Image ou Vidéo</label>
                                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[2rem] p-6 cursor-pointer hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 transition-all group overflow-hidden h-40 relative">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                                    ) : (
                                        <>
                                            <Upload size={32} className="text-gray-300 mb-2 group-hover:text-[#D4AF37] transition-colors" />
                                            <span className="text-xs font-bold text-gray-400 group-hover:text-[#D4AF37]">Importer un fichier</span>
                                        </>
                                    )}
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                                </label>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Lien YouTube (Optionnel)</label>
                                <div className="flex flex-col justify-center h-40 bg-gray-50 rounded-[2rem] p-6 space-y-4">
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                                        <LinkIcon size={18} className="text-red-500" />
                                        <input
                                            type="url"
                                            value={formData.youtubeLink}
                                            onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
                                            className="flex-1 text-xs outline-none"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 leading-tight">Collez un lien YouTube pour afficher une vidéo directement.</p>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            className="w-full bg-black text-[#D4AF37] font-black py-4 rounded-3xl shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    <span>PUBLICATION EN COURS...</span>
                                </>
                            ) : (
                                <span>PUBLIER MAINTENANT</span>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PublishModal;
