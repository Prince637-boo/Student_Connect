import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, CircleUser } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', ecole: '', sexe: '' });
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Données envoyées au backend :", formData);
    };

    return (
        <AuthLayout title="Inscription">
            <form onSubmit={handleRegister}>
                <AuthInput
                    label="Nom complet"
                    icon={User}
                    placeholder="Votre nom"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <AuthInput
                    label="Email étudiant"
                    icon={Mail}
                    placeholder="votre.nom@ecole.fr"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />


                <AuthInput
                    label="Mot de passe"
                    icon={Lock}
                    type="password"
                    placeholder="********"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <AuthInput
                    label="Ecole"
                    icon={GraduationCap}
                    placeholder="Votre ecole"
                    onChange={(e) => setFormData({ ...formData, ecole: e.target.value })}
                />

                <AuthInput
                    label="sexe"
                    icon={CircleUser}
                    type="text"
                    placeholder="M ou F"
                    onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                />



                <button className="w-full mt-2 py-3.5 rounded-xl font-bold text-black 
                           bg-gradient-to-br from-[#f3cf7a] via-[#D4AF37] to-[#aa8a1e] 
                           shadow-[0_10px_30px_rgba(212,175,55,0.2)] 
                           hover:brightness-110 transition-all">
                    CRÉER MON COMPTE
                </button>

                <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest">
                    Déjà membre ? <Link to="/login" className="text-[#D4AF37] font-bold hover:underline">Se connecter</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;