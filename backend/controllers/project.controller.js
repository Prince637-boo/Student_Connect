// controllers/project.controller.js

let projects = []; // Notre base temporaire

// Créer un nouveau projet
exports.createProject = (req, res) => {
    const { title, description, techStack } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Le titre et la description sont requis !" });
    }

    const newProject = {
        id: Date.now(),
        title,
        description,
        techStack: techStack || [],
        ownerId: req.auth.userId, // On récupère l'ID grâce au middleware !
        createdAt: new Date()
    };

    projects.push(newProject);
    res.status(201).json({ message: "Projet publié ! ", project: newProject });
};

// Récupérer tous les projets
exports.getAllProjects = (req, res) => {
    res.status(200).json(projects);
};

// Modifier un projet
exports.updateProject = (req, res) => {
    const { id } = req.params; // On récupère l'ID du projet dans l'URL
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) return res.status(404).json({ error: "Projet introuvable" });

    // LA VÉRIFICATION CRUCIALE 
    if (project.ownerId !== req.auth.userId) {
        return res.status(403).json({ error: "Action non autorisée ! Ce n'est pas ton projet." });
    }

    // Mise à jour des données
    const { title, description, techStack } = req.body;
    project.title = title || project.title;
    project.description = description || project.description;
    project.techStack = techStack || project.techStack;

    res.status(200).json({ message: "Projet mis à jour !", project });
};

// Supprimer un projet
exports.deleteProject = (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id === parseInt(id));

    if (projectIndex === -1) return res.status(404).json({ error: "Projet introuvable" });

    // MÊME VÉRIFICATION 
    if (projects[projectIndex].ownerId !== req.auth.userId) {
        return res.status(403).json({ error: "Tu ne peux pas supprimer ce projet !" });
    }

    projects.splice(projectIndex, 1);
    res.status(200).json({ message: "Projet supprimé avec succès." });
};