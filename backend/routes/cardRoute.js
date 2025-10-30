import express from 'express'
import {protect} from "../middleware/protect.js";
import {
    completeCard,
    createCard,
    deleteCard,
    getCard,
    getCards,
    moveCard,
    reorderCard,
    updateCard
} from "../controllers/cardController.js";
import {validateRequest} from "../middleware/validateRequest.js";
import {createCardSchema, updateCardSchema} from "../validation/cardValidation.js";

const cardRouter = express.Router()

cardRouter.use(protect)

cardRouter.get('/:cardId', getCard)
cardRouter.get('/all/:listId', getCards)
cardRouter.put('/move', moveCard)
cardRouter.put('/reorder', reorderCard)
cardRouter.post('/create-card', validateRequest(createCardSchema), createCard)
cardRouter.put('/complete', completeCard)
cardRouter.put('/update-card/:cardId', validateRequest(updateCardSchema), updateCard)
cardRouter.delete('/delete-card/:cardId', deleteCard)


export {cardRouter};