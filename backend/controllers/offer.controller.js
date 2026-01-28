// controllers/offer.controller.js
let offers = [];

exports.createOffer = (req, res) => {
    const { title, company, type, location, description, contactInfo } = req.body;

    if (!title || !company || !type) {
        return res.status(400).json({ error: "Titre, Entreprise et Type sont obligatoires !" });
    }

    const newOffer = {
        id: Date.now(),
        title,
        company,
        type,
        location,
        description,
        contactInfo,
        posterId: req.auth.userId, // Qui a partagé l'offre ?
        createdAt: new Date()
    };

    offers.push(newOffer);
    res.status(201).json({ message: "Offre partagée avec la communauté ! 💼", offer: newOffer });
};

exports.getAllOffers = (req, res) => {
    res.status(200).json(offers);
};