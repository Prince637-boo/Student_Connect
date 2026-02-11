import React from 'react';
import { Play, Code, Palette, BarChart, Lightbulb, LineChart, Cpu, Globe } from 'lucide-react';

const ProjectMedia = ({ imageUrl, youtubeLink, category }) => {
    // Extraire l'ID de la vidéo YouTube
    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYoutubeId(youtubeLink);

    // Images par défaut basées sur la catégorie
    const defaultMediaMap = {
        'Développement': {
            bg: 'bg-gradient-to-br from-blue-600 to-indigo-900',
            icon: Code,
            label: 'Software Engineering'
        },
        'Design': {
            bg: 'bg-gradient-to-br from-pink-500 to-rose-700',
            icon: Palette,
            label: 'Visual & UI Design'
        },
        'Marketing': {
            bg: 'bg-gradient-to-br from-orange-400 to-red-600',
            icon: BarChart,
            label: 'Marketing Strategy'
        },
        'Business': {
            bg: 'bg-gradient-to-br from-emerald-500 to-teal-800',
            icon: LineChart,
            label: 'Business Planning'
        },
        'Finance': {
            bg: 'bg-gradient-to-br from-amber-400 to-yellow-700',
            icon: Lightbulb,
            label: 'Financial Analysis'
        },
        'Innovation': {
            bg: 'bg-gradient-to-br from-purple-500 to-violet-800',
            icon: Cpu,
            label: 'Future Tech'
        },
        'Autre': {
            bg: 'bg-gradient-to-br from-gray-600 to-gray-900',
            icon: Globe,
            label: 'Miscellaneous'
        }
    };

    const defaultStyles = defaultMediaMap[category] || defaultMediaMap['Autre'];
    const DefaultIcon = defaultStyles.icon;

    if (videoId) {
        return (
            <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        );
    }

    if (imageUrl) {
        return (
            <div className="relative aspect-video w-full overflow-hidden bg-gray-900 group/media">
                <img
                    src={imageUrl}
                    alt="Project Media"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700"
                />
            </div>
        );
    }

    return (
        <div className={`relative aspect-video w-full flex flex-col items-center justify-center p-8 overflow-hidden group/media ${defaultStyles.bg}`}>
            {/* Texture de fond subtile */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-30"></div>
                <div className="grid grid-cols-6 grid-rows-4 w-full h-full opacity-10">
                    {[...Array(24)].map((_, i) => <div key={i} className="border-[0.5px] border-white/20"></div>)}
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 text-white/90">
                <div className="w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover/media:scale-110 group-hover/media:rotate-3">
                    <DefaultIcon size={40} className="text-white drop-shadow-lg" />
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Concept</p>
                    <h4 className="text-xl font-black tracking-tight">{defaultStyles.label}</h4>
                </div>
            </div>

            {/* Badge Catégorie flottant */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/20 backdrop-blur-md rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                STUDENT CONNECT
            </div>
        </div>
    );
};

export default ProjectMedia;
