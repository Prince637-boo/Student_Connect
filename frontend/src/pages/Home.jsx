import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-5xl font-extrabold text-dark mb-4">
        STUDENT<span className="text-gold">CONNECT</span>
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        La plateforme d'entraide où vos compétences réelles prennent de la valeur.
      </p>
      <div className="flex gap-4">
        <button className="bg-dark text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
          Explorer les projets
        </button>
        <button className="border-2 border-gold text-gold px-6 py-2 rounded-lg hover:bg-gold hover:text-white transition">
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Home;