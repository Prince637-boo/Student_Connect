const { Op } = require('sequelize');
const Message = require('../models/Message');

exports.getConversation = async (req, res) => {
    try {
        const myId = req.auth.userId;
        const otherId = req.params.otherId;

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: myId, receiverId: otherId },
                    { senderId: otherId, receiverId: myId }
                ]
            },
            order: [['createdAt', 'ASC']] // Pour avoir les plus vieux en haut et les nouveaux en bas
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la discussion." });
    }
};


exports.sendMessage = async (req, res) => {
    try {
        const { content, receiverId } = req.body;
        const senderId = req.auth.userId; // Récupéré via le middleware d'auth

        const newMessage = await Message.create({
            content,
            senderId,
            receiverId
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: "Impossible d'envoyer le message" });
    }
};