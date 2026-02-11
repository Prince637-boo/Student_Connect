import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Bell, Shield, Trash2, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getUserProfile } from '../services/userService';

const Settings = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form states
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [projectUpdates, setProjectUpdates] = useState(true);
    const [messageNotifications, setMessageNotifications] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile();
            setUser(data);
            setEmail(data.email || '');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }
        setSaving(true);
        // TODO: Implement password change API call
        setTimeout(() => {
            setSaving(false);
            alert('Mot de passe modifié avec succès!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    const handleNotificationSave = async () => {
        setSaving(true);
        // TODO: Implement notification settings save API call
        setTimeout(() => {
            setSaving(false);
            alert('Préférences enregistrées!');
        }, 1000);
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
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-black mb-2">
                            Para<span className="text-[#D4AF37]">mètres</span>
                        </h1>
                        <p className="text-gray-500">Gérez vos préférences et votre compte</p>
                    </div>

                    <div className="space-y-8">
                        {/* Account Information */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                                    <User size={20} className="text-[#D4AF37]" />
                                </div>
                                <h2 className="text-xl font-black text-black">Informations du compte</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        Nom complet
                                    </label>
                                    <input
                                        type="text"
                                        value={user ? `${user.prenom} ${user.nom}` : ''}
                                        disabled
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Le nom ne peut pas être modifié</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        École
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.ecole || ''}
                                        disabled
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        Email
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                        />
                                        <button
                                            disabled={email === user?.email}
                                            className="px-6 py-3 bg-black text-[#D4AF37] rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        >
                                            <Save size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Change Password */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                                    <Lock size={20} className="text-[#D4AF37]" />
                                </div>
                                <h2 className="text-xl font-black text-black">Modifier le mot de passe</h2>
                            </div>

                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        Mot de passe actuel
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        Nouveau mot de passe
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving || !currentPassword || !newPassword || !confirmPassword}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Enregistrer
                                </button>
                            </form>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                                    <Bell size={20} className="text-[#D4AF37]" />
                                </div>
                                <h2 className="text-xl font-black text-black">Notifications</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-bold text-sm text-black">Notifications par email</h3>
                                        <p className="text-xs text-gray-500">Recevoir des emails de notification</p>
                                    </div>
                                    <button
                                        onClick={() => setEmailNotifications(!emailNotifications)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${emailNotifications ? 'bg-[#D4AF37]' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-bold text-sm text-black">Mises à jour de projets</h3>
                                        <p className="text-xs text-gray-500">Notifications sur vos projets</p>
                                    </div>
                                    <button
                                        onClick={() => setProjectUpdates(!projectUpdates)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${projectUpdates ? 'bg-[#D4AF37]' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${projectUpdates ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-bold text-sm text-black">Messages</h3>
                                        <p className="text-xs text-gray-500">Notifications de nouveaux messages</p>
                                    </div>
                                    <button
                                        onClick={() => setMessageNotifications(!messageNotifications)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${messageNotifications ? 'bg-[#D4AF37]' : 'bg-gray-300'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${messageNotifications ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                        />
                                    </button>
                                </div>

                                <button
                                    onClick={handleNotificationSave}
                                    disabled={saving}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#D4AF37] rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Enregistrer les préférences
                                </button>
                            </div>
                        </div>

                        {/* Privacy & Security */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                                <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                                    <Shield size={20} className="text-[#D4AF37]" />
                                </div>
                                <h2 className="text-xl font-black text-black">Confidentialité</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-bold text-sm text-black mb-2">Visibilité du profil</h3>
                                    <p className="text-xs text-gray-500 mb-3">Votre profil est actuellement visible par tous les étudiants</p>
                                    <button className="text-xs font-bold text-[#D4AF37] hover:underline">
                                        Modifier les paramètres de confidentialité
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white border border-red-100 rounded-[2rem] p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-50">
                                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                    <Trash2 size={20} className="text-red-500" />
                                </div>
                                <h2 className="text-xl font-black text-red-600">Zone de danger</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 rounded-xl">
                                    <h3 className="font-bold text-sm text-red-900 mb-2">Supprimer le compte</h3>
                                    <p className="text-xs text-red-600 mb-3">
                                        Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                                    </p>
                                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold hover:bg-red-600 transition-colors">
                                        Supprimer mon compte
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
