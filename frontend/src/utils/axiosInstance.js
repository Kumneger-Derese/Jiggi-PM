import axios from 'axios'

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
})

Axios.interceptors.request.use(
  config => {
    const userString = localStorage.getItem('user')
    const userObj = JSON.parse(userString)

    const token = userObj && userObj.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  async error => {
    await Promise.reject(error)
  }
)

export default Axios
