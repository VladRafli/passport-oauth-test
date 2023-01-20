const Joi = require("joi")

const postLoginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = postLoginValidation