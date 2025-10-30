import Joi from 'joi'

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).required().messages({
    'string.base': 'username must be string.',
    'string.empty': 'username cannot be empty',
    'string.min': 'username must be at least 3 character.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'email must be a valid email',
    'string.base': 'email must be string.',
    'string.empty': 'email cannot be empty'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password must be string.',
    'string.empty': 'password cannot be empty',
    'string.min': 'password must be at least 6 character.'
  })
})

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'email must be a valid email',
    'string.base': 'email must be string.',
    'string.empty': 'email cannot be empty'
  }),
  password: Joi.string().min(6).required().messages({
    'string.base': 'password must be string.',
    'string.empty': 'password cannot be empty',
    'string.min': 'password must be at least 6 character.'
  })
})

const updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().allow('').min(3).optional().messages({
    'string.base': 'username must be string.',
    'string.min': 'username must be at least 3 character.'
  }),
  email: Joi.string().email().optional().allow('').messages({
    'string.email': 'email must be a valid email',
    'string.base': 'email must be string.',
  }),
  password: Joi.string().min(6).optional().allow('').messages({
    'string.base': 'password must be string.',
    'string.min': 'password must be at least 6 character.'
  })
})

export { registerSchema,loginSchema,updateProfileSchema }
