const Joi = require('joi');

const validateRegister = (req, res, next) => {
    const schema = Joi.object({
        nom: Joi.string().min(2).max(50).required(),
        prenom: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        sexe: Joi.string().valid('M', 'F', 'Autre').required(),
        ecole: Joi.string().min(2).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validateRegister, validateLogin };
