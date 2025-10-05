import express from 'express'
import {protect} from "../middleware/protect.js";
import {
    createCard,
    deleteCard,
    getCard,
    getCards,
    moveCard,
    reorderCard,
    updateCard
} from "../controllers/cardController.js";

const cardRouter = express.Router()

cardRouter.use(protect)

cardRouter.get('/:cardId', getCard)
cardRouter.get('/all/:listId', getCards)
cardRouter.put('/move', moveCard)
cardRouter.put('/reorder', reorderCard)
cardRouter.post('/create-card', createCard)
cardRouter.put('/update-card/:cardId', updateCard)
cardRouter.delete('/delete-card/:cardId', deleteCard)


export {cardRouter};