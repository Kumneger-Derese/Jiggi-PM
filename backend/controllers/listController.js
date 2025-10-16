import {List, Project} from '../models/index.js'
import ApiError from '../utils/apiError.js'
import asyncHandler from '../utils/asyncHandler.js'
import {io} from "../socket.js";

//get list
const getList = asyncHandler(async (req, res, next) => {
    const {listId} = req.params

    const list = await List.findByPk(listId)

    if (list) {
        res.status(200).json(list)
    } else {
        return next(new ApiError('List not found.', 404))
    }
})

//get all list
const getLists = asyncHandler(async (req, res, next) => {
    const {projectId} = req.params

    const lists = await List.findAll({
        where: {projectId},
        include: [{
            model: Project,
            as: 'project'
        }],
        order: [['position', 'ASC']]
    });

    if (!lists) return next(new ApiError('Lists not found.', 404))
    res.status(200).json(lists)
})

//create list inside project
const createList = asyncHandler(async (req, res, next) => {
    const {title} = req.body
    const {projectId} = req.params

    const project = await Project.findByPk(projectId)

    if (!project) {
        return next(new ApiError('Project to create list on is not found.', 404))
    }

    const lastList = await List.findOne({
        where: {projectId},
        order: [['position', 'DESC']]
    })

    const position = lastList ? lastList.position + 1000 : 1000

    const list = await List.create({title, position, projectId})

    if (!list) return next(new ApiError('List not created.', 400))

    const listId = list.id
    if (io) io.to(projectId).emit('syncList', {projectId, listId})
    res.status(201).json(list)
})

//update list
const updateList = asyncHandler(async (req, res, next) => {
    const {listId} = req.params
    const {title} = req.body

    const list = await List.findByPk(listId)

    if (list) {
        list.title = title

        const updatedList = await list.save()

        const projectId = updatedList.projectId
        if (io) io.to(projectId).emit('syncList', {projectId, listId})
        res.status(200).json(updatedList)
    } else {
        return next(new ApiError('List not found.', 404))
    }
})

//delete list
const deleteList = asyncHandler(async (req, res, next) => {
    const {listId} = req.params

    const list = await List.findByPk(listId)

    if (list) {
        await List.destroy({where: {id: listId}})

        if (io) io.to(list.projectId).emit('syncList', {projectId: list.projectId, listId})
        res.status(200).json({message: 'List deleted successfully', projectId: list.projectId})
    } else {
        return next(new ApiError('List to delete not found.', 404))
    }
})

//reorder list
const reorderList = asyncHandler(async (req, res, next) => {
    const {projectId} = req.params
    const {activeListId, overListId} = req.body

    if (!activeListId || !overListId) {
        return next(new ApiError('Both activeListId and overListId is required.', 400))
    }

    const [activeList, overList] = await Promise.all([
        List.findByPk(activeListId),
        List.findByPk(overListId)
    ])

    if (!activeList || !overList) {
        return next(new ApiError('One or both lists not found.', 404))
    }

    // Fetch all lists in the project
    const lists = await List.findAll({
        where: {projectId},
        order: [['position', 'ASC']],
        attributes: ['id', 'position']
    })

    //remove activeItem and insert at overIndex
    const activeIndex = lists.findIndex(list => list.id === activeListId)
    const overIndex = lists.findIndex(list => list.id === overListId)

    lists.splice(activeIndex, 1)
    lists.splice(overIndex, 0, activeList)

    //find neighbours around activeList after reordering
    const prevList = lists[overIndex - 1] || null
    const nextList = lists[overIndex + 1] || null

    let newPosition;

    if (!prevList) {
        // activeList is at start
        newPosition = nextList.position / 2
    } else if (!nextList) {
        //activeList is at the end
        newPosition = prevList.position + 1
    } else {
        //active item is between prevList and nextList
        newPosition = (prevList.position + nextList.position) / 2
    }

    //update only the moved list
    activeList.position = newPosition
    await activeList.save()

    if (io) io.to(projectId).emit('syncList', {projectId, listId: activeList.id})

    res.status(200).json({message: 'List reordered.'})
})

export {getList, getLists, createList, updateList, deleteList, reorderList}