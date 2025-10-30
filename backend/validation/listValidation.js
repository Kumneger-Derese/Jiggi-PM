import Joi from 'joi'

const createListSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'list title must be string.',
        'string.empty': 'list title cannot be empty',
    }),
})

const updateListSchema = Joi.object({
    title: Joi.string().optional().allow('').messages({
        'string.base': 'list title must be string.',
    }),
})

export { createListSchema, updateListSchema }