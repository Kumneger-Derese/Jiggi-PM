import {Card} from '../models/index.js';
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import sequelize from "../config/sequelize.js";
import {io} from "../socket.js";

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

    // Use Promise.all to fetch both cards concurrently
    const [activeCard, overCard] = await Promise.all([
        Card.findByPk(activeCardId),
        Card.findByPk(overCardId)
    ]);

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

    if (io) io.to(listId).emit('syncCard', {listId, activeCardId})

    res.status(200).json({message: 'Card reordered.'})
})

//move card between list
const moveCard = asyncHandler(async (req, res, next) => {
    const {activeCardId, overCardId, newListId} = req.body;

    if (!activeCardId || !newListId) {
        return next(new ApiError('activeId and newListId required', 400))
    }

    const activeCard = await Card.findByPk(activeCardId);

    if (!activeCard) return next(new ApiError('Card not found', 404));

    const cards = await Card.findAll({
        where: {listId: newListId},
        order: [['position', 'ASC']],
        attributes: ['id', 'position'],
    });

    let prevCard = null;
    let nextCard = null;
    let newPosition;

    if (cards.length === 0) {
        // Case A: Dropped on empty list
        newPosition = 1000;
    } else if (overCardId) {
        // Case B: Dropped onto an existing card (overCardId is present)
        const overIndex = cards.findIndex(card => card.id === overCardId);

        if (overIndex === -1) {
            return next(new ApiError('Invalid overCardId for the target list', 400));
        }

        prevCard = cards[overIndex - 1] || null;
        nextCard = cards[overIndex]; // The card we dropped ON is the NEXT card

    } else {
        // Case C: Dropped at the explicit end of the list (overCardId is null)
        prevCard = cards[cards.length - 1]; // The last card is the PREV card
        nextCard = null;
    }

    // Calculation Logic
    if (cards.length > 0 || overCardId) {
        if (!prevCard) {
            // Drop at the start of a non-empty list (nextCard is defined)
            newPosition = nextCard?.position / 2;
        } else if (!nextCard) {
            // Drop at the end of a non-empty list (prevCard is defined)
            newPosition = prevCard.position + 1000;
        } else {
            // Drop in the middle (both are defined)
            newPosition = (prevCard.position + nextCard.position) / 2;
        }
    }

    // before Moving

    await sequelize.transaction(async (transaction) => {
        activeCard.listId = newListId;
        activeCard.position = newPosition;
        await activeCard.save({transaction});
    });

    // after moving
    if (io) io.to(activeCard.listId).emit('syncCard', {listId: activeCard.listId, activeCardId})

    res.status(200).json({message: 'Card moved.'});
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

    if (io) io.to(listId).emit('syncCard', {listId, cardId: card.id})

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

    const listId = updatedCard.listId
    if (io) io.to(updatedCard.listId).emit('syncCard', {listId, cardId})

    res.status(200).json(updatedCard)
})

//update card
const deleteCard = asyncHandler(async (req, res, next) => {
    const {cardId} = req.params;

    const card = await Card.findByPk(cardId);
    if (!card) return next(new ApiError('Card to delete not found', 404));

    await Card.destroy({where: {id: cardId}})

    if (io) io.to(card.listId).emit('syncCard', {listId: card.listId, cardId})
    res.status(200).json({message: 'Card deleted successfully.', listId: card.listId})
})

export {getCard, getCards, createCard, updateCard, deleteCard, reorderCard, moveCard}