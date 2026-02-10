import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, CircleUser } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', ecole: '', sexe: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Séparation du nom et prénom (simplifié : premier mot = prénom, le reste = nom)
        const nameParts = formData.name.trim().split(' ');
        const prenom = nameParts[0] || '';
        const nom = nameParts.slice(1).join(' ') || prenom; // Si un seul mot, on met le même pour les deux ou vide

        const userData = {
            nom,
            prenom,
            email: formData.email,
            password: formData.password,
            ecole: formData.ecole,
            sexe: formData.sexe
        };

        try {
            await register(userData);
            setSuccess("Inscription réussie ! Redirection...");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.error || "Erreur lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Inscription">
            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs text-center">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-xs text-center">{success}</div>}

            <form onSubmit={handleRegister}>
                <AuthInput
                    label="Nom complet"
                    icon={User}
                    placeholder="Votre nom"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <AuthInput
                    label="Email étudiant"
                    icon={Mail}
                    placeholder="votre.nom@ecole.fr"
                    type="email"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <AuthInput
                    label="Mot de passe"
                    icon={Lock}
                    type="password"
                    placeholder="********"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <AuthInput
                    label="Ecole"
                    icon={GraduationCap}
                    placeholder="Votre ecole"
                    required
                    onChange={(e) => setFormData({ ...formData, ecole: e.target.value })}
                />

                <AuthInput
                    label="Sexe"
                    icon={CircleUser}
                    type="text"
                    placeholder="M ou F"
                    required
                    onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                />

                <button
                    disabled={loading}
                    className="w-full mt-2 py-3.5 rounded-xl font-bold text-black 
                           bg-gradient-to-br from-[#f3cf7a] via-[#D4AF37] to-[#aa8a1e] 
                           shadow-[0_10px_30px_rgba(212,175,55,0.2)] 
                           hover:brightness-110 transition-all disabled:opacity-50">
                    {loading ? "CRÉATION..." : "CRÉER MON COMPTE"}
                </button>

                <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest">
                    Déjà membre ? <Link to="/login" className="text-[#D4AF37] font-bold hover:underline">Se connecter</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;