backend/
├── routes/
│   ├── auth.routes.js      (Login, Register, Google Auth)
│   ├── user.routes.js      (Profils, Compétences)
│   ├── project.routes.js   (Créer, Chercher, Postuler)
│   ├── offer.routes.js     (Stages, Alternances, Recos)
│   ├── contact.routes.js   (Messages entre étudiants)
│   └── admin.routes.js     (Modération)
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── project.controller.js
│   ├── offer.controller.js
│   ├── contact.controller.js
│   └── admin.controller.js
├── middlewares/            (Pour vérifier le JWT / la connexion)
|   ├── auth.middleware.js
├── models/                 (Définition des schémas PostgreSQL - Sequelize/Prisma)
├── services/               (IA Python, Envoi emails)
├── .env                    (Variables secrètes)
├── .gitignore              (Fichiers à ignorer)
├── server.js               (Chef d'orchestre)
└── Dockerfile              (Recette pour lancer l'app)