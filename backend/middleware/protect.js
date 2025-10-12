import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import ApiError from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers?.authorization.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findByPk(decoded.userId)
      next()
    } catch (e) {
      return next(new ApiError('Authorization token invalid', 401))
    }
  } else {
    return next(new ApiError('No Authorization token', 401))
  }
})

export { protect }
