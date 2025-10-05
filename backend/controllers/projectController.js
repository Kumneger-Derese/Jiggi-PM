import asyncHandler from '../utils/asyncHandler.js'
import {Project, User, List} from '../models/index.js'
import ApiError from '../utils/apiError.js'

//create a project
const createProject = asyncHandler(async (req, res, next) => {
    const ownerId = req.user.id
    const project = await Project.create({...req.body, ownerId})

    res.status(201).json(project)
})

// get all projects
const getProjects = asyncHandler(async (req, res, next) => {
    const ownerId = req.user.id
    const projects = await Project.findAll({
        where: {
            ownerId
        },
        order:[['updatedAt', 'DESC']],
        include: [
            {
                model: User,
                as: 'owner',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            }
        ]
    })

    res.status(200).json(projects)
})

//get one project
const getProject = asyncHandler(async (req, res, next) => {
    const id = req.params.projectId
    const ownerId = req.user.id

    const project = await Project.findOne({
        where: {id, ownerId},
        order: [[List, 'position', 'ASC']],
        include: [
            {
                model: User,
                as: 'owner',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            {
                model: List,
                as: 'lists',
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
        ],
    })

    if (!project) {
        return next(new ApiError('Project not found', 404))
    }

    res.status(200).json(project)
})

//update one project
const updateProject = asyncHandler(async (req, res, next) => {
    const id = req.params.projectId
    const ownerId = req.user.id
    const {name, description} = req.body

    const project = await Project.findOne({
        where: {id, ownerId}
    })

    if (project) {
        //update project and save
        project.name = name
        project.description = description

        const updatedProject = await project.save()
        res.status(200).json(updatedProject)
    } else {
        return next(new ApiError('Project to update is not found', 404))
    }
})

// delete one project
const deleteProject = asyncHandler(async (req, res, next) => {
    const id = req.params.projectId
    const ownerId = req.user.id

    const project = await Project.findOne({
        where: {id, ownerId}
    })

    if (!project) {
        return next(new ApiError('Project to delete is not found', 404))
    }

    const deletedProject = await Project.destroy({
        where: {id, ownerId}
    })

    if (deletedProject) {
        res.status(200).json({message: 'Project deleted successfully'})
    }
})

export {createProject, getProjects, getProject, deleteProject, updateProject}
