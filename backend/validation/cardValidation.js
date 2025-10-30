import Joi from 'joi'

const createCardSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'card title must be string.',
        'string.empty': 'card title cannot be empty',
    }),
    description: Joi.string().required().messages({
        'string.base': 'card description must be string.',
        'string.empty': 'card description cannot be empty',
    })
}).unknown()

const updateCardSchema = Joi.object({
    title: Joi.string().allow('').optional().messages({
        'string.base': 'card title must be string.',
    }),
    description: Joi.string().allow('').optional().messages({
        'string.base': 'card description must be string.',
    })
}).unknown()

export {createCardSchema, updateCardSchema}
