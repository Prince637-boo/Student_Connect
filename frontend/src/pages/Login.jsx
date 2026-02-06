import React, { useState } from 'react'; // Ajout de useState
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';

const Login = () => {
    // 1. Définition des états pour récupérer les saisies
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 2. Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setLoading(true);

        try {
            const data = await login(email, password);
            console.log("Succès :", data);

            // Si la connexion réussit, on redirige vers le tableau de bord
            navigate('/dashboard');
        } catch (err) {
            alert(err.message || "Identifiants incorrects");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Connexion">
            <form onSubmit={handleSubmit}> {/* 3. Liaison de la fonction au formulaire */}
                <AuthInput
                    label="Adresse e-mail"
                    icon={Mail}
                    placeholder="Votre email étudiant"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état
                    required
                />

                <AuthInput
                    label="Mot de passe"
                    icon={Lock}
                    placeholder="Votre mot de passe"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
                    required
                />

                <div className="text-right mb-6">
                    <a href="#" className="text-[#D4AF37]/80 text-[10px] hover:text-[#D4AF37] transition-colors">
                        Mot de passe oublié ?
                    </a>
                </div>

                <button
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-b from-[#f3cf7a] via-[#D4AF37] to-[#aa8a1e] shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                    {loading ? "Connexion..." : "Se Connecter"}
                </button>

                {/* --- Reste du design (Séparateur et boutons sociaux) --- */}
                <div className="relative flex items-center justify-center my-6">
                    <div className="w-full border-t border-white/5"></div>
                    <span className="absolute bg-[#1a1c23]/60 backdrop-blur-md px-4 text-[10px] text-gray-500 uppercase tracking-widest">ou</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <button type="button" className="flex items-center justify-center gap-2 py-3 bg-[#1a1c23] border border-white/5 rounded-xl text-xs text-white hover:bg-white/5 transition-colors">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" /> Google
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 py-3 bg-[#1a1c23] border border-white/5 rounded-xl text-xs text-white hover:bg-white/5 transition-colors">
                        <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="w-4 h-4" alt="LinkedIn" /> LinkedIn
                    </button>
                </div>

                <p className="text-center text-[10px] text-gray-500">
                    Vous n'avez pas encore de compte ? <Link to="/register" className="text-[#D4AF37] font-bold hover:underline ml-1">Inscrivez-vous</Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;