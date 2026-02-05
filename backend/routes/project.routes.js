const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const multer = require('../middlewares/multer-config');
const projectCtrl = require('../controllers/project.controller');

// Voir tous les projets (Public)
router.get('/', projectCtrl.getAllProjects);

// Créer un projet (Privé)
router.post('/', auth, multer, projectCtrl.createProject);

// Modifier un projet 
router.put('/:id', auth, multer, projectCtrl.updateProject);

// Supprimer un projet
router.delete('/:id', auth, projectCtrl.deleteProject);

// Likes et Commentaires (Privé)
router.post('/:id/like', auth, projectCtrl.likeProject);
router.post('/:id/comment', auth, projectCtrl.addComment);

// Vues (Public - appelé par le frontend quand on clique sur le projet)
router.post('/:id/view', projectCtrl.trackView);

module.exports = router;