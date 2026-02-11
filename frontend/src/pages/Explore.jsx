import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../services/projectService';
import { Search, Filter, Loader2 } from 'lucide-react';

const Explore = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const categories = ['Tous', 'Design', 'Développement', 'Marketing', 'Business', 'Finance','Innovation', 'Autre'];

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        const results = projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredProjects(results);
    }, [searchTerm, selectedCategory, projects]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await getAllProjects();
            setProjects(data);
            setFilteredProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">

                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-black mb-2">Explorer la <span className="text-[#D4AF37]">Galerie</span></h2>
                        <p className="text-gray-500">Recherchez l'inspiration parmi les meilleurs projets étudiants.</p>
                    </div>

                    {/* Barre de Recherche et Filtres */}
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-12 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher un projet, une technologie..."
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#D4AF37]/20 outline-none"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedCategory === cat
                                            ? 'bg-black text-[#D4AF37] shadow-lg shadow-black/10'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Résultats */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 size={40} className="text-[#D4AF37] animate-spin mb-4" />
                            <p className="text-gray-400 font-medium">Analyse de la galerie...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-100">
                                    <p className="text-gray-400 font-bold">Aucun résultat pour cette recherche.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Explore;
