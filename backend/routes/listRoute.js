import express from 'express'
import { protect } from '../middleware/protect.js'
import {
  createList,
  deleteList,
  getList, getLists, reorderList,
  updateList
} from '../controllers/listController.js'
import {validateRequest} from "../middleware/validateRequest.js";
import {createListSchema, updateListSchema} from "../validation/listValidation.js";

const listRouter = express.Router()

listRouter.use(protect)

listRouter.get('/:listId', getList)
listRouter.get('/all/:projectId', getLists)
listRouter.post('/create-list/:projectId',validateRequest(createListSchema),  createList)
listRouter.put('/update-list/:listId', validateRequest(updateListSchema), updateList)
listRouter.put('/reorder-list/:projectId', reorderList)
listRouter.delete('/delete-list/:listId', deleteList)

export { listRouter }
