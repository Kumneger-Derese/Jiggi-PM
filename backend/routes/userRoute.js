import express from 'express'
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/protect.js'
import { validateRequest } from '../middleware/validateRequest.js'
import {loginSchema, registerSchema, updateProfileSchema} from '../validation/userValidation.js'

const userRouter = express.Router()

userRouter.post('/register', validateRequest(registerSchema), registerUser)
userRouter.post('/login',validateRequest(loginSchema), loginUser)
userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect,validateRequest(updateProfileSchema), updateUserProfile)

export { userRouter }
