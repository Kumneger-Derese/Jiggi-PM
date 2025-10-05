import { User } from '../models/index.js'
import ApiError from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import { generateToken } from '../utils/generateToken.js'

const getUserProfile = asyncHandler(async (req, res, next) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    })
  } else {
    return next(new ApiError('User not found', 404))
  }
})

// @desc    Register user & get token
// @route   POST /api/users/register`
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body

  const isRegistered = await User.findOne({ where: { email } })

  if (isRegistered) {
    return next(new ApiError('User already registered.', 400))
  }

  const user = await User.create({ username, email, password })

  if (user) {
    const token = generateToken(user.id)

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    })
  } else {
    return next(new ApiError('Invalid user data.', 400))
  }
})

// @desc    Login user & get token
// @route   POST /api/users/auth
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return next(new ApiError('User not found please register.', 404))
  }

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user.id)
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    })
  } else {
    return next(new ApiError('Invalid email or password.', 401))
  }
})

// @desc    Update user profile & get token
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    const token = generateToken(updatedUser.id)

    res.status(200).json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      token
    })
  } else {
    return next(new ApiError('User to update not found', 404))
  }
})

export { registerUser, getUserProfile, loginUser, updateUserProfile }
