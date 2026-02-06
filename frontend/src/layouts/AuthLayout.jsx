import React from 'react';
import bgImage from '../assets/Gemini_Generated_Image_o3tgnwo3tgnwo3tg.png';

const AuthLayout = ({ children, title }) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-auto py-6 px-4">
            {/* 1. IMAGE DE BACKGROUND AVEC OVERLAY */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Voile sombre léger pour la lisibilité */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* 2. TEXTURE PAPIER (Overlay discret) */}
            <div className="fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
            </div>

            {/* 3. CONTENU PRINCIPAL */}
            <div className="relative z-10 w-full max-w-[440px] flex flex-col items-center">
                {/* Header / Logo */}
                <div className="flex items-center gap-4 mb-8 w-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#f3cf7a] via-[#D4AF37] to-[#aa8a1e] rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 rotate-3">
                        <span className="text-black font-black text-xl italic -rotate-3">E</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[#D4AF37]/90 text-[11px] uppercase tracking-[0.4em] font-bold">
                            Elevate Connect
                        </h1>
                        <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-medium">
                            Plateforme d'Entraide Étudiante
                        </span>
                    </div>
                </div>

                {/* CARTE GLASSMORPHISM */}
                <div className="w-full relative">
                    <div className="bg-[#1a1c23]/40 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 overflow-hidden
                                  shadow-[0_40px_100px_rgba(0,0,0,0.6)]
                                  border border-white/10 relative">

                        {/* EFFETS DE LUMIÈRE INTERNES (Discrets) */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
                                {title}
                            </h2>
                            {children}
                        </div>
                    </div>

                    {/* DÉCORATION EXTÉRIEURE (Discrète) */}
                    <div className="absolute -z-10 -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-[50px] rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;