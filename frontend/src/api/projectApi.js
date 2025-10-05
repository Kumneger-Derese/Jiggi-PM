import Axios from '../utils/axiosInstance.js'

const getProject = async projectId => {
  const { data } = await Axios.get(`/projects/${projectId}`)
  return data
}

const getProjects = async () => {
  const { data } = await Axios.get('/projects')
  return data
}

const createProject = async body => {
  const { data } = await Axios.post('/projects/create-project', body)
  return data
}

const updateProject = async updateData => {
  const { data } = await Axios.put(
    `/projects/update-project/${updateData.projectId}`,
    updateData.body
  )
  return data
}

const deleteProject = async projectId => {
  const { data } = await Axios.delete(`/projects/delete-project/${projectId}`)
  return data
}

export { getProject, getProjects, createProject, deleteProject, updateProject }
