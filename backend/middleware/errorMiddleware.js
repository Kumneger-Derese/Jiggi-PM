import ApiError from "../utils/apiError.js";

const notFound = async (req, res, next) => {
    const error = `Route -${req.originalUrl}- not found`;
    next(new ApiError(error, 404))
}

const errorConvertor = (err, req, res, next) => {
    let error = err

    if (!(error instanceof ApiError)) {
        const statusCode = err.statusCode ? 400 : 500
        const message = err.message ||
            (statusCode === 400 && 'Bad Request') ||
            (statusCode === 500 && 'Internal Server Error')

        error = new ApiError(message, statusCode, false, err.stack)
    }

    next(error)
}

const errorHandler = (err, req, res, next) => {
    let {message,statusCode,stack,isOperational } = err

// Do not leak info in production
    if (process.env.NODE_ENV === 'production' && !isOperational) {
        statusCode = 500
        message = 'Internal Server Error'
    }

    const errorResponse = {
        error:true,
        code: statusCode,
        message,
        stack:process.env.NODE_ENV === 'development' ? stack : null
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(errorResponse)
    }

    res.status(statusCode).json(errorResponse)
}

export {notFound, errorHandler, errorConvertor}
