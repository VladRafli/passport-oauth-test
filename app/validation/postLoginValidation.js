import Joi from "joi"

const postLoginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export default postLoginValidation