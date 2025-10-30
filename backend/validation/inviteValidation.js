import Joi from 'joi'

const sendInviteSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'email must be a valid email',
        'string.base': 'email must be string.',
        'string.empty': 'email cannot be empty'
    }),
})

export {sendInviteSchema}