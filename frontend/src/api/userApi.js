import Axios from '../utils/axiosInstance.js'

const getUserProfile = async () => {
    const {data} = await Axios.get('/users/profile')
    return data
}

const registerUser = async (body) => {
    const {data} = await Axios.post('/users/register', body)
    return data
}

const loginUser = async (body) => {
    const {data} = await Axios.post('/users/login', body)
    return data
}

const updateUserProfile = async (body) => {
    const {data} = await Axios.put('/users/profile', body)
    return data
}

export {getUserProfile,registerUser,loginUser,updateUserProfile}