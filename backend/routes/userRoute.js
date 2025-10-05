import express from 'express'
import {getUserProfile, loginUser, registerUser, updateUserProfile} from '../controllers/userController.js'
import {protect} from "../middleware/protect.js";

const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export { userRouter }
