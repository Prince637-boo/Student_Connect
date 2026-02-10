import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';
import { getAllProjects } from '../services/projectService';
import { Loader2, Plus } from 'lucide-react';
import { useUI } from '../context/UIContext';

const Home = () => {
  const { openPublishModal } = useUI();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err.error || "Impossible de charger les projets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">

          {/* Header de la page */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-black">
                Flux <span className="text-[#D4AF37]">Projets</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Découvrez les dernières réalisations de la communauté.</p>
            </div>

            <div className="flex gap-2">
              <button className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-black transition-all">
                Filtrer
              </button>
            </div>
          </div>

          {/* États de chargement et erreurs */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="text-[#D4AF37] animate-spin mb-4" />
              <p className="text-gray-400 font-medium animate-pulse">Chargement de l'inspiration...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-center">
              <p className="text-red-500 font-bold mb-2">Oups !</p>
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-bold"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Liste des projets */}
          {!loading && !error && (
            <div className="grid grid-cols-1 gap-4">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-[2rem]">
                  <p className="text-gray-400 font-medium">Aucun projet pour le moment. Soyez le premier !</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Bouton d'action flottant (Mobile/Quick actions) */}
      <button
        onClick={openPublishModal}
        className="fixed bottom-8 right-8 w-14 h-14 bg-black text-[#D4AF37] rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default Home;