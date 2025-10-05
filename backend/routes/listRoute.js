import express from 'express'
import { protect } from '../middleware/protect.js'
import {
  createList,
  deleteList,
  getList, getLists, reorderList,
  updateList
} from '../controllers/listController.js'

const listRouter = express.Router()

listRouter.use(protect)

listRouter.get('/:listId', getList)
listRouter.get('/all/:projectId', getLists)
listRouter.post('/create-list/:projectId', createList)
listRouter.put('/update-list/:listId', updateList)
listRouter.put('/reorder-list/:projectId', reorderList)
listRouter.delete('/delete-list/:listId', deleteList)

export { listRouter }
