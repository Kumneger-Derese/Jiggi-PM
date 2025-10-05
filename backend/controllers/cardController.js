import {Card, List} from '../models/index.js';
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import sequelize from "../config/sequelize.js";

//get specific card
const getCard = asyncHandler(async (req, res, next) => {
    const {cardId} = req.params;

    const card = await Card.findByPk(cardId);

    if (!card) return next(new ApiError('Card not found', 404));

    res.status(200).json(card)
})

// get all cards
const getCards = asyncHandler(async (req, res, next) => {
    const {listId} = req.params;

    const cards = await Card.findAll({
        where: {listId},
        order: [['position', 'ASC']],
    });

    if (!cards) return next(new ApiError('Cards not found', 404));

    res.status(200).json(cards)
})

//reorder card
const reorderCard = asyncHandler(async (req, res, next) => {
    const {activeCardId, overCardId, listId} = req.body;

    if (!activeCardId || !overCardId) {
        return next('activeCardId and overCardId is required');
    }

    const activeCard = await Card.findByPk(activeCardId);
    const overCard = await Card.findByPk(overCardId);

    if (!overCard || !activeCard) {
        return next(new ApiError('Over or Active card not found', 404));
    }

    //get all cards for this lists
    const cards = await Card.findAll({
        where: {listId},
        order: [['position', 'ASC']],
    })

    const activeCardIndex = cards.findIndex(card => card.id === activeCardId);
    const overCardIndex = cards.findIndex(card => card.id === overCardId);

    //remove activeCard and place it on overCardIndex
    cards.splice(activeCardIndex, 1)
    cards.splice(overCardIndex, 0, activeCard)

    //find neighbours around activeCard after reordering
    const prevCard = cards[overCardIndex - 1] || null
    const nextCard = cards[overCardIndex + 1] || null

    let newPosition;

    if (!prevCard) {
        //if activeCard is the first
        newPosition = nextCard.position / 2;
    } else if (!nextCard) {
        //if activeCard is the last
        newPosition = prevCard.position + 1;
    } else {
        // if activeCard is in between
        newPosition = (prevCard.position + nextCard.position) / 2;
    }

    activeCard.position = newPosition;
    await activeCard.save()

    res.status(200).json({message: 'Card reordered.'})
})

//move card between list
const moveCard = asyncHandler(async (req, res, next) => {
    const {activeId, overId, newListId} = req.body;

    console.log({activeId, overId, newListId})

    if (!activeId || !newListId) return next(new ApiError('activeId and newListId required', 400));

    const activeCard = await Card.findByPk(activeId);
    if (!activeCard) return next(new ApiError('Card not found', 404));

    const cards = await Card.findAll({
        where: {listId: newListId},
        order: [['position', 'ASC']],
    })

    let newPosition;

    if (cards.length === 0) {
        //if lists is empty - start at 1000
        newPosition = 1000
    } else if (!overId) {
        //if dropped at end of all card
        newPosition = cards[cards.length - 1].position + 1000
    } else {
        const overIndex = cards.findIndex(card => card.id === overId);
        if (overIndex === -1) return next(new ApiError('Invalid overId for this list', 400));

        const prevCard = cards[overIndex - 1] || null
        const nextCard = cards[overIndex] || null; // the item we are dropping on is the 'next' item

        if (!prevCard) {
            //if dropped at first
            newPosition = nextCard.position / 2;
        } else if (!nextCard) {
            // if dropped at end
            newPosition = prevCard.position + 1000;
        } else {
            newPosition = (prevCard.position + nextCard.position) / 2;
        }
    }

    // save inside transaction
    await sequelize.transaction(async (transaction) => {
        activeCard.listId = newListId;
        activeCard.position = newPosition;
        await activeCard.save({transaction});
    })

    res.status(200).json({message: 'Card moved.'})
})

//create card
const createCard = asyncHandler(async (req, res, next) => {
    const {title, description, listId} = req.body;

    const lastCard = await Card.findOne({
        where: {listId},
        order: [['position', 'DESC']],
    })
    const position = lastCard ? lastCard.position + 1000 : 1000;

    const card = await Card.create({title, description, position, listId});

    if (!card) return next(new ApiError('Card not created', 400));

    res.status(200).json(card)
})

//update card
const updateCard = asyncHandler(async (req, res, next) => {
    const {cardId} = req.params;
    const {title, description} = req.body;

    const card = await Card.findByPk(cardId);

    if (!card) return next(new ApiError('Card to update not found', 404));

    card.title = title;
    card.description = description;

    const updatedCard = await card.save()

    res.status(200).json(updatedCard)
})

//update card
const deleteCard = asyncHandler(async (req, res, next) => {
    const {cardId} = req.params;

    const card = await Card.findByPk(cardId);
    if (!card) return next(new ApiError('Card to delete not found', 404));

    await Card.destroy({where: {id: cardId}})

    res.status(200).json({message: 'Card deleted successfully.', listId: card.listId})
})

export {getCard, getCards, createCard, updateCard, deleteCard, reorderCard, moveCard}