import Axios from "../utils/axiosInstance.js";

//get specific list
const getList = async (listId) => {
    const {data} = await Axios.get(`/lists/${listId}`);
    return data
}
//get all list
const getLists = async (projectId) => {
    const {data} = await Axios.get(`/lists/all/${projectId}`);
    return data
}

//create List
const createList = async (payload) => {
    const {data} = await Axios.post(`/lists/create-list/${payload.projectId}`, payload.body);
    return data
}

//update List
const updateList = async (payload) => {
    const {data} = await Axios.put(`/lists/update-list/${payload.listId}`, payload.body);
    return data
}

//update List
const deleteList = async (listId) => {
    const {data} = await Axios.delete(`/lists/delete-list/${listId}`,);
    return data
}

//reorder list
const reorderList = async (payload) => {
    const {data} = await Axios.put(`/lists/reorder-list/${payload.projectId}`, payload.body);
    return data
}

export {getList, getLists, createList, updateList, deleteList, reorderList}