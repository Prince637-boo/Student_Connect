const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const offerCtrl = require('../controllers/offer.controller');

router.get('/', offerCtrl.getAllOffers);
router.post('/', auth, offerCtrl.createOffer);

module.exports = router;