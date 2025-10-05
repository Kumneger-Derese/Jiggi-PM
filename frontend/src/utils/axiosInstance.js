import axios from 'axios'

const Axios = axios.create({
  baseURL: 'http://localhost:5100/api'
})

Axios.interceptors.request.use(
  config => {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)

    const token = user && user.token
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
