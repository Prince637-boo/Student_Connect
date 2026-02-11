const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/webm': 'webm'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const fileFilter = (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
        callback(null, true);
    } else {
        callback(new Error('Format de fichier non supporté !'), false);
    }
};

module.exports = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB (pour les vidéos)
    fileFilter: fileFilter
}).single('file');
