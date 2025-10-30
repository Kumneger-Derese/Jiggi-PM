import Axios from "../utils/axiosInstance.js";

const getCard = async (cardId) => {
    const {data} = await Axios.get(`/cards/${cardId}`);
    return data
}
const completeCard = async (payload) => {
    const {data} = await Axios.put(`/cards/complete`, payload);
    return data
}

const getCards = async (listId) => {
    const {data} = await Axios.get(`/cards/all/${listId}`);
    return data
}

const createCard = async (payload) => {
    const {data} = await Axios.post(`/cards/create-card`, payload);
    return data
}

const moveCard = async (payload) => {
    const {data} = await Axios.put(`/cards/move`, payload);
    return data
}

const reorderCard = async (payload) => {
    const {data} = await Axios.put(`/cards/reorder`, payload);
    return data
}

const updateCard = async (payload) => {
    const {cardId, body} = payload
    const {data} = await Axios.put(`/cards/update-card/${cardId}`, body);
    return data
}

const deleteCard = async (cardId) => {
    const {data} = await Axios.delete(`/cards/delete-card/${cardId}`);
    return data
}

export {getCard, getCards, createCard, updateCard, deleteCard, reorderCard, moveCard, completeCard}