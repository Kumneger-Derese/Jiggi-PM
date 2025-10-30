import { Op } from 'sequelize'
import asyncHandler from '../utils/asyncHandler.js'
import { Card, List, Project, ProjectMember, User } from '../models/index.js'
import ApiError from '../utils/apiError.js'
import { io } from '../socket.js'

//Todo: get all models data in number and users members
const getDashboardData = asyncHandler(async (req, res, next) => {
  const userId = req.user.id

  //projects
  const projects = await Project.findAll({
    attributes: ['id'],
    where: { ownerId: userId }
  })

  if (!projects) return []

  const projectCount = projects.length
  const projectsIds = projects.map(project => project?.id)

  // lists
  const lists = await List.findAll({
    attributes: ['id'],
    where: {
      projectId: {
        [Op.in]: projectsIds
      }
    }
  })
  const listIds = lists.map(list => list?.id)
  const listCount = lists.length

  //cards
  const cards = await Card.findAll({
    attributes: ['id'],
    where: {
      listId: {
        [Op.in]: listIds
      }
    }
  })
  const cardCount = cards.length

  const completedCardCount = await Card.count({
    where: {
      listId: {
        [Op.in]: listIds
      },
      isCompleted: true
    }
  })

  //invited To
  const invitedCount = await ProjectMember.count({
    where: { userId }
  })

  // members
  const members = await ProjectMember.findAll({
    where: {
      projectId: {
        [Op.in]: projectsIds
      }
    },
    include: [
      { model: User, as: 'user', attributes: ['id', 'username', 'email'] },
      { model: Project, as: 'project', attributes: ['id', 'name'] }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status']
    }
  })

  //filter unique user
  const uniqueMembers = members?.reduce((uniqueMember, member) => {
    const exists = uniqueMember.find(
      m => m?.user?.username === member?.user?.username
    )

    if (!exists) {
      uniqueMember.push(member)
    }

    return uniqueMember
  }, [])

  //response
  res.status(200).json({
    counts: {
      projectCount,
      listCount,
      cardCount,
      invitedCount,
      completedCardCount
    },
    members: members,
    memberCount: uniqueMembers.length
  })
})

//Todo: change role of team member for specific project
const changeRole = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { memberId, projectId, role } = req.body

  const project = await Project.findByPk(projectId)

  if (!project) return next(new ApiError('Project not found or your', 404))
  if (project.ownerId !== userId)
    return next(new ApiError('You are not allowed to change role.', 401))

  const member = await ProjectMember.findOne({
    where: {
      id: memberId,
      projectId
    }
  })

  if (!member)
    return next(new ApiError('You are not member of this project.', 401))

  // change role
  member.role = role
  await member.save()

  if (io) io.to(`Invited`).emit('syncInvitedProjectList', projectId)

  res.status(200).json({ message: 'Role changed.', member })
})

//Todo: remove the user from team or project
const removeTeamMember = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { memberId, projectId } = req.params

  const project = await Project.findByPk(projectId)

  if (!project) return next(new ApiError('Project not found', 404))
  if (project.ownerId !== userId)
    return next(new ApiError('You are not allowed to remove user.', 401))

  await ProjectMember.destroy({
    where: {
      id: memberId,
      projectId
    }
  })

  res
    .status(200)
    .json({ message: `Team member removed from project ${project.name}.` })
})

export { getDashboardData, removeTeamMember, changeRole }
