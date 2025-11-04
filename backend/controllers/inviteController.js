import { Op } from 'sequelize'
import ApiError from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import { Invite, Project, ProjectMember, User } from '../models/index.js'
import { generateTokenRaw } from '../utils/generateInviteToken.js'
import { sendInviteEmail } from '../utils/sendInviteEmail.js'

const INVITE_EXPIRATION_HOURS = process.env.INVITE_EXPIRATION_HOURS || 48

//Todo: the projects the user invited to
const invitedProjects = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  const projects = await ProjectMember.findAll({
    where: { userId, role: 'editor', status: 'accepted' },
    include: [
      { model: Project, as: 'project', attributes: ['name', 'description'] }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status']
    }
  })

  if (projects.length === 0) {
    return []
  }

  res.status(200).json(projects)
})

//Todo: create invitations and send via email
const sendInvitation = asyncHandler(async (req, res, next) => {
  const { email } = req.body
  const inviterId = req.user.id
  const { projectId } = req.params

  const project = await Project.findByPk(projectId)

  // check if project exists and the user is legitimate to invite
  if (!project) return next(new ApiError('Project not found', 404))
  if (project.ownerId !== inviterId) {
    return next(
      new ApiError('You cannot invite, this is not your project', 403)
    )
  }

  const invitee = await User.findOne({ where: { email } })
  if (!invitee)
    return next(new ApiError('Invitee not found or registered', 404))

  // You cannot invite yourself
  if (invitee.email === req.user.email)
    return next(new ApiError('You cannot not invite yourself', 400))

  // check if user is already a member
  const isAlreadyMember = await ProjectMember.findOne({
    where: { projectId, userId: invitee.id },
    include: [{ model: User, as: 'user', attributes: ['email'] }]
  })

  if (isAlreadyMember) {
    return next(
      new ApiError('User to invite is already member of project.', 400)
    )
  }

  // If an active invite exists for the same email & project and not expired & not accepted -> return 409
  const now = new Date()
  const existingInvite = await Invite.findOne({
    where: {
      projectId,
      email,
      acceptedAt: null,
      expiresAt: { [Op.gt]: now }
    }
  })

  if (existingInvite) {
    return next(
      new ApiError('An invitation is already pending for this email', 409)
    )
  }

  // generate and hash token and timings
  const token = generateTokenRaw()
  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * INVITE_EXPIRATION_HOURS
  )

  // create new invitations
  const invite = await Invite.create({
    email,
    token,
    projectId,
    inviterId,
    status: 'pending',
    expiresAt
  })

  // Prepare email with accept 'link'
  const acceptUrl = `${
    process.env.FRONTEND_URL
  }/accept-invitation/${encodeURIComponent(token)}`
  console.log({ acceptUrl })

  const projectTitle = project?.name
  await sendInviteEmail({
    to: email,
    subject: `Invited to join ${projectTitle || 'Project'}`,
    html: `<div style="padding: 10px; border-radius: 4px; background: black; color: white;">
                 Hello Dear new Member Join at
                 <p style="margin-top: 4px; color: white">${acceptUrl}</p>
                </div>`
  })

  res.status(201).json({ message: 'Invite sent', invite, projectId })
})

//Todo: verify invitation exist and send invitation details
const verifyInvitation = asyncHandler(async (req, res, next) => {
  const { token } = req.params

  if (!token) return next(new ApiError('Token is required.', 404))

  const invite = await Invite.findOne({
    where: { token },
    include: [
      { model: Project, attributes: ['id', 'name'] },
      { model: User, attributes: ['id', 'username', 'email'], as: 'inviter' }
    ]
  })

  if (!invite) return next(new ApiError('Invite not found', 404))
  if (invite.acceptedAt)
    return next(new ApiError('Invite already accepted', 400))
  if (invite.expiresAt < new Date())
    return next(new ApiError('Invite expired', 400))

  res.status(200).json({
    email: invite.email,
    projectId: invite.projectId,
    projectName: invite.Project?.name,
    status: invite.status,
    inviter: invite.inviter,
    expiresAt: invite.expiresAt
  })
})

//Todo: accept invitation
const acceptInvitation = asyncHandler(async (req, res, next) => {
  const { token } = req.body
  const userId = req.user.id

  if (!token) return next(new ApiError('Invitation token required', 400))

  const invite = await Invite.findOne({ where: { token } })

  if (!invite) return next(new ApiError('Invalid invite token.', 404))

  if (invite.expiresAt < new Date()) {
    invite.status = 'expired'
    await invite.save()
    return next(new ApiError('Invite expired', 410))
  }

  if (invite.acceptedAt)
    return next(new ApiError('Invite already accepted', 400))

  // if email mismatch between invite and logged-in user when accepting, reject
  const user = await User.findByPk(userId)

  if (!user) return next(new ApiError('User not found', 401))
  if (user.email !== invite.email) {
    return next(new ApiError('This invite was sent to different email', 403))
  }

  const project = await Project.findByPk(invite.projectId)
  if (!project)
    return next(new ApiError('Project to add member to is not found', 401))

  console.log('Project Id', project.id)
  console.log('User Id', invite.id)

  //Create  ProjectMember to accepted role
  const member = await ProjectMember.create({
    projectId: project.id,
    userId,
    role: 'editor',
    status: 'accepted'
  })

  if (!member) return next(new ApiError('Membership not created.', 400))

  // make invite accepted
  invite.acceptedAt = new Date()
  invite.status = 'accepted'
  await invite.save()

  // emit socket if available

  res.status(200).json({ message: 'Invite accepted', member })
})

export { sendInvitation, verifyInvitation, acceptInvitation, invitedProjects }
