# Student Connect - Frontend

Bienvenue sur le frontend de **Student Connect**, la plateforme d'entraide où les compétences réelles des étudiants prennent de la valeur.

## 🚀 Stack Technique

- **Framework** : React (Vite)
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Gestion des routes** : React Router DOM
- **Appels API** : Axios

## 📂 Architecture du Projet

L'architecture est organisée de manière modulaire pour faciliter la maintenance et l'évolution du projet :

```text
src/
├── assets/         # Images, logos et ressources statiques
├── components/     # Composants UI réutilisables (Boutons, Inputs, etc.)
├── hooks/          # Hooks React personnalisés
├── layouts/        # Structures de page (Layout d'authentification, etc.)
├── pages/          # Composants de page complets (Login, Register, Home)
├── services/       # Logique de communication avec le backend (API)
├── App.jsx         # Composant racine et configuration des routes
├── index.css       # Styles globaux et configuration Tailwind
└── main.jsx        # Point d'entrée de l'application
```

## 🛠️ Installation et Lancement

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

3. **Accéder à l'application** :
   Ouvrez votre navigateur sur `http://localhost:5173`.

## 🔗 Communication avec le Backend

Le frontend communique avec le backend via une instance Axios configurée dans `src/services/api.js`. Un intercepteur est utilisé pour ajouter automatiquement le token JWT présent dans le `localStorage` à chaque requête authentifiée.
