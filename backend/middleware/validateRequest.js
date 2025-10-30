import ApiError from '../utils/apiError.js'

const validateRequest =
    (schema, property = 'body') =>
        (req, res, next) => {
            const {error} = schema.validate(req[property])

            const errors = error?.details?.map(detail => detail.message)

            if (errors) return next(new ApiError(errors, 400))

            next()
        }

export {validateRequest}
