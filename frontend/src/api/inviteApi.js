import Axios from "../utils/axiosInstance.js";

const sendInvite = async (payload) => {
    const {projectId, body} = payload
    const {data} = await Axios.post(`/invitations/${projectId}/invite`, body)
    return data
}

const verifyInvite = async (token) => {
    const {data} = await Axios.get(`/invitations/${token}/verify`)
    return data
}

const acceptInvite = async (token) => {
    const {data} = await Axios.post(`/invitations/accept`, token)
    return data
}

const invitedProjects = async () => {
    const {data} = await Axios('/invitations/projects')
    return data
}
export {sendInvite, verifyInvite, acceptInvite, invitedProjects}