import Joi from 'joi'

const createProjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'project name must be string.',
        'string.empty': 'project name cannot be empty',
    }),
    description: Joi.string().required().messages({
        'string.base': 'project description must be string.',
        'string.empty': 'project description cannot be empty',
    })
})

const updateProjectSchema = Joi.object({
    name: Joi.string().optional().allow('').messages({
        'string.base': 'project name must be string.',
    }),
    description: Joi.string().optional().allow('').messages({
        'string.base': 'project description must be string.',
    })
})

export {createProjectSchema, updateProjectSchema}
