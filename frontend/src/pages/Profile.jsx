import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, Github, Linkedin, Edit3, Save, X, Camera, Plus, Loader2, Heart, MessageCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import { getUserProfile, updateUserProfile } from '../services/userService';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        bio: '',
        skills: '',
        github: '',
        linkedin: ''
    });
    const [photoFile, setPhotoFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile();
            setUser(data);
            setFormData({
                bio: data.bio || '',
                skills: data.skills || '',
                github: data.github || '',
                linkedin: data.linkedin || ''
            });
            setPreviewUrl(data.photoUrl);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const submitData = new FormData();
        submitData.append('bio', formData.bio);
        submitData.append('skills', formData.skills);
        submitData.append('github', formData.github);
        submitData.append('linkedin', formData.linkedin);
        if (photoFile) {
            submitData.append('image', photoFile);
        }

        try {
            await updateUserProfile(submitData);
            setEditMode(false);
            fetchProfile();
        } catch (err) {
            alert(err.error || "Erreur lors de la mise à jour");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 size={40} className="text-[#D4AF37] animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">

                    {/* Header Profil */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 mb-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/5 to-transparent rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700"></div>

                        <div className="relative flex flex-col md:flex-row items-center gap-8">
                            {/* Photo de profil */}
                            <div className="relative">
                                <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-br from-black to-gray-800 overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-black text-[#D4AF37]">
                                            {user.prenom[0]}{user.nom[0]}
                                        </span>
                                    )}
                                </div>
                                {editMode && (
                                    <label className="absolute bottom-2 right-2 p-3 bg-[#D4AF37] text-white rounded-2xl cursor-pointer hover:scale-110 transition-all shadow-lg">
                                        <Camera size={20} />
                                        <input type="file" className="hidden" onChange={handlePhotoChange} accept="image/*" />
                                    </label>
                                )}
                            </div>

                            {/* Infos principales */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                    <h2 className="text-4xl font-black text-black tracking-tight">
                                        {user.prenom} <span className="text-[#D4AF37]">{user.nom}</span>
                                    </h2>
                                    {!editMode ? (
                                        <button
                                            onClick={() => setEditMode(true)}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#D4AF37] rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
                                        >
                                            <Edit3 size={14} /> Modifier
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={updating}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                                            >
                                                {updating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Enregistrer
                                            </button>
                                            <button
                                                onClick={() => { setEditMode(false); setPreviewUrl(user.photoUrl); }}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                                            >
                                                <X size={14} /> Annuler
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <GraduationCap size={18} className="text-[#D4AF37]" />
                                        <span>{user.ecole}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={18} className="text-[#D4AF37]" />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Barre Latérale Profil */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Bio */}
                            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4 border-b border-gray-50 pb-2">Bio</h3>
                                {editMode ? (
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none h-32"
                                        placeholder="Décrivez votre parcours..."
                                    />
                                ) : (
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {user.bio || "Aucune bio renseignée."}
                                    </p>
                                )}
                            </div>

                            {/* Compétences */}
                            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4 border-b border-gray-50 pb-2">Compétences</h3>
                                {editMode ? (
                                    <input
                                        type="text"
                                        value={formData.skills}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                        placeholder="React, Node, UI Design..."
                                    />
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {user.skills ? user.skills.split(',').map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg text-xs font-bold uppercase">
                                                {skill.trim()}
                                            </span>
                                        )) : <span className="text-gray-400 text-xs italic">Non spécifié</span>}
                                    </div>
                                )}
                            </div>

                            {/* Liens Réseaux */}
                            <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
                                <h3 className="text-xs font-black uppercase tracking-widest text-black mb-4 border-b border-gray-50 pb-2">Réseaux</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                                            <Github size={20} />
                                        </div>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={formData.github}
                                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                className="flex-1 bg-gray-50 border-none rounded-xl p-2 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                                placeholder="GitHub username"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-black">{user.github || "-"}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                                            <Linkedin size={20} />
                                        </div>
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={formData.linkedin}
                                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                className="flex-1 bg-gray-50 border-none rounded-xl p-2 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                                placeholder="LinkedIn profile"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-black">{user.linkedin || "-"}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Projets de l'utilisateur */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-black">Mes <span className="text-[#D4AF37]">Réalisations</span></h3>
                                <div className="px-4 py-2 bg-white rounded-xl border border-gray-100 text-xs font-bold uppercase tracking-widest">
                                    {user.Projects?.length || 0} Projets
                                </div>
                            </div>

                            <div className="space-y-6">
                                {user.Projects && user.Projects.length > 0 ? (
                                    user.Projects.map(project => (
                                        <ProjectCard key={project.id} project={{ ...project, User: user }} />
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-[2.5rem]">
                                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                            <Plus size={32} />
                                        </div>
                                        <p className="text-gray-400 font-semibold mb-4">Vous n'avez pas encore publié de projet.</p>
                                        <button className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:scale-105 transition-all">
                                            Publier ma première oeuvre
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
