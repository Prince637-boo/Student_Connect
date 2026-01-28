const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const projectCtrl = require('../controllers/project.controller');

// Voir tous les projets (Public)
router.get('/', projectCtrl.getAllProjects);

// Créer un projet (Privé)
router.post('/', auth, projectCtrl.createProject);

// Modifier un projet 
router.put('/:id', auth, projectCtrl.updateProject);

// Supprimer un projet
router.delete('/:id', auth, projectCtrl.deleteProject);

module.exports = router;